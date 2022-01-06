const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const multer = require('multer');
const upload = multer();
const Videos = require('./models/Videos')

const app = express();

app.use(cors());

// Passport Config
require("./config/passport")(passport);

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// EJS
app.use("/public", express.static("public"));
app.use(expressLayouts);
app.set("view engine", "ejs");

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: db }),
    cookie: { maxAge: 180 * 60 * 1000 },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Routes
app.use("/", require("./routes/index.js"));
app.use("/users", require("./routes/users.js"));



// Saving blob in database
app.post("/save-video", upload.single("video_data"), (req, res) => {
  
  const finalVideo = {
    name: req.file.originalname,
    contentType: req.file.mimetype,
    data: new Buffer(req.file.buffer, "base64"),
    user: req.user._id,
     
  };
  
  Videos.create(finalVideo, (err, audio) => {
    if (err) {
      console.log(err);
    } else {
      console.log("video uploaded to db!!");
      res.sendStatus(200);
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on  ${PORT}`));
