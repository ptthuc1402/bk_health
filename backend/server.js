require("dotenv").config;

var express = require("express");

const Patient = require("./models/patient.model.js");
const bodyParser = require("body-parser");

const cors = require("cors");

const properties = require("./config/properties");

const db = require("./config/database");

const fs = require("fs");
const path = require("path");

var cookieSession = require("cookie-session");

const passport = require("passport");

var app = express();

var bodyParserJSON = bodyParser.json();

var bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });

var router = express.Router();

var whitelist = properties.CORS;

app.use(cors(whitelist));

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// parse requests of content-type - application/json
app.use(express.json());

// // Cors
router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

// cookie-session
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [`${process.env.SECRET_KEY}`],
  })
);
app.use(passport.initialize());
app.use(passport.session());
// DB
db();

// route app
require("./routes/auth.route")(app);
require("./routes/ocr.routes")(app);
require("./routes/patient.routes")(app);
require("./routes/doctor.routes")(app);
require("./routes/appoint.routes")(app);
// routes

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my web" });
});
// Route to handle image upload
app.post("/take_photo", async (req, res) => {
  const fileName = "img.jpg";
  const old_patient = await Patient.findOne({ patient_id: req.body.id });
  console.log(old_patient);
  if (old_patient) {
    const patient_id = old_patient._id;
    console.log(patient_id);
    const patient = await Patient.findByIdAndUpdate(patient_id, {
      img_url: req.body.image,
    });
  }
  const imageData = req.body.image;
  const base64Data = imageData.replace(/^data:image\/jpeg;base64,/, ""); // Remove data URL header
  const imageBuffer = Buffer.from(base64Data, "base64"); // Convert base64 string to buffer

  // const fileName = "photo_" + Date.now() + ".jpg"; // Unique filename
  const filePath = `D:/bk_health/frontend/storage/${
    req.body.name + "_" + req.body.id
  }/${fileName}`;
  // const filePath = string.join("uploads", fileName); // Path to save image

  // Write image buffer to file
  fs.writeFile(filePath, imageBuffer, (err) => {
    if (err) {
      console.error("Error saving image:", err);
      res.status(500).send("Error saving image");
    } else {
      console.log("Image saved successfully:", fileName);
      res.send("Image saved successfully");
    }
  });
});

// set port, listen to requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
