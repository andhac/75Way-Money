import { body } from "express-validator";

export const createUser = [
  body("fullName").isString().withMessage("fullName must be a string"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isString()
    .withMessage("email must be a string"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isString()
    .withMessage("password must be a string"),
  body("phone").isString().withMessage("phone must be a string"),
  body("role")
    .notEmpty()
    .withMessage("role is required")
    .isString()
    .withMessage("role must be a string")
    .custom((value) => {
      if (["User", "Admin"].includes(value)) {
        throw new Error("role must be in [User, Admin].");
      }
      return true;
    }),
  body("walletBalance")
    .isNumeric()
    .withMessage("walletBalance must be a number"),
  body("currency").isString().withMessage("currency must be a string"),
];

export const login = [
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isString()
    .withMessage("email must be a string"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isString()
    .withMessage("password must be a string"),
];

// export const updateUser = [
//   body("fullName").isString().withMessage("fullName must be a string"),
//   body("email")
//     .notEmpty()
//     .withMessage("email is required")
//     .isString()
//     .withMessage("email must be a string"),
//   body("password")
//     .notEmpty()
//     .withMessage("password is required")
//     .isString()
//     .withMessage("password must be a string"),
//   body("phone").isString().withMessage("phone must be a string"),
//   body("role")
//     .notEmpty()
//     .withMessage("role is required")
//     .isString()
//     .withMessage("role must be a string")
//     .custom((value) => {
//       if (["User", "Admin"].includes(value)) {
//         throw new Error("role must be in [User, Admin].");
//       }
//       return true;
//     }),
//   body("walletBalance")
//     .isNumeric()
//     .withMessage("walletBalance must be a number"),
//   body("currency").isString().withMessage("currency must be a string"),
// ];

export const editUser = [
  body("fullName").isString().withMessage("fullName must be a string"),
  body("email").isString().withMessage("email must be a string"),
  body("password").isString().withMessage("password must be a string"),
  body("phone").isString().withMessage("phone must be a string"),
  body("role")
    .isString()
    .withMessage("role must be a string")
    .custom((value) => {
      if (["User", "Admin"].includes(value)) {
        throw new Error("role must be in [User, Admin].");
      }
      return true;
    }),
  body("walletBalance")
    .isNumeric()
    .withMessage("walletBalance must be a number"),
  body("currency").isString().withMessage("currency must be a string"),
];
