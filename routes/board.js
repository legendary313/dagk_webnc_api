  
const express = require('express');
const BoardsController = require('../controllers/board')

// Router initialisation
const router = express.Router();

// CRUD
// Create (Board) POST
router.post('/createBoard', BoardsController.createBoard);

// Read (Board) GET
router.get('/getBoard/:id', BoardsController.getBoard);

//Read (Board) GET
router.get('/getBoardsbyUserID/:id', BoardsController.getBoardsbyUserID);

// Update (Board) PATCH
router.patch('/updateBoard/:id', BoardsController.updateBoard);

// Delete (Board) DELETE
router.delete('/deleteBoard/:id', BoardsController.deleteBoard);

module.exports = router;