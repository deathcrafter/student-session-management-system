import { IStudent } from "../models/student";

declare global {
  namespace Express {
    interface Request {
      student?: IStudent;
    }
  }
}
