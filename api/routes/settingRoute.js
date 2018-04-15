const express = require('express');
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose');

const Setting = require('../models/settingModel');

router.get('/', (req, res, next) => {
  Setting.find()
  .exec()
  .then(result => {
    console.log('All setting comp. -> ', result);
    res.status(200).json(result);
  })
  .catch(err => {
    console.log('Setting get err -> ', err);
    res.status(500).json({
      error: err 
    });
  });
});


router.post('/', (req, res, next) => {
  console.log('Setting Request body', req.body);
  const setting = new Setting({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    timeVal: parseInt(req.body.timeVal),
    deduction: parseInt(req.body.deduction)
  });
  console.log('view_setting post');
  setting.save()
  .then(result => {
    console.log(result);
    res.status(201).json({
      message: "Setting Posted",
      createdSetting: setting
    });
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      error: err 
    });
  });
  
});

router.put('/:settingID', (req, res, next) => {
  const id = req.params.settingID;
  const setting = {
    name: req.body.name,
    timeVal: parseInt(req.body.timeVal),
    deduction: parseInt(req.body.deduction)
  };
  Setting.update({_id: id}, { $set: setting })
  .exec()
  .then(result => {
    console.log('Setting put -> ',  result);
    res.status(200).json(result);
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      error: err 
    });
  });

})

router.delete('/:settingID', (req, res, next) => {
  const id = req.params.settingID;
  Setting.remove({_id: id})
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