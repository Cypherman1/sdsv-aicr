const mongoose = require("mongoose");
const { Schema } = mongoose;

var ImgsTemplateChema = new Schema();

ImgsTemplateChema.add({
  _id: mongoose.Types.ObjectId,
  imgId: String,
  templateId: String
});

mongoose.model("ImgsTemplate", ImgsTemplateChema);
