const express = require( "express");
const bodyParser = require( "body-parser");
const configViewEngine = require( "./config/viewEngine.js");
const initWebRoutes = require( "./route/web.js");
const connectDB = require( "./config/connectDB.js");
const cors = require( "cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
let app = express();

//config cookie
app.use(cookieParser());
// app.use(cors({ origin: true }))
app.use(cors({ credentials: true, origin: true }));
// config app

app.use(function (req, res, next) {
  //     // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", process.env.URL_REACT);

  //     // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  //     // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  //     // Set to true if you need the website to include cookies in the requests sent
  //     // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  //     // Pass to next layer of middleware
  next();
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

configViewEngine(app);
initWebRoutes(app);

connectDB();
let port = process.env.PORT || 7000;
//Port === undefined => port = 6969

app.listen(port, () => {
  //callback
  console.log("Backend Nodejs is runing on the port : " + port);
});
