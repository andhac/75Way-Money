import { type BaseSchema } from "../common/dto/base.dto";
import { UserRole } from "../common/enum/role.enum";
import {ObjectId} from "typeorm";



export interface IUser extends BaseSchema {
  fullName?: string;
  email: string;
  password: string;
  phone?: string;
  role: UserRole;
  refreshToken?: string;
  walletBalance?: number;
  currency?: string;
  wallet?: ObjectId;
}
