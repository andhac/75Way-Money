import { body } from "express-validator";

export const createWallet = [
  body("balance").isNumeric().withMessage("balance must be a number"),
];

export const updateWallet = [
  body("balance").isNumeric().withMessage("balance must be a number"),
];

export const editWallet = [
  body("balance").isNumeric().withMessage("balance must be a number"),
];
