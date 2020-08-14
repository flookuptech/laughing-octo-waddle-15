// eslint-disable-next-line import/newline-after-import
const express = require("express");
const router = express.Router();

// const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
const reqController = require("../controllers/req.controller");

// router.param('id', userController.checkForId);

router.post(
  "/workspace",
  reqController.workspaceFilter,
  authController.connectToWorkspace
);

router.post("/login", reqController.loginFilter, authController.login);

router.post(
  "/tenantsignup",
  reqController.tenantSignupFilter,
  authController.tenantSignup
);

router.post(
  "/clientsignup",
  authController.protectRoute,
  reqController.clientSignupFilter,
  authController.clientSignup
);

// router.post("/forgotPassword", authController.forgotPassword);
// router.patch("/resetPassword/:token", authController.resetPassword);

// router
//   .route("/")
//   .get(authController.protectRoute, userController.getAllUsers)
//   .post(userController.createUser);

// router
//   .route("/:id")
//   .get(userController.getUserById)
//   .patch(userController.updateUser)
//   .delete(
//     authController.protectRoute,
//     authController.accessTo("admin"),
//     userController.deleteUser
//   );

module.exports = router;
