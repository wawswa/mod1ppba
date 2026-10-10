import { MemberModel } from "../models/memberModel.js";

export const MemberController = {
  async create(req, res) {
    try {
      const member = await MemberModel.create(req.body);
      res.status(201).json(member);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async getAll(req, res) {
    try {
      const members = await MemberModel.getAll();
      res.json(members);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const member = await MemberModel.getById(req.params.id);
      res.json(member);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const member = await MemberModel.update(req.params.id, req.body);
      res.json(member);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async remove(req, res) {
    try {
      const result = await MemberModel.remove(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
