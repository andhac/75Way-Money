import { Router } from "express";

import * as walletController from "./wallet.controller";
import * as walletValidator from "./wallet.validation";
import {authenticateUser} from "../common/middleware/auth.middleware";

const router = Router();

router
    .post('/addFund', authenticateUser, walletController.addFund)
    .get('/getBalance', authenticateUser, walletController.getBalance)
    .post('/transferFund', authenticateUser, walletController.transferFund)


export default router;
