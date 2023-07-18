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

async function edit(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    res.render("posts/edit", { post, title: "My Diet Diary" });
  } catch (err) {
    console.log(err);
    res.redirect("/posts");
  }
}

async function update(req, res) {
  try {
    const postId = req.params.id;
    const updatedData = req.body;

    let post = await Post.findById(postId);
    Object.assign(post, updatedData);
    await post.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect("/posts");
}

async function deletePost(req, res) {
  const postId = req.params.id;

  try {
    const deletedPost = await Post.deleteOne({ _id: postId });
  } catch (err) {
    console.log(err);
  }

  res.redirect("/posts");
}

module.exports = {
  index,
  new: newPost,
  create,
  edit,
  update,
  delete: deletePost,
};
