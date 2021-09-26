const User = require("../models/User.model");
const createError = require("http-errors");
const jsonwebtoken = require("jsonwebtoken");

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  // check user exists
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      next(
        createError(404, {
          error: "Email or password is incorrect",
        })
      );
    } else {
      // if exists, check password
      return user.checkPassword(password).then((match) => {
        if (!match) {
          next(
            createError(404, {
              error: "Email or password is incorrect",
            })
          );
        } else {
          // if right password, generate token
          res.json({
            access_token: jsonwebtoken.sign(
              { 
                id: user._id,
                role: user.role
              },
              process.env.JWT_SECRET || "changeme",
              {
                expiresIn: "1d",
              }
            ),
          });
        }
      });
    }
  });
};