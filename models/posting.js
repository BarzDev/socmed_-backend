const mongoose = require("mongoose");

//Comment Schema
const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

//Posting Schema
const postingSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: [String],
    default: [],
  },
  comments: {
    type: [commentSchema],
    default: [],
  },
});

const Posting = mongoose.model("Posting", postingSchema);

module.exports = Posting;
