import { Router } from "express";
import Slot from "../../models/slot";
import auth from "../../middlewares/auth";

const router = Router();

router.use(auth());

router.get("/bookedSlots", async (_req, res) => {
  const slots = await Slot.find({
    date: {
      $gte: new Date(),
    },
  })
    .select({
      _id: 0,
      student: 1,
      date: 1,
    })
    .populate("student", {
      _id: 0,
      name: 1,
      uni_id: 1,
    });

  return res.json(slots);
});

export default router;
