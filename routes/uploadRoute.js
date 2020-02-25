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
    console.log(res.file);
    // upload(req, res, err => {
    //   if (err) {
    //     console.log(req.file);
    //     console.log(err);
    //   } else {
    //     res.send("test");
    //     console.log(req.file);
    //   }
    // });
  });
};
