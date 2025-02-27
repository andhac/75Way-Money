import {Entity, Column, ObjectIdColumn, ObjectId, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {UserRole} from "../common/enum/role.enum";
import {TransactionStatus, TransactionType} from "../common/enum/transaction.enum";
import {ITransaction} from "./transaction.dto";

@Entity()
export class Transaction implements ITransaction{
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  senderId: string;

  @Column()
  receiverId: string;

  @Column({ type: "enum", enum: TransactionType, default: TransactionType.WITHDRAWAL })
  type: TransactionType;

  @Column({ type: "enum", enum: TransactionStatus, default: TransactionStatus.PENDING })
  status: TransactionStatus;

  @Column()
  amount: number;

  @Column()
  currency: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}