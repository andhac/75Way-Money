import * as transactionService from "./transaction.service";
import { createResponse } from "../common/helper/response.helper";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";
import {AuthRequest} from "../user/user.controller";

export const getHistory = asyncHandler(async (req:AuthRequest, res:Response):Promise<void> => {
    const userId = req.user?._id.toString();
    console.log(userId);
    const history = await transactionService.getHistory(userId);
    res.send(createResponse(history));
})