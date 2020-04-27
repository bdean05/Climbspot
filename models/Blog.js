const mongoose = require("mongoose")
const Schema = mongoose.Schema

const blogSchema = new Schema({
    title: String,
    text: String,
    spot: {
        type: Schema.Types.ObjectId,
        ref: "Spot"
    }
})

const Blog = mongoose.model("Blog", blogSchema)

module.exports = Blog