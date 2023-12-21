const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  author: String,
  content: String,
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }
}, { timestamps: true });

const Comment = mongoose.model("Comment", commentSchema);

module.exports = { Comment };
