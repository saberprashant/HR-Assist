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

//All routes
app.use('/api/auth', routes.authRoute);

app.use('/api/view_salary',passportAuth, routes.salaryRoute);

app.use('/api/view_shifts',passportAuth, routes.shiftRoute);

app.use('/api/designations',passportAuth, routes.desigRoute);

app.use('/api/view_settings',passportAuth, routes.settingRoute);

app.use('/api/overtime',passportAuth, routes.overtimeRoute);

app.use('/api/employees',passportAuth, routes.employeeRoute);

app.use('/api/attendances',passportAuth, routes.attendanceRoute);

// /* GET home page. */
// app.get('/', function (req, res) {
//   //Path to your main file
//   console.log('path from /', path.join(__dirname + '/app/index.html'));
//   res.status(200).sendFile(path.join(__dirname + '/app/index.html'));
// });

// app.get('*', function(req, res){
//   // console.log(path.join(__dirname + './app/index.html'));
//   res.render('./app/index.html');
// });


module.exports = app;