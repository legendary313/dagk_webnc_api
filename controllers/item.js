const itemSchema = require('../models/item');

const createItem = (req, res) => {
  const item = new itemSchema({
    id_board:req.body.id_board,
    id_column: req.body.id_column,
    description: req.body.description
  });

  item.save().then(() => {
    console.log('Item Created'); // print in console
    res.status(200).json({message: 'Item Created'}); // send json to requester
  }).catch((err) => {
    res.status(500).json({message: err});
  });
};

const getItem = (req, res) => {
  itemSchema.find({_id: req.params.id}, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({message: err});
    } else {
      res.status(200).json(results);
    }
  });
};

const getItemsbyColumnID = (req, res) => {
  itemSchema.find({id_column: req.params.id}, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({message: err});
    } else {
      res.status(200).json(results);
    }
  });
};

const updateItem = async (req, res) => {
  const itemUpdate = await itemSchema.findOneAndUpdate({_id: req.params.id}, {
    $set: {
        id_column: req.body.id_column,
        description: req.body.description,
    },
  }, {new: true});

  if (itemUpdate) {
    res.status(200).json({message: 'Successfully updated'});
  } else {
    res.status(500).json({message: 'Could not update'});
  }
};

const updateItemBoard = async (req, res) => {
  const itemUpdate = await itemSchema.findOneAndUpdate({_id: req.params.id}, {
    $set: {
        id_column: req.body.id_column
    },
  }, {new: true});

  if (itemUpdate) {
    res.status(200).json({message: 'Successfully updated'});
  } else {
    res.status(500).json({message: 'Could not update'});
  }
};

const deleteItem = async (req, res) => {
  const itemDelete = await itemSchema.findByIdAndDelete({_id: req.params.id});
  if (itemDelete) {
    res.status(200).json({message: 'Successfully deleted'});
  } else {
    res.status(500).json({message: 'Could not delete'});
  }
};

module.exports = {createItem, getItem, updateItem, updateItemBoard, deleteItem, getItemsbyColumnID};