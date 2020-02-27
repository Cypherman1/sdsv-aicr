const multer = require("multer");
const mongoose = require("mongoose");

const path = require("path");

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
  }).single("myImage");

  app.post("/upload", (req, res) => {
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
            // res.status(201).json({
            //   message: "Image uploaded successfully!",
            //   fileUploaded: {
            //     _id: result._id,
            //     path: result.path
            //   }
            // });
            console.log(result);
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

  app.get("/imgslist", (req, res) => {
    UploadedImgs.find({}, (err, imgs) => {
      res.send(imgs);
    });
  });
};
