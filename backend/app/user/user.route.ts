import { Router } from "express";

import * as userController from "./user.controller";
import * as userValidator from "./user.validation";
import {authenticateAdmin, authenticateUser} from "../common/middleware/auth.middleware";

const router = Router();

router
  .post("/register", userValidator.createUser, userController.createUser)
  .post("/login", userValidator.login, userController.login)
    .post('/adminLogin', userValidator.login, userController.adminLogin)
  .post("/refreshToken", userController.refreshToken)
  .post("/logout", userController.logout)
    .get('/getAllUser', userController.getAllures)
    .get('/getUserById/:id', userController.getUserById)
  .get("/profile", authenticateUser, userController.getUserprofile).
    post('/withdrawal', authenticateUser, userController.withdrawal)


    // Admin routes
router.post('/approveFund/:transactionId', authenticateAdmin, userController.approveFund)
    .post('/approveTransfer/:transactionId', authenticateAdmin, userController.approveTransfer)

export default router;
