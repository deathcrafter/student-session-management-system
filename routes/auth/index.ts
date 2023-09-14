import { Router } from "express";
import Student from "../../models/student";
import { sign } from "../../lib/jwt";

const router = Router();

router.post("/login/student", async (req, res) => {
  const { uni_id, password } = req.body;

  if (!uni_id || !password) {
    return res.status(400).json({
      message: "Invalid payload",
    });
  }

  const student = await Student.findOne({
    uni_id,
    password,
  });

  if (!student) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const token = sign({
    type: "student",
    _id: student._id,
  });

  return res.json({
    token,
  });
});

router.post("/login/dean", async (req, res) => {
  const { uni_id, password } = req.body;

  if (!uni_id || !password) {
    return res.status(400).json({
      message: "Invalid payload",
    });
  }

  if (uni_id !== "dean" || password !== "password") {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const token = sign({
    type: "dean",
  });

  return res.json({
    token,
  });
});

export default router;
