const { Schema, model, Mongoose } = require("mongoose");

const celebrationSchema = new Schema({
  date: {
    type: Date
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Inicia sesión para poder reservar tu fecha"]
  }
},
{
  timestamps: true
});

const Celebration = model("Celebration", celebrationSchema);

module.exports = Celebration;