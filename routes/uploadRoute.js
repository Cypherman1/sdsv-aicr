const multer = require("multer");

const path = require("path");

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
        res.status(200).send(req.file);
      }
    });
  });
};
