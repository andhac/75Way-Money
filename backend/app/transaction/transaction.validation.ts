import { body } from "express-validator";

export const createTransaction = [
  body("amount").isNumeric().withMessage("amount must be a number"),
  body("currency").isString().withMessage("currency must be a string"),
];

export const updateTransaction = [
  body("amount").isNumeric().withMessage("amount must be a number"),
  body("currency").isString().withMessage("currency must be a string"),
];

export const editTransaction = [
  body("amount").isNumeric().withMessage("amount must be a number"),
  body("currency").isString().withMessage("currency must be a string"),
];
