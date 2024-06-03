import Link from "../models/link.js";

const linksController = {
  getList: async (req, res) => {
    try {
      const links = await Link.find();
      res.json(links);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
  getById: async (req, res) => {
    try {
      const link = await Link.findById(req.params.id);
      res.json(link);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
  add: async (req, res) => {
    const { originalUrl } = req.body;
    try {
      const newLink = await Link.create({ originalUrl });
      res.json(newLink);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
  put: async (req, res) => {
    const { id } = req.params;
    try {
      const updatedLink = await Link.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updatedLink);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await Link.findByIdAndDelete(id);
      res.json(deleted);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  redirect: async (req, res) => {
    try {
      const link = await Link.findById(req.params.id);

      if (!link) {
        return res.status(404).json({ message: "Link not found" });
      }

      const targetParamValue = req.query[link.targetParamName] || ""; // ערך הפרמטר מה-query string
      const click = {
        insertedAt: new Date(),
        ipAddress: req.ip,
        targetParamValue: targetParamValue,
      };

      link.clicks.push(click);
      await link.save();

      res.redirect(link.originalUrl);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  getClicksByTarget: async (req, res) => {
    try {
      const link = await Link.findById(req.params.id);

      if (!link) {
        return res.status(404).json({ message: "Link not found" });
      }

      const clicksByTarget = {};

      link.clicks.forEach((click) => {
        const targetValue = click.targetParamValue || "";
        if (!clicksByTarget[targetValue]) {
          clicksByTarget[targetValue] = 0;
        }
        clicksByTarget[targetValue]++;
      });

      res.json(clicksByTarget);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
};

export default linksController;
