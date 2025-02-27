import {type IUser} from "./user.dto";
import {User} from "./user.schema";
import {AppDataSource} from "../common/services/database.service";
import bcrypt from "bcryptjs";
import * as auth from "../common/services/auth";
import jwt, {JwtPayload} from "jsonwebtoken";
import {ObjectId} from "mongodb";
import {Wallet} from "../wallet/wallet.schema";
import {Transaction} from "../transaction/transaction.schema";
import {TransactionStatus, TransactionType} from "../common/enum/transaction.enum";
import exp from "node:constants";

const userRepo = AppDataSource.getRepository(User);
const walletRepo = AppDataSource.getRepository(Wallet)
const transactionRepo = AppDataSource.getRepository(Transaction)

/**
 * Creates a new user and initializes their wallet with a balance of 0.
 * @param {IUser} data - User data including email and password.
 * @returns {Promise<User>} The created user.
 * @throws {Error} If the user already exists.
 */
export const createUser = async (data: IUser): Promise<User> => {
  const { email } = data;
  const user = await userRepo.findOne({ where: { email } });
  if (user) throw new Error("User already exist");
  const newUser = userRepo.create(data);
  await userRepo.save(newUser);

  const newWallet = walletRepo.create({user:newUser._id.toString(), balance:0})
  await walletRepo.save(newWallet)
  return newUser;
};

/**
 * Logs in a user and generates authentication tokens.
 * @param {IUser} data - User login credentials.
 * @returns {Promise<{ user: User, token: string, refreshToken: string }>} User data with tokens.
 * @throws {Error} If the user is not found or password is invalid.
 */
export const login = async (data: IUser): Promise<{ user: User; token: string; refreshToken: string; }> => {
  const user = await userRepo.findOne({ where: { email: data.email } });
  if (!user) throw new Error("User not found");
  const isPasswordMatch = await bcrypt.compare(data.password, user.password);
  if (!isPasswordMatch) throw new Error("Invalid password");
  const token = auth.generateToken(user);
  user.refreshToken = auth.generateRefreshToken(user);
  await userRepo.save(user);
  return { user, token, refreshToken: user.refreshToken };
};

/**
 * Refreshes an access token using a refresh token.
 * @param {string} refreshToken - The refresh token.
 * @returns {Promise<{ token: string }>} New access token.
 * @throws {Error} If the token is invalid or the user is not found.
 */
export const refreshToken = async (refreshToken: string): Promise<{ token: string; }> => {
  const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string,
  ) as JwtPayload;

  if (!decoded._id) throw new Error("Invalid token: ID is missing");
  const user = await userRepo.findOne({ where: { _id: new ObjectId(decoded._id) } });
  if (!user || user.refreshToken !== refreshToken) {
    throw new Error("Invalid refresh token");
  }
  const newAccessToken = auth.generateToken(user);
  return { token: newAccessToken };
};

/**
 * Logs out a user by clearing their refresh token.
 * @param {string} email - User email.
 * @returns {Promise<{ message: string }>} Success message.
 * @throws {Error} If the user is not found.
 */
export const logout = async (email: string): Promise<{ message: string; }> => {
  const user = await userRepo.findOne({ where: { email } });
  if (!user) throw new Error("User not found");
  user.refreshToken = "";
  await userRepo.save(user);
  return { message: "User logged out successfully" };
};


/**
 * Retrieves all users from the database.
 * @returns {Promise<User[]>} A promise that resolves to an array of users.
 */
export const getAllUser = async (): Promise<User[]> => {
  const users = await userRepo.find();
  return users;
};

/**
 * Retrieves a user by their ID.
 * @param {string} userId - The user's ID.
 * @returns {Promise<User>} The user data.
 * @throws {Error} If the user is not found.
 */

export const getUserById = async (userId: string): Promise<User> => {
    const user = await userRepo.findOne({ where: { _id: new ObjectId(userId) } });
    if (!user) throw new Error("User not found");
    return user;
}

export const adminLogin = async (data: IUser) => {
  const user = await userRepo.findOne({ where: { email: data.email } });
  if (!user) throw new Error("User not found");
  const isPasswordMatch = await bcrypt.compare(data.password, user.password);
  if (!isPasswordMatch) throw new Error("Invalid password");
  if(user.role !== "admin") throw new Error("User is not an admin");
  const token = auth.generateToken(user);
  user.refreshToken = auth.generateRefreshToken(user);
  await userRepo.save(user);
  return { user, token, refreshToken: user.refreshToken };
}


/**
 * Retrieves a logged-in user's data.
 * @param {string} userId - The user's ID.
 * @returns {Promise<User>} The user data.
 * @throws {Error} If the user is not found.
 */
export const getLoggedInUser = async (userId: string): Promise<User> => {
  const user = await userRepo.findOne({ where: { _id: new ObjectId(userId) } });
  if (!user) throw new Error("User not found");
  return user;
};

/**
 * Processes a withdrawal request for a user.
 * @param {string} userId - The user's ID.
 * @param {number} amount - The amount to withdraw.
 * @returns {Promise<{ message: string }>} Success message.
 * @throws {Error} If the user is not found, amount is invalid, or funds are insufficient.
 */
export const withdrawal = async (userId: string | undefined, amount: number): Promise<{ message: string; }> => {
  const user = await userRepo.findOne({ where: { _id: new ObjectId(userId) } });
  if (!user) throw new Error("User not found");
  if (!amount || amount <= 0) throw new Error("Invalid amount");

  const wallet = await walletRepo.findOne({ where: { user: userId } });
  if (!wallet || wallet.balance < amount) throw new Error("Insufficient funds");

  wallet.balance -= amount;
  await walletRepo.save(wallet);

  const transaction = transactionRepo.create({
    senderId: userId,
    receiverId: userId,
    type: TransactionType.WITHDRAWAL,
    status: TransactionStatus.APPROVED,
    amount,
    currency: "INR",
  });
  await transactionRepo.save(transaction);
  return { message: "Withdrawal request sent successfully" };
};

/**
 * Approves a pending funding transaction.
 * @param {string} transactionId - The transaction ID.
 * @returns {Promise<Transaction>} The updated transaction.
 * @throws {Error} If the transaction is not found or already approved.
 */
export const approveFund = async (transactionId: string): Promise<Transaction> => {
  const transaction = await transactionRepo.findOne({ where: { _id: new ObjectId(transactionId) } });
  if (!transaction) throw new Error("Transaction not found");
  if (transaction.status !== TransactionStatus.PENDING) throw new Error("Transaction already approved");

  const wallet = await walletRepo.findOne({ where: { user: transaction.senderId } });
  if (!wallet) throw new Error("Wallet not found");

  wallet.balance += Number(transaction.amount);
  await walletRepo.save(wallet);

  transaction.status = TransactionStatus.APPROVED;
  return await transactionRepo.save(transaction);
};

/**
 * Approves or rejects a user-to-user transfer transaction.
 * @param {string} transactionId - The transaction ID.
 * @param {string} status - Approval or rejection status.
 * @returns {Promise<{ message: string }>} Success message.
 * @throws {Error} If the transaction is not found, already approved, or funds are insufficient.
 */
export const approveTransfer = async (transactionId: string, status: any): Promise<{ message: string; }> => {
  if(!transactionId) throw new Error("Transaction ID is required");
  const transaction = await transactionRepo.findOne({ where: { _id: new ObjectId(transactionId) } });
  if(!transaction) throw new Error("Transaction not found");
  if(transaction.status !== TransactionStatus.PENDING) throw new Error("Transaction already approved");
  if(status === "rejected"){
    transaction.status = TransactionStatus.REJECTED;
    await transactionRepo.save(transaction);
    return ({message: "Transaction rejected"});
  }
  const senderWallet = await walletRepo.findOne({ where: { user: transaction.senderId } });
  const receiverWallet = await walletRepo.findOne({ where: { user: transaction.receiverId } });
  if (!senderWallet || senderWallet.balance < transaction.amount) throw new Error("Insufficient funds.");
  if (!receiverWallet) throw new Error("Receiver wallet not found.");

  senderWallet.balance -= transaction.amount;
  await walletRepo.save(senderWallet);

  receiverWallet.balance += transaction.amount;
  await walletRepo.save(receiverWallet);

  transaction.status = TransactionStatus.APPROVED;
  await transactionRepo.save(transaction);
  return ({message: "Transaction approved"});
};
