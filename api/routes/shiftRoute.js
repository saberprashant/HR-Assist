const express = require('express');
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose');

const Shift = require('../models/shiftModel')

router.get('/', (req, res, next) => {
  Shift.find()
  .exec()
  .then(result => {
    console.log('All Shift comp. -> ', result);
    res.status(200).json(result);
  })
  .catch(err => {
    console.log('Shift get err -> ', err);
    res.status(500).json({
      error: err 
    });
  });
});


router.post('/', (req, res, next) => {
  console.log('Shift Request body', req.body);
  const shift = new Shift({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    start: req.body.start,
    end: req.body.end
  });
  console.log('view_shift post');
  shift.save()
  .then(result => {
    console.log(result);
    res.status(201).json({
      message: "Shift Posted",
      createdShift: shift
    });
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      error: err 
    });
  });
  
});

router.put('/:shiftID', (req, res, next) => {
  const id = req.params.shiftID;
  // const updateOps = {};         //for patch work
  // for( const ops of req.body) {
  //   updateOps[ops.name] = ops.value
  // }
  // Shift.update({_id: id}, { $set: updateOps })
  const shift = {
    _id: req.body._id,
    name: req.body.name,
    start: req.body.start,
    end: req.body.end
  };
  Shift.update({_id: id}, { $set: shift })
  .exec()
  .then(result => {
    console.log('Shift put -> ',  result);
    res.status(200).json(result);
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      error: err 
    });
  });

})

router.delete('/:shiftID', (req, res, next) => {
  const id = req.params.shiftID;
  Shift.remove({_id: id})
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