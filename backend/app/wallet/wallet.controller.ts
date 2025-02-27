import * as walletService from "./wallet.service";
import { createResponse } from "../common/helper/response.helper";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";
import { AuthRequest } from "../user/user.controller";

/**
 * @typedef {Object} AuthRequest
 * @extends {Request}
 * @property {Object} user - Authenticated user object
 * @property {string} user._id - User's unique identifier
 */

/**
 * Adds funds to the user's wallet.
 * The fund addition will be in a pending state until approved by the admin.
 *
 * @route POST /wallet/add-fund
 * @access Private (Authenticated users)
 * @param {AuthRequest} req - Express request object containing user information and amount
 * @param {Response} res - Express response object
 * @returns {Promise<void>} Responds with the wallet details and a pending status message
 */
export const addFund = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
    const { amount } = req.body;
    const userId = req.user?._id.toString();
    const wallet = await walletService.addFund(userId, amount);
    res.send(createResponse(wallet, "Fund Will be in Pending State"));
});

/**
 * Retrieves the current balance of the authenticated user's wallet.
 *
 * @route GET /wallet/balance
 * @access Private (Authenticated users)
 * @param {AuthRequest} req - Express request object containing user information
 * @param {Response} res - Express response object
 * @returns {Promise<void>} Responds with the wallet balance
 */
export const getBalance = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.user?._id.toString();
    const wallet = await walletService.getFund(userId);
    res.send(createResponse(wallet));
});

/**
 * Transfers funds from the authenticated user's wallet to another user's wallet.
 * The transaction will be in a pending state until approved by the admin.
 *
 * @route POST /wallet/transfer
 * @access Private (Authenticated users)
 * @param {AuthRequest} req - Express request object containing sender's information, receiver ID, and transfer amount
 * @param {Response} res - Express response object
 * @returns {Promise<void>} Responds with the transaction details and a pending approval message
 */
export const transferFund = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
    const { amount, receiverId } = req.body;
    const senderId = req.user?._id.toString();
    const wallet = await walletService.transferFund(senderId, receiverId, amount);
    res.send(createResponse(wallet, "Admin will Approve the Transaction until wait.."));
});
