const mongoose = require("mongoose")
const Schema = mongoose.Schema

const blogSchema = new Schema({
    date: String,
    title: String,
    text: String,
    author: String,
    spot: {
        type: Schema.Types.ObjectId,
        ref: "Spot"
    },
    image: String
})

const Blog = mongoose.model("Blog", blogSchema)

module.exports = Blog