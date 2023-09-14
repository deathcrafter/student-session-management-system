import mongoose, { Schema, Types } from "mongoose";

export interface IStudent {
  _id: Types.ObjectId;
  name: string;
  uni_id: string;
  password: string;
}

const studentSchema = new Schema<IStudent>({
  name: String,
  uni_id: String,
  password: String,
});

const Student = mongoose.model<IStudent>("Student", studentSchema);

export default Student;
