const express = require('express');
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose');

const Employee = require('../models/employeeModel')

router.get('/', (req, res, next) => {
  Employee.find()
  .exec()
  .then(result => {
    console.log('All Employees -> ', result);
    res.status(200).json(result);
  })
  .catch(err => {
    console.log('Employee get err -> ', err);
    res.status(500).json({
      error: err 
    });
  });
});

router.get('/:empID', (req, res, next) => {
  const id = req.params.empID;
  Employee.findById(id)
  .exec()
  .then(result => {
    console.log('All Employees -> ', result);
    res.status(200).json(result);
  })
  .catch(err => {
    console.log('Employee get err -> ', err);
    res.status(500).json({
      error: err 
    });
  });
});

router.post('/', (req, res, next) => {
  console.log('Employee Request body', req.body);
  const employee = new Employee({
    _id: new mongoose.Types.ObjectId(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    mobile: parseInt(req.body.mobile),
    email: req.body.email,
    cAddress: req.body.cAddress,
    pAddress: req.body.pAddress,
    designationName: req.body.designationName,
    designationId: req.body.designationId,
    shiftId: req.body.shiftId,
    salaryStructure: req.body.salaryStructure,
    totalSal: req.body.totalSal,
    shiftName: req.body.shiftName,
  });
  employee.save()
  .then(result => {
    console.log(result);
    res.status(201).json({
      message: "Employee Posted",
      createdEmployee: employee
    });
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      error: err 
    });
  });
  
});

router.put('/:empID', (req, res, next) => {
  const id = req.params.empID;
  const employee = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    mobile: parseInt(req.body.mobile),
    email: req.body.email,
    cAddress: req.body.cAddress,
    pAddress: req.body.pAddress,
    designationName: req.body.designationName,
    designationId: req.body.designationId,
    shiftId: req.body.shiftId,
    salaryStructure: req.body.salaryStructure,
    totalSal: req.body.totalSal,
    shiftName: req.body.shiftName,
  }
  Employee.update({_id: id}, { $set: employee })
  .exec()
  .then(result => {
    console.log('Employee put -> ',  result);
    res.status(200).json(result);
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      error: err 
    });
  });

})

router.delete('/:empID', (req, res, next) => {
  const id = req.params.empID;
  Employee.remove({_id: id})
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