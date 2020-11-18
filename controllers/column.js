const columnSchema = require('../models/column');
const itemSchema = require('../models/item');
const createColumn = (req, res) => {
  const column = new columnSchema({
    id_board: req.body.id_board,
    name: req.body.name
  });

  column.save().then(() => {
    console.log('Column Created'); // print in console
    res.status(200).json({message: 'Column Created'}); // send json to requester
  }).catch((err) => {
    res.status(500).json({message: err});
  });
};

const getColumn = (req, res) => {
  columnSchema.find({_id: req.params.id}, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({message: err});
    } else {
      res.status(200).json(results);
    }
  });
};

const getColumnsbyBoardID = (req, res) => {
  columnSchema.find({id_board: req.params.id}, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({message: err});
    } else {
      res.status(200).json(results);
    }
  });
};


const updateColumn = async (req, res) => {
  const columnUpdate = await columnSchema.findOneAndUpdate({_id: req.params.id}, {
    $set: {
        name: req.body.name,
    },
  }, {new: true});

  if (columnUpdate) {
    res.status(200).json({message: 'Successfully updated'});
  } else {
    res.status(500).json({message: 'Could not update'});
  }
};

const deleteColumn = async (req, res) => {
  const columnDelete = await columnSchema.findByIdAndDelete({_id: req.params.id});
  if (columnDelete) {
    itemSchema.find({id_column: req.params.id}).remove().exec();
    res.status(200).json({message: 'Successfully deleted'});
  } else {
    res.status(500).json({message: 'Could not delete'});
  }
};

module.exports = {createColumn, getColumn, updateColumn, deleteColumn, getColumnsbyBoardID};