import { type BaseSchema } from "../common/dto/base.dto";
import {User} from "../user/user.schema";
import {TransactionStatus, TransactionType} from "../common/enum/transaction.enum";
import {ObjectId} from "mongodb";

export interface ITransaction extends BaseSchema {
  senderId: string;
  receiverId: string
  type:TransactionType;
  status: TransactionStatus
  amount?: number;
  currency?: string;
}
