require('dotenv').config;

var express = require("express");

const bodyParser = require('body-parser');

const cors = require('cors');

const properties = require('./config/properties');

const db = require ('./config/database');

var app = express();

var bodyParserJSON = bodyParser.json();

var bodyParserURLEncoded = bodyParser.urlencoded({extended:true});

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

// Cors
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);


// DB
db();

// route app
require('./routes/auth.route')(app);

// routes
app.get("/", (req,res) => {
    res.json({message:"Welcome to my web"})
});


// set port, listen to requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

