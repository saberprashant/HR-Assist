const express = require('express');
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose');

const Salary = require('../models/salaryModel')

router.get('/', (req, res, next) => {
  Salary.find()
  .exec()
  .then(result => {
    console.log('All salary comp. -> ', result);
    res.status(200).json(result);
  })
  .catch(err => {
    console.log('Salary get err -> ', err);
    res.status(500).json({
      error: err 
    });
  });
});


router.post('/', (req, res, next) => {
  console.log('Salary Request body', req.body);
  const salary = new Salary({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    value: parseInt(req.body.value),
    valueType: req.body.valueType,
    type: req.body.type
  });
  console.log('view_salary post');
  salary.save()
  .then(result => {
    console.log(result);
    res.status(201).json({
      message: "Salary Posted",
      createdSalary: salary
    });
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      error: err 
    });
  });
  
});

router.put('/:salID', (req, res, next) => {
  const id = req.params.salID;
  // const updateOps = {};         //for patch work
  // for( const ops of req.body) {
  //   updateOps[ops.name] = ops.value
  // }
  // Salary.update({_id: id}, { $set: updateOps })
  const salary = {
    _id: req.body._id,
    name: req.body.name,
    value: parseInt(req.body.value),
    valueType: req.body.valueType,
    type: req.body.type
  };
  Salary.update({_id: id}, { $set: salary })
  .exec()
  .then(result => {
    console.log('Salary patch -> ',  result);
    res.status(200).json(result);
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      error: err 
    });
  });

})

router.delete('/:salID', (req, res, next) => {
  const id = req.params.salID;
  Salary.remove({_id: id})
  .exec()
  .then(result => {
    res.status(200).json(result);
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      error: err 
    });
  });
})



module.exports = router;  