const router = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware");
const authController = require("../controllers/auth.controller")
const usersController = require("../controllers/users.controller")
const celebrationsController = require("../controllers/celebrations.controller")

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

/* CELEBRATIONS */

router.get(
  "/celebrations",
  celebrationsController.getCelebrations
)

router.post(
  "/celebrations",
  celebrationsController.createCelebration
)

module.exports = router;