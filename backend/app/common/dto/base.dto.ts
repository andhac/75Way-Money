import { ObjectId } from "mongodb";

export interface BaseSchema {
  _id?: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
