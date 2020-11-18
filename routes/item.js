  
const express = require('express');
const ItemsController = require('../controllers/item')

// Router initialisation
const router = express.Router();

// CRUD
// Create (Item) POST
router.post('/createItem', ItemsController.createItem);

// Read (Item) GET
router.get('/getItem/:id', ItemsController.getItem);

//Read (Item) GET
router.get('/getItemsbyColumnID/:id', ItemsController.getItemsbyColumnID);

// Update (Item) PATCH
router.patch('/updateItem/:id', ItemsController.updateItem);
router.patch('/updateItemBoard/:id', ItemsController.updateItemBoard);
// Delete (Item) DELETE
router.delete('/deleteItem/:id', ItemsController.deleteItem);

module.exports = router;