import {
    Entity,
    ObjectIdColumn,
    ObjectId,
    Column,
    OneToOne,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import { User } from "../user/user.schema";
import {IWallet} from "./wallet.dto";

@Entity()
export class Wallet implements IWallet{
    @ObjectIdColumn()
    _id: ObjectId;

    @OneToOne(() => User)
    @Column({type: "string"})
    user: string

    @Column({ default: 0 })
    balance: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
