const mongoose = require("mongoose");
const schema = new mongoose.Schema();

const spotSchema = new Schema({
  name: String,
  ref: String,
  address: [""],
  latitude: Number,
  longitude: Number,
  image: "",
  description: [""],
  Comment: [String],
  category: {
    type: String,
    enum: ["", "", ""]
  },
  id_tags: [{
    type: mongoose.Schema.Types.Object,
    ref: "Tag"
  }]
});