// eslint-disable-next-line import/newline-after-import
const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');

// router.param('id', userController.checkForId);

router.post('/signup', authController.signup);

router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router
  .route('/')
  .get(authController.protectRoute, userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .delete(
    authController.protectRoute,
    authController.accessTo('admin'),
    userController.deleteUser
  );

module.exports = router;
