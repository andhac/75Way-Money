import jwt from "jsonwebtoken";
import { User } from "../../user/user.schema";
import bcrypt from "bcryptjs";

export const comparepassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export const generateToken = (user: User) => {
  return jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
};

export const generateRefreshToken = (user: User) => {
  return jwt.sign(
    { _id: user._id },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: "7d" },
  );
};
