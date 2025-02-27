import { type BaseSchema } from "../common/dto/base.dto";
import {User} from "../user/user.schema";
import {ObjectId} from "typeorm";

export interface IWallet extends BaseSchema {
  user?:string;
  balance?: number;
}
