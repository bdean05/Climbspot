const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    title: String,
    text: String,
    id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "tag",
    }]
})

const Blog = mongoose.model("Blog", blogSchema)

module.exports = Blog