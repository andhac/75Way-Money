import {
  Entity,
  ObjectIdColumn,
  ObjectId,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToOne,
} from "typeorm";
import bcrypt from "bcryptjs";
import { UserRole } from "../common/enum/role.enum";
import { IUser } from "./user.dto";
import {Wallet} from "../wallet/wallet.schema";

@Entity()
export class User implements IUser {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true, nullable: true })
  phone?: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ default: 0 })
  walletBalance: number;

  @Column({ default: "INR" })
  currency: string;
  @OneToOne(() => Wallet)
  wallet: ObjectId;

  @Column({ nullable: true })
  refreshToken?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;


  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
