import { Transaction } from "./transaction.schema";
import { AppDataSource } from "../common/services/database.service";


const transactionRepo = AppDataSource.getRepository(Transaction);

export const getHistory = async (userId: string | undefined) => {
    if (!userId) throw new Error("User ID is required");
    return await transactionRepo.find({
        where: [
            { senderId: userId},
            { receiverId: userId }
        ],
        order: { createdAt: "DESC" }
    });
};