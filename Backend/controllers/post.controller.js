const PostModel = require("../models/Post");
const jwt = require("jsonwebtoken");
const { connect } = require("../routers/post.router");
require("dotenv").config();
const secret = process.env.SECRET;

exports.createPost = async (req, res) => {
  const token = req.headers["x-access-token"];
  if(!token) {
    return res.status(401).json({message:"Token is missing"})
  }
  //File upload
  const { path } = req.file;
  const author = req.userId;
  const {title, summary, content} = req.body;
  if(!title || !summery || !connect) {
    return res.status(400).json({message: "All Fields is required"});
}

const postDoc = await PostModel.create({
    title, 
    summary, 
    content, 
    cover: 
    path, 
    author,
 });
 res.json(postDoc);
};

exports.getPosts = async (req, res) => {
  const posts = await PostModel.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 })
    .limit(20);
    //SELECT * FROM , USER WHERE POST.author = USER._id
    res.json(posts);
};

exports.getPostsById = async (req, res) => {
  const { id } = req.params;
  const postDoc = await PostModel.findById(id).populate
  ("author", ["username"]);
  res.json(postDoc);
};

