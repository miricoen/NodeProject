import User from "../models/user.js";
import Link from "../models/link.js";

const usersController = {
  getList: async (req, res) => {
    try {
      const users = await User.find().populate("links");
      res.json(users);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
  getById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate("links");
      res.json(user);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
  add: async (req, res) => {
    const { name, email, password, links } = req.body;
    try {
      const linkObjects = await Link.insertMany(links);
      const linkIds = linkObjects.map((link) => link.id);
      const newUser = await User.create({
        name,
        email,
        password,
        links: linkIds,
      });
      res.json(newUser);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  put: async (req, res) => {
    const { id } = req.params;
    const { name, email, password, links } = req.body;

    try {
      const linkObjects = await Link.insertMany(links);
      const linkIds = linkObjects.map((link) => link._id);
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { name, email, password, links: linkIds },
        { new: true }
      ).populate("links");
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
  getClicksByTarget: async (req, res) => {
    const { id } = req.params;

    try {
      const link = await Link.findById(id);
      if (!link) {
        return res.status(404).json({ message: "Link not found" });
      }

      const targetClicks = link.clicks.reduce((acc, click) => {
        if (!acc[click.targetParamValue]) {
          acc[click.targetParamValue] = 0;
        }
        acc[click.targetParamValue]++;
        return acc;
      }, {});

      res.json(targetClicks);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
};

export default usersController;
