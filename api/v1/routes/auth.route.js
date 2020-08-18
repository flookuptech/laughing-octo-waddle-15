// eslint-disable-next-line import/newline-after-import
const express = require("express");
const router = express.Router();

const reqController = require("../controllers/req.controller");
const authController = require("../controllers/auth.controller");

// router.param('id', userController.checkForId);

router.post(
  "/workspace",
  reqController.workspaceFilter,
  authController.connectToWorkspace
);

router.post("/login", reqController.loginFilter, authController.login);

router.post(
  "/tenantsignup",
  authController.protectRoute,
  authController.accessTo("super"),
  reqController.tenantSignupFilter,
  authController.tenantSignup
);

router.post(
  "/clientsignup",
  authController.protectRoute,
  authController.accessTo("admin"),
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
