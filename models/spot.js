const mongoose = require("mongoose");
const schema = new mongoose.Schema();

const spotSchema = new Schema({
  name: String,
  ref: String,
  address: [""],
  latitude: String,
  longitude: String,
  image: "",
  description: [""],
  Comment: [],
  category: {
    type: String,
    enum: ["", "", ""]
  },
  id_tags: [{ type: Schema.Types.Object, ref: "Tag" }]
});
