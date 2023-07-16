const Post = require("../models/post");

async function index(req, res) {
  try {
    const posts = await Post.find({});
    res.render("posts/index", { posts });
  } catch (err) {
    console.log(err);
    res.redirect("posts");
  }
}

module.exports = { index };
