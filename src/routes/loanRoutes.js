import express from "express";
import { LoanController } from "../controllers/loanController.js";

const router = express.Router();

router.post("/", LoanController.create);
router.get("/", LoanController.getAll);
router.get("/:id", LoanController.getById);
router.put("/:id", LoanController.update);
router.delete("/:id", LoanController.remove);

export default router;
