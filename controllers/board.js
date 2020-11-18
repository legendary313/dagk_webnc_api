const boardSchema = require('../models/board');
const columnSchema = require('../models/column');
const itemSchema = require('../models/item');

const createBoard = (req, res) => {
  const board = new boardSchema({
    id_user: req.body.id_user,
    name: req.body.name,
    description: req.body.description
  });

  board.save().then(board => {
    const columnWentwell = new columnSchema({
      id_board: board._id,
      name: 'Went well'
    });
  
    columnWentwell.save();
    const columnImprove = new columnSchema({
      id_board: board._id,
      name: 'To Improve'
    });
  
    columnImprove.save();
    const columnAction = new columnSchema({
      id_board: board._id,
      name: 'Action Items'
    });
  
    columnAction.save(); 
    console.log('Board Created'); 
    res.status(200).json({message: 'Board Created'}); // send json to requester
  }).catch((err) => {
    res.status(500).json({message: err});
  });
    
};

const getBoard = (req, res) => {
  boardSchema.find({_id: req.params.id}, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({message: err});
    } else {
      res.status(200).json(results);
    }
  });
};

const getBoardsbyUserID = (req, res) => {
  boardSchema.find({id_user: req.params.id}, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({message: err});
    } else {
      res.status(200).json(results);
    }
  });
};

const updateBoard = async (req, res) => {
  const boardUpdate = await boardSchema.findOneAndUpdate({_id: req.params.id}, {
    $set: {
        name: req.body.name,
        description: req.body.description,
    },
  }, {new: true});

  if (boardUpdate) {
    res.status(200).json({message: 'Successfully updated'});
  } else {
    res.status(500).json({message: 'Could not update'});
  }
};

const deleteBoard = async (req, res) => {
  const boardDelete = await boardSchema.findByIdAndDelete({_id: req.params.id});
  if (boardDelete) {
    columnSchema.find({id_board: req.params.id}).remove().exec();
    itemSchema.find({id_board: req.params.id}).remove().exec();
    res.status(200).json({message: 'Successfully deleted'});
  } else {
    res.status(500).json({message: 'Could not delete'});
  }
};

module.exports = {createBoard, getBoard, updateBoard, deleteBoard, getBoardsbyUserID};