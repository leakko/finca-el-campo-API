const router = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware");
const authController = require("../controllers/auth.controller")
const usersController = require("../controllers/users.controller")

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* AUTH */

//login
router.post("/login", authMiddleware.isNotAuthenticated, authController.login)

//register
router.post(
  "/users",
  authMiddleware.isNotAuthenticated,
  usersController.createUser
);

module.exports = router;