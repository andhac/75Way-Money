import { Router } from "express";
import * as transactionController from "./transaction.controller";
import * as transactionValidator from "./transaction.validation";
import {authenticateUser} from "../common/middleware/auth.middleware";

const router = Router();

router.get('/history', authenticateUser, transactionController.getHistory)

export default router;
