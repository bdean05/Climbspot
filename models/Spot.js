const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spotSchema = new Schema({
  name: String,
  ref: String,
  address: String,
  latitude: Number,
  longitude: Number,
  image: String,
  description: String,
  comments: [
    {
      username: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      content: String,
    },
  ],
  category: {
    type: String,
    enum: ["", "", ""],
  },
});

const Spot = mongoose.model("Spot", spotSchema);

module.exports = Spot;
