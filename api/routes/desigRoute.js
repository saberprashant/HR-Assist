const express = require('express');
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose');

const Designation = require('../models/desigModel')

router.get('/', (req, res, next) => {
  Designation.find()
  .exec()
  .then(result => {
    console.log('All Designations. -> ', result);
    res.status(200).json(result);
  })
  .catch(err => {
    console.log('Designation get err -> ', err);
    res.status(500).json({
      error: err 
    });
  });
});


router.post('/', (req, res, next) => {
  console.log('Designation Request body', req.body);
  const designation = new Designation({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    salaryStructure: req.body.salaryStructure
  });
  designation.save()
  .then(result => {
    console.log(result);
    res.status(201).json({
      message: "Designation Posted",
      createdDesignation: designation
    });
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      error: err 
    });
  });
  
});




module.exports = router;  