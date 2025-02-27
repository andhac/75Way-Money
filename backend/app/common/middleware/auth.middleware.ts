import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {AuthRequest} from "../../user/user.controller";
import {AppDataSource} from "../services/database.service";
import {User} from "../../user/user.schema";
import {ObjectId} from "mongodb";

const userRepo = AppDataSource.getRepository(User);
dotenv.config();

export const authenticateUser = (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
): void => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        throw new Error("Access Denied");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        (req as any).user = decoded;
        next();
    } catch (error) {
        throw new Error("Invalid Token");
    }
};

export const authenticateAdmin = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Get token from headers
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) throw new Error("Unauthorized: Access token is required");

        // Verify token
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
        if (!decoded) throw new Error("Unauthorized: Invalid token");

        // Fetch user from DB
        const user = await userRepo.findOne({where: {_id: new ObjectId(decoded._id)}});
        if (!user) throw new Error("Unauthorized: User not found");
        // Check if user is an admin
        if (user.role !== "admin") throw new Error("Unauthorized: Admin access required");

        // Attach user to request object & proceed
        (req as any).user = user;
        next();
    } catch (error) {
        console.error("Admin authentication error:", error);
        throw new Error("Unauthorized: Invalid token");
    }
};
