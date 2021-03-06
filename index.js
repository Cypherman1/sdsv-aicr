const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const keys = require("./config/keys");
const dotenv = require("dotenv");
require("./models/User");
require("./models/UploadedImgs");
require("./models/Templates");
require("./models/ImgsTemplate");
require("./services/passport");

const path = require("path");

dotenv.config();

mongoose.Promise = global.Promise;
mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    dbName: "aicrdb"
  })
  .catch(err => console.log(err));

const app = express();

//const whitelist = ["http://localhost:3000", "http://example2.com"];
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
};

// Then pass them to cors:
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
// app.use(express.static("public"));

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/uploadRoute")(app);
require("./routes/templateRoutes")(app);

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static("client/build"));

  // Express will serve up the index.html file
  // if it doesn't recognize the route

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

console.log("listening on port" + PORT);

app.listen(PORT);
