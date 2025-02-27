import * as userService from "./user.service";
import { createResponse } from "../common/helper/response.helper";
import asyncHandler from "express-async-handler";
import { NextFunction, type Request, type Response } from "express";

export interface AuthRequest extends Request {
    user?: { _id: string };
}

/**
 * Creates a new user.
 * @route POST /users
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} Sends the created user response.
 */
export const createUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.createUser(req.body);
    res.send(createResponse(result, "User created successfully"));
});

/**
 * Logs in a user.
 * @route POST /users/login
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} Sends the logged-in user response.
 */
export const login = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.login(req.body);
    res.send(createResponse(result, "User logged in successfully"));
});

/**
 * Refreshes the authentication token.
 * @route POST /users/refresh-token
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} Sends the refreshed token response.
 * @throws {Error} If refresh token is not provided.
 */
export const refreshToken = asyncHandler(
    async (req: Request, res: Response) => {
        const { refreshToken } = req.body;
        if (!refreshToken) throw new Error("Refresh token is required");
        const result = await userService.refreshToken(refreshToken);
        res.send(createResponse(result, "Token refreshed successfully"));
    },
);

/**
 * Logs out a user.
 * @route POST /users/logout
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} Sends the logout confirmation response.
 */
export const logout = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;
    const result = await userService.logout(email);
    res.send(createResponse(result, "User logged out successfully"));
});

/**
 * Retrieves the authenticated user's profile.
 * @route GET /users/profile
 * @param {AuthRequest} req - Express request object with user authentication.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} Sends the user's profile.
 * @throws {Error} If user is not found.
 */
export const getUserprofile = asyncHandler(
    async (req: AuthRequest, res: Response): Promise<void> => {
        const userId = req.user?._id;
        if (!userId) throw new Error("User not found");
        const user = await userService.getLoggedInUser(userId);
        if (!user) throw new Error("User not found");
        res.send(createResponse(user));
    },
);

/**
 * Processes a withdrawal request.
 * @route POST /users/withdraw
 * @param {AuthRequest} req - Express request object with user authentication.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} Sends the withdrawal request response.
 */
export const withdrawal = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { amount } = req.body;
    const userId = req.user?._id.toString();
    const result = await userService.withdrawal(userId, amount);
    res.send(createResponse(result, "Withdrawal request sent successfully"));
});

/**
 * Approves a fund transaction by an admin.
 * @route PATCH /admin/funds/:transactionId
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 * @returns {Promise<void>} Sends the fund approval response.
 */
export const approveFund = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { transactionId } = req.params;
    const result = await userService.approveFund(transactionId);
    res.send(createResponse(result, "Fund approved successfully"));
};

/**
 * Approves a transfer request by an admin.
 * @route PATCH /admin/transfers/:transactionId
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} Sends the transfer approval response.
 */
export const approveTransfer = asyncHandler(async (req: Request, res: Response) => {
    const { transactionId } = req.params;
    const status = req.body;
    const result = await userService.approveTransfer(transactionId, status);
    res.send(createResponse(result, "Transfer approved successfully"));
});


export const getAllures = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.getAllUser();
    res.send(createResponse(result));
})


export const getUserById = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.getUserById(req.params.id);
    res.send(createResponse(result));
})

export const adminLogin = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.adminLogin(req.body);
    res.send(createResponse(result, "Admin logged in successfully"));
})