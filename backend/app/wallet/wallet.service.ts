import {Wallet} from "./wallet.schema";
import {AppDataSource} from "../common/services/database.service";
import {User} from "../user/user.schema";
import {ObjectId} from "mongodb";
import {Transaction} from "../transaction/transaction.schema";
import {TransactionStatus, TransactionType} from "../common/enum/transaction.enum";

const walletRepo = AppDataSource.getRepository(Wallet);
const userRepo = AppDataSource.getRepository(User);
const transactionRepo = AppDataSource.getRepository(Transaction);

export const addFund = async (userId: string | undefined, amount: number) => {
    if (!userId) throw new Error("User ID is required");
    const user = await userRepo.findOne({where: {_id: new ObjectId(userId)}});
    if (!user) throw new Error("User not found");
    if (!amount || amount <= 0) throw new Error("Invalid amount");

    let wallet = await walletRepo.findOne({where: {user: userId}});

    // If no wallet exists, create a new one
    if (!wallet) {
        wallet = walletRepo.create({user: user._id.toString(), balance: 0});
        await walletRepo.save(wallet);
    }

    // Create a PENDING transaction
    const transaction = transactionRepo.create({
        senderId: userId,
        receiverId: new ObjectId(userId).toHexString(),
        type: TransactionType.FUNDING,
        status: TransactionStatus.PENDING,
        amount,
        currency: "INR"
    });

    await transactionRepo.save(transaction);
};


export const getFund = async (userId: string | undefined) => {
    if (!userId) throw new Error("User ID is required");
    const user = await userRepo.findOne({where: {_id: new ObjectId(userId)}});
    if (!user) throw new Error("User not found");

    const wallet = await walletRepo.findOne({where: {user: userId}});
    if (!wallet) throw new Error("Wallet not found");

    return wallet;
};

export const transferFund = async (senderId: string | undefined, receiverId: string, amount: number) => {
    if (!receiverId) throw new Error("Receiver ID is required");
    if (!amount || amount <= 0) throw new Error("Invalid amount");

    const sender = await userRepo.findOne({where: {_id: new ObjectId(senderId)}});
    if (!sender) throw new Error("Sender not found");
    const receiver = await userRepo.findOne({where: {_id: new ObjectId(receiverId)}});
    if (!receiver) throw new Error("Receiver not found");
    const senderWallet = await walletRepo.findOne({where: {user: senderId}});
    if (!senderWallet || senderWallet.balance < amount) throw new Error("Insufficient balance.");
    let receiverWallet = await walletRepo.findOne({where: {user: receiverId}});
    if (!receiverWallet) {
        receiverWallet = walletRepo.create({user: receiverId, balance: 0});
        await walletRepo.save(receiverWallet);
    }
    const transaction = transactionRepo.create({
        senderId,
        receiverId,
        type: TransactionType.TRANSFER,
        status: TransactionStatus.PENDING,
        amount,
        currency: "INR"
    })
    return await transactionRepo.save(transaction);
}