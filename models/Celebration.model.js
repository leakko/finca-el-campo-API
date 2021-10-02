const { Schema, model, Mongoose } = require("mongoose");

const celebrationSchema = new Schema({
  date: {
    type: Date,
    required: [true, "Selecciona una fecha"]
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Inicia sesión para poder reservar una fecha"]
  }
},
{
  timestamps: true
});

const Celebration = model("Celebration", celebrationSchema);

module.exports = Celebration;