import { LoanModel } from "../models/loanModel.js";

const LOAN_FIELDS = [
  "member_id",
  "book_id",
  "loan_date",
  "due_date",
  "return_date",
  "status",
];

export const LoanController = {
  async create(req, res) {
    try {
      const { member_id, book_id, due_date } = req.body;
      if (!member_id || !book_id || !due_date) {
        return res.status(400).json({
          error: "member_id, book_id, and due_date are required",
        });
      }

      const loan = await LoanModel.create(req.body);
      res.status(201).json(loan);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Filter opsional: /api/loans?status=Terlambat&member_id=...&book_id=...
  async getAll(req, res) {
    try {
      const { status, member_id, book_id } = req.query;
      const loans = await LoanModel.getAll({ status, member_id, book_id });
      res.json(loans);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const loan = await LoanModel.getById(req.params.id);
      res.json(loan);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const payload = {};
      for (const field of LOAN_FIELDS) {
        if (req.body[field] !== undefined) payload[field] = req.body[field];
      }

      if (Object.keys(payload).length === 0) {
        return res.status(400).json({ error: "No loan fields to update" });
      }

      const loan = await LoanModel.update(req.params.id, payload);
      res.json(loan);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async remove(req, res) {
    try {
      const result = await LoanModel.remove(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
