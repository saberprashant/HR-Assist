const express = require('express');
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose');

const Overtime = require('../models/overtimeModel')

router.get('/', (req, res, next) => {
  Overtime.find()
  .exec()
  .then(result => {
    console.log('All Overtime comp. -> ', result);
    res.status(200).json(result);
  })
  .catch(err => {
    console.log('Overtime get err -> ', err);
    res.status(500).json({
      error: err 
    });
  });
});


// router.post('/', (req, res, next) => {
//   console.log('Overtime Request body', req.body);
//   const shift = new Overtime({
//     _id: new mongoose.Types.ObjectId(),
//     name: req.body.name,
//     allowance: parseInt(req.body.allowance)
//   });
//   console.log('view_shift post');
//   shift.save()
//   .then(result => {
//     console.log(result);
//     res.status(201).json({
//       message: "Overtime Posted",
//       createdShift: shift
//     });
//   })
//   .catch(err => {
//     console.log(err)
//     res.status(500).json({
//       error: err 
//     });
//   });
  
// });

router.put('/:overtimeID', (req, res, next) => {
  const id = req.params.overtimeID;
  const overtime = {
    allowance: parseInt(req.body.allowance)
  };
  Overtime.update({_id: id}, { $set: overtime })
  .exec()
  .then(result => {
    console.log('Overtime put -> ',  result);
    res.status(200).json(result);
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      error: err 
    });
  });

})

// router.delete('/:overtimeID', (req, res, next) => {
//   const id = req.params.shiftID;
//   Overtime.remove({_id: id})
//   .exec()
//   .then(result => {
//     res.status(200).json(result);
//   })
//   .catch(err => {
//     console.log(err)
//     res.status(500).json({
//       error: err 
//     });
//   });
// });



module.exports = router;  