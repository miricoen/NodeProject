import mongoose from "mongoose";

const linksModel = mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
    default: "https://www.google.com/",
  },
  clicks: [
    {
      insertedAt: {
        type: Date,
        default: Date.now,
      },
      ipAddress: String,
      targetParamValue: String,
    }
  ],
  targetParamName: {
    type: String,
    default: "t",
  },
  targetValues: [
    {
      name: String,
      value: String,
    }
  ]
});

export default mongoose.model("Link", linksModel);
