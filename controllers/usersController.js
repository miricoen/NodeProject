// import userModel from "../models/user.js";
// import Link from "../models/link.js";
// const usersController = {
//   getList: async (req, res) => {
//     try {
//       const users = await userModel.find();
//       res.json(users);
//     } catch (e) {
//       res.status(400).json({ message: e.message });
//     }
//   },
//   getById: async (req, res) => {
//     try {
//       const user = await userModel.findById(req.params.id);
//       res.json(user);
//     } catch (e) {
//       res.status(400).json({ message: e.message });
//     }
//   },
//   // add: async (req, res) => {
//   //   try {
//   //     const { name, email, password, links } = req.body;
//   //     const newUser = await userModel.create({ name, email, password, links });
//   //     res.json(newUser);
//   //   } catch (e) {
//   //     res.status(400).json({ message: e.message });
//   //   }
//   // },
//   add: async (req, res) => {
//     try {
//       const { name, email, password, originalUrls } = req.body;

//       // Create the links first
//       const newLinks = await Promise.all(
//         originalUrls.map(async (url) => {
//           const newLink = await Link.create({ originalUrl: url });
//           return newLink._id;
//         })
//       );

//       // Create the user with the link IDs
//       const newUser = await userModel.create({ name, email, password, links: newLinks });

//       res.json(newUser);
//     } catch (e) {
//       res.status(400).json({ message: e.message });
//     }
//   },
//   put: async (req, res) => {
//     const { id } = req.params;
//     // const { name, email, password, links } = req.body;
//     // console.log(req.body);
//     try {
//       const updatedUser = await userModel.findByIdAndUpdate(
//         id,
//         req.body,
//         { new: true }
//       );
//       res.json(updatedUser);
//     } catch (e) {
//       res.status(400).json({ message: e.message });
//     }
//   },

//   delete: async (req, res) => {
//     try {
//       const deleted = await userModel.findByIdAndDelete(req.params.id);
//       res.json(deleted);
//     } catch (e) {
//       res.status(400).json({ message: e.message });
//     }
//   },
// };

// export default usersController;

import User from "../models/user.js";
import Link from "../models/link.js"; // ודא שאתה מייבא את המודל Link

const usersController = {
  getList: async (req, res) => {
    try {
      const users = await User.find().populate('links');
      res.json(users);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
  getById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate('links');
      res.json(user);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
  // add: async (req, res) => {
  //   const { name, email, password, originalUrls } = req.body;
  //   try {
  //     const links = await Link.InsertMany(originalUrls);
  //     const linkIds = links.map(link => link._id);

  //     const newUser = await User.create({ name, email, password, links: linkIds });
  //     res.json(newUser);
  //   } catch (e) {
  //     res.status(400).json({ message: e.message });
  //   }
  // },
  add: async (req, res) => {
    // הוספת הודעת לוג כדי לבדוק את גוף הבקשה שמתקבל
    console.log("Request Body: ", req.body);

    // הוצאת הנתונים מהבקשה
    const { name, email, password, links } = req.body;

    // // בדיקה אם הנתונים הנדרשים קיימים
    // if (!name || !email || !password || !Array.isArray(links)) {
    //   return res.status(400).json({ message: "Missing required fields or incorrect data format" });
    // }

    try {
      const linkObjects = await Link.insertMany(links); // יצירת קישורים חדשים אם יש קישורים במערך
      const linkIds = linkObjects.map(link => link.id); // יצירת מערך של מזהי הקישורים
      // יצירת משתמש חדש
      const newUser = await User.create({ name, email, password, links: linkIds });
      // שליחת המשתמש החדש בתשובה
      res.json(newUser);
    } catch (e) {
      // הדפסת הודעת השגיאה
      console.error(e);
      // שליחת הודעת שגיאה במידה ויש בעיה
      res.status(400).json({ message: e.message });
    }
  },
  // put: async (req, res) => {
  //   const { id } = req.params;
  //   const { name, email, password, originalUrls } = req.body;

  //   try {
  //     let linkIds = [];
  //     if (originalUrls && originalUrls.length > 0) {
  //       const links = await Promise.all(
  //         originalUrls.map(url => Link.create({ originalUrl: url }))
  //       );
  //       linkIds = links.map(link => link._id);
  //     }

  //     const updatedUser = await User.findByIdAndUpdate(
  //       id,
  //       { name, email, password, links: linkIds.length > 0 ? linkIds : undefined },
  //       { new: true }
  //     ).populate('links');

  //     res.json(updatedUser);
  //   } catch (e) {
  //     res.status(400).json({ message: e.message });
  //   }
  // },
  put: async (req, res) => {
    const { id } = req.params;
    const { name, email, password, links } = req.body;

    try {
      const linkObjects = await Link.insertMany(links); // יצירת קישורים חדשים אם יש קישורים במערך
      const linkIds = linkObjects.map(link => link._id); // יצירת מערך של מזהי הקישורים
      const updatedUser = await User.findByIdAndUpdate(id, {name,email,password,links:linkIds},{new:true}).populate('links');// עדכון משתמש כולל ייבוא הקישורים
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
