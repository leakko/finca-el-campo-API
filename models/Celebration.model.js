const { Schema, model, Mongoose } = require("mongoose");

const celebrationSchema = new Schema({
  date: {
    type: Date
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
},
{
  timestamps: true
});

const Celebration = model("Celebration", celebrationSchema);

module.exports = Celebration;