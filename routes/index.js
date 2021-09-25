const router = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware");
const authController = require("../controllers/auth.controller")

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

//Auth
router.post("/login", authMiddleware.isNotAuthenticated, authController.login)

module.exports = router;