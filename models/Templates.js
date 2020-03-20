const mongoose = require("mongoose");
const { Schema } = mongoose;

var TemplatesChema = new Schema();

TemplatesChema.add({
  _id: mongoose.Types.ObjectId,
  title: String,
  key: mongoose.Types.ObjectId,
  level: Number,
  isLeaf: Boolean,
  children: [TemplatesChema]
});

mongoose.model("Templates", TemplatesChema);
