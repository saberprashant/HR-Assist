const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

const salaryRoute = require('./api/routes/salaryRoute');
const shiftRoute = require('./api/routes/shiftRoute');

mongoose.connect("mongodb://localhost:27017/HRAssist");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
// })


app.use(express.static(path.join(__dirname, 'app')));

/* GET home page. */
app.get('/', function(req, res) {
  //Path to your main file
  res.status(200).sendFile(path.join(__dirname + './app/index.html')); 
  // res.render('index', { title: 'Express' }); 
});

//All routes
app.use('/view_salary', salaryRoute);

app.use('/view_shifts', shiftRoute);



module.exports = app;