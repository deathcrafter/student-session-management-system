import { Router } from "express";
import Slot, { ISlot } from "../../models/slot";
import auth from "../../middlewares/auth";

const router = Router();

router.use(auth());

router.get("/availableSlots", async (req, res) => {
  const today = new Date();

  const isThursdayOrGreater =
    (today.getDay() === 4 && today.getHours() >= 10) || today.getDay() > 4;

  const dayNum = today.getDay();

  const nextThursday = new Date(
    today.getTime() +
      (isThursdayOrGreater
        ? dayNum === 4
          ? 7
          : dayNum === 5
          ? 6
          : 5
        : dayNum - 4) *
        24 *
        60 *
        60 *
        1000
  );
  nextThursday.setHours(10, 0, 0, 0);

  const slots: (Omit<ISlot, "student"> & { available: boolean })[] = [];
  const bookedSlots = (await Slot.find()).map((slot) => slot.date.getTime());

  for (let i = 0; i < 10; i++) {
    const nextWeek = new Date(
      nextThursday.getTime() + i * 7 * 24 * 60 * 60 * 1000
    );

    const slot = {
      date: nextWeek,
      available: !bookedSlots.includes(nextWeek.getTime()),
    };

    slots.push(slot);
  }

  return res.json({
    slots,
  });
});

router.post("/bookSlot", async (req, res) => {
  const slot = req.body.slot as ISlot;
  const student = req.student!._id;

  if (!slot || !slot.date) {
    return res.status(400).json({
      message: "Slot is required",
    });
  }
  slot.date = new Date(slot.date);

  if (slot.date.getDay() != 4 && slot.date.getHours() != 10) {
    return res.status(400).json({
      message: "Slot is invalid",
    });
  }

  const slotDoc = await Slot.findOne({
    date: {
      $gte: new Date(slot.date.getTime() - 30 * 60 * 1000),
      $lte: new Date(slot.date.getTime() + 30 * 60 * 1000),
    },
    student,
  });

  if (slotDoc) {
    return res.status(400).json({
      message: "Slot is already booked",
    });
  }

  await Slot.create({
    student,
    date: slot.date,
  });

  return res.json({
    message: "Slot booked successfully",
  });
});

export default router;
