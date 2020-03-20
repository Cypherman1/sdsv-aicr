const multer = require("multer");
const mongoose = require("mongoose");
const axios = require("axios");
const FormData = require("form-data");

const UploadedImgs = mongoose.model("uploadImgs");

module.exports = app => {
  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "./uploads/");
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + file.originalname);
    }
  });

  const upload = multer({
    storage: storage
  }).single("file");

  const upload1 = multer({
    storage: multer.memoryStorage()
  }).single("file");

  app.post("/api/upload1", (req, res) => {
    upload(req, res, function(err) {
      if (err) {
        console.log(err);
      } else {
        const uploadImg = new UploadedImgs({
          uid: new mongoose.Types.ObjectId(),
          name: req.file.name,
          url: req.file.path
        });

        uploadImg
          .save()
          .then(result => {
            res.status(200).send(req.file);
          })
          .catch(err => {
            console.log(err),
              res.status(500).json({
                error: err
              });
          });
        // res.status(200).send(req.file);
      }
    });
  });

  app.get("/api/imgslist", (req, res) => {
    UploadedImgs.find({}, (err, imgs) => {
      res.send(imgs);
    });
  });

  app.post("/api/upload", (req, res) => {
    upload1(req, res, function(err) {
      if (err) {
        console.log(err);
      } else {
        const formData = new FormData();
        formData.append("file", req.file.buffer);

        axios
          .post("http://192.168.0.61:3000/api/images", formData, {})
          .then(res => console.log(res.data))
          .catch(err => console.log(err));
      }
    });
  });
};
