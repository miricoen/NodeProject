import User from "../models/user.js";
const usersController = {
  getList: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
  getById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.json(user);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
  add: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const newUser = await User.create({ name, email, password });
      res.json(newUser);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
  put: async (req, res) => {
    try {
      const { id, name, email, password } = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { name, email, password },
        { new: true }
      );
      res.json(updatedUser);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
  delete: async (req, res) => {
    try {
      const deleted = await User.findByIdAndDelete(req.params.id);
      res.json(deleted);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
};

export default usersController;
