const express = require('express');
const UsersController = require('../controllers/user')

// Router initialisation
const router = express.Router();

// CRUD
// Autenticate (Item) POST
router.post('/authenticate', UsersController.authenticate);

// Register (Item) POST
router.post('/register', UsersController.register);

// Read (Item) GET
router.get('/getUser/:id', UsersController.getUser);
router.get('/getUser/current', UsersController.getCurrentUser);

// Update (Item) PATCH
router.patch('/updateUser/:id', UsersController.updateUser);

// Delete (Item) DELETE
router.delete('/deleteUser/:id', UsersController.deleteUser);

module.exports = router;