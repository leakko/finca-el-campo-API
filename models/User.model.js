const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const SALT_ROUNDS = 10;

function validateEmail(email) {
  const re = EMAIL_PATTERN;
  return re.test(String(email).toLowerCase());
}

const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, 'Email address is required'],
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [EMAIL_PATTERN, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password is too short"]
  },
  fullName: {
    type: String,
    required: false
  },
  DNI: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER"
  }
},
{
  timestamps: true
});

userSchema.pre("save", function(next) {
  if (this.isModified("password")) {
    bcrypt.hash(this.password, SALT_ROUNDS)
      .then((hash) => {
        this.password = hash;
        next();
      })
  } else {
    next();
  }
})

userSchema.methods.checkPassword = function(passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password);
}

const User = model("User", userSchema);

module.exports = User;
