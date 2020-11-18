const userSchema = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../helpers/config.json');
const userService = require('../services/user');
const e = require('express');

const authenticate = (req, res, next) => {
  userService.authenticate(req.body)
      .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
      .catch(err => next(err));
}


const register = (req, res) => {
  userSchema.find({ username: req.body.username}, function (err,result) {
    if(result.length > 0){
    res.status(500).json({message: "Username already registered"});
    }
    else {
      const user = new userSchema({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName
      });

      if (req.body.password) {
        user.hash = bcrypt.hashSync(req.body.password, 10);
      }
      

      user.save().then(() => {
        console.log('User Created'); // print in console
        res.status(200).json({message: 'User Created'}); // send json to requester
      }).catch((err) => {
        res.status(500).json({message: err});
      });
    }});
};

const getCurrentUser = (req,res) => {
    userSchema.find({_id: req.user.sub}, (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).json({message: err});
        } else {
          res.status(200).json(results);
        }
      });
};

const getUser = (req, res) => {
  userSchema.find({_id: req.params.id}, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({message: err});
    } else {
      res.status(200).json(results);
    }
  });
};


const updateUser = async (req, res) => {
  const userUpdate = await userSchema.findOneAndUpdate({_id: req.params.id}, {
    $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName
    },
  }, {new: true});

  if (userUpdate) {
    res.status(200).json({message: 'Successfully updated'});
  } else {
    res.status(500).json({message: 'Could not update'});
  }
};

const deleteUser = async (req, res) => {
  const userDelete = await userSchema.findByIdAndDelete({_id: req.params.id});
  if (userDelete) {
    res.status(200).json({message: 'Successfully deleted'});
  } else {
    res.status(500).json({message: 'Could not delete'});
  }
};

module.exports = {authenticate, register, getUser, getCurrentUser, updateUser, deleteUser};