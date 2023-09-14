import mongoose, { Schema, Types } from "mongoose";

export interface ISlot {
  student: Types.ObjectId;
  date: Date;
}

const slotSchema = new Schema<ISlot>({
  student: {
    type: Schema.Types.ObjectId,
    ref: "Student",
  },
  date: Date,
});

const Slot = mongoose.model<ISlot>("Slot", slotSchema);

export default Slot;
