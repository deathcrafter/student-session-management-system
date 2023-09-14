import { NextFunction, Request, Response } from "express";
import { verify } from "../lib/jwt";
import { IStudent } from "../models/student";
import { JwtPayload } from "jsonwebtoken";

export default function auth() {
  return function (req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    const token = authorization?.replace("Bearer", "").trim();
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const payload = verify(token) as JwtPayload;
    if (!payload) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (payload.type === "student") {
      req.student = payload as IStudent;
    }

    next();
  };
}
