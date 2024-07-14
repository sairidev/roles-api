const express = require('express');
const userController = require('../controllers/user');
const admin = require('../middleware');

function router(app) {
  const common = express.Router();
  app.use('/user', common);

  common.get('/:id', userController.getUser);
  common.get('/', admin, userController.getAllUsers);
  common.post('/create', userController.createUser);
  common.put('/update/:id', admin, userController.updateUser);
  common.delete('/delete/:id', admin, userController.deleteUser);
}

module.exports = router;
