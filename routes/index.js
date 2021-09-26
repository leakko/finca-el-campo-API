const router = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware");
const authController = require("../controllers/auth.controller")
const usersController = require("../controllers/users.controller")

/* AUTH */

//login
router.post("/login", authMiddleware.isNotAuthenticated, authController.login)

//users
router.get(
  "/users/me",
  authMiddleware.isAuthenticated,
  usersController.getCurrentUser
);

router.post(
  "/users",
  authMiddleware.isNotAuthenticated,
  usersController.createUser
);

module.exports = router;