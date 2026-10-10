import express from "express";
import { MemberController } from "../controllers/memberController.js";

const router = express.Router();

router.post("/", MemberController.create);
router.get("/", MemberController.getAll);
router.get("/:id", MemberController.getById);
router.put("/:id", MemberController.update);
router.delete("/:id", MemberController.remove);

export default router;
