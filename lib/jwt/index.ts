import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "this_secret_should_be_in_env";

export const sign = (payload: any) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const verify = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
