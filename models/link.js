import mongoose from "mongoose";

const linksModel = mongoose.Schema({
  
  originalUrl: {
    type: String,
    required: true,
    default: "https://www.google.com/",
  },

});

export default mongoose.model("link", linksModel);
