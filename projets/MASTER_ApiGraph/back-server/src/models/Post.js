const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  author: String,
  title: String,
  link: String
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };
