  
const express = require('express');
const ColumnsController = require('../controllers/column')

// Router initialisation
const router = express.Router();

// CRUD
// Create (Column) POST
router.post('/createColumn', ColumnsController.createColumn);

// Read (Column) GET
router.get('/getColumn/:id', ColumnsController.getColumn);

//Read (Column) GET
router.get('/getColumnsbyBoardID/:id', ColumnsController.getColumnsbyBoardID);

// Update (Column) PATCH
router.patch('/updateColumn/:id', ColumnsController.updateColumn);

// Delete (Column) DELETE
router.delete('/deleteColumn/:id', ColumnsController.deleteColumn);

module.exports = router;