const mongoose = require("mongoose");
const { Schema } = mongoose;

var TemplatesChema = new Schema();

TemplatesChema.add({
  _id: mongoose.Types.ObjectId,
  label: String,
  nodeId: mongoose.Types.ObjectId,
  templateId: String,
  level: Number,
  isLeaf: Boolean,
  children: [TemplatesChema]
});

mongoose.model("Templates", TemplatesChema);
