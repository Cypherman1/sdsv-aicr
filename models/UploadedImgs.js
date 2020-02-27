const mongoose = require("mongoose");
const { Schema } = mongoose;

const UploadedImgsSchema = new Schema({
  uid: mongoose.Types.ObjectId,
  name: { type: String, default: "file1" },
  status: { type: String, default: "done" },
  url: String
});

mongoose.model("uploadImgs", UploadedImgsSchema);
