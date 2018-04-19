const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const routes = require('./api/routes');
const passport = require('passport');
require('./passport');        //for passport.js file
const passportAuth = passport.authenticate('jwt', {session: false});

// connection to mongodb
mongoose.connect("mongodb://localhost:27017/HRAssist");

// Middlewares
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// For CORS
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
// })

app.use(express.static(path.join(__dirname, 'app')));
/* GET home page. */
app.get('/', function (req, res) {
  //Path to your main file
  res.status(200).sendFile(path.join(__dirname + './app/index.html'));
});

//All routes
app.use('/auth', routes.authRoute);

app.use('/view_salary',passportAuth, routes.salaryRoute);

app.use('/view_shifts',passportAuth, routes.shiftRoute);

app.use('/designations',passportAuth, routes.desigRoute);

app.use('/view_settings',passportAuth, routes.settingRoute);

app.use('/overtime',passportAuth, routes.overtimeRoute);

app.use('/employees',passportAuth, routes.employeeRoute);

app.use('/attendances',passportAuth, routes.attendanceRoute);



module.exports = app;