// import mongoose from "mongoose";

// const linksModel = mongoose.Schema({
  
//   originalUrl: {
//     type: String,
//     required: true,
//     default: "https://www.google.com/",
//   },
//   clicks: [{
//     insertedAt: {
//       type: Date,
//       default: Date.now,
//     },
//     ipAddress: {
//       type: String,
//     },
//   }],

// });

// export default mongoose.model("Link", linksModel);

import mongoose from "mongoose";

const clickSchema = new mongoose.Schema({
  insertedAt: {
    type: Date,
    default: Date.now
  },
  ipAddress: {
    type: String,
    required: true
  }
});

const linksSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
    default: "https://www.google.com/"
  },
  clicks: [clickSchema]
});

export default mongoose.model("Link", linksSchema);
