import express from "express";
import userRoute from "./user/user.route";
import walletRoute from "./wallet/wallet.route";
import transactionRoute from "./transaction/transaction.route";

const router = express.Router();

router.use("/user", userRoute);
router.use('/wallet', walletRoute);
router.use('/transaction', transactionRoute);
export default router;
