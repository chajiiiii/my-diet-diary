const Post = require("../models/post");

async function index(req, res) {
  try {
    const posts = await Post.find({});
    res.render("posts/index", { posts, title: "My Diet Diary" });
  } catch (err) {
    console.log(err);
    res.redirect("posts");
  }
}

function newPost(req, res) {
  res.render("posts/new", { errorMsg: "", title: "My Diet Diary" });
}

async function create(req, res) {
  try {
    await Post.create(req.body);
    res.redirect("posts");
  } catch (err) {
    console.log(err);
    res.render("posts/new", { errorMsg: err.message });
  }
}

module.exports = {
  index,
  new: newPost,
  create,
};
