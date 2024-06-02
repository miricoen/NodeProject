import Link from "../models/link.js";

const linksController = {
  getList: async (req, res) => {
    try {
      const links = await Link.find();

      res.json(links);
      // res.send(`get link `);

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
      const updatedLink = await Link.findByIdAndUpdate(id, req.body, { new: true });
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
    const { id } = req.params;
    const ipAddress = req.ip;  // כתובת ה-IP של המשתמש

    try {
      const link = await Link.findById(id);
      if (!link) {
        return res.status(404).json({ message: "Link not found" });
      }

      // הוספת קליק למערך הקליקים של הקישור
      link.clicks.push({
        insertedAt: new Date(),
        ipAddress
      });

      await link.save();

      // הפנייה מחדש ל-URL המקורי
      res.redirect(link.originalUrl);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
};

export default linksController;
