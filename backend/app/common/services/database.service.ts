import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../../user/user.schema";
import dotenv from "dotenv";
// import { Transaction } from "../../transaction/transaction.schema";
import {Wallet} from "../../wallet/wallet.schema";
import {Transaction} from "../../transaction/transaction.schema";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
export const AppDataSource = new DataSource({
  type: "mongodb",
  url: MONGO_URI, // Use `url` instead of `database`
  useNewUrlParser: true,
  useUnifiedTopology: true,
  synchronize: true,
  logging: true,
  entities: [User, Wallet, Transaction],
});

export const connectDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed", error);
  }
};
