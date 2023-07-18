const Post = require("../models/comment");

async function create(req, res) {
  const post = await Post.findById(req.params.id);

  //   req.body.user = req.user._id;
  //   req.body.userName = req.user.name;
  //   req.body.userAvatar = req.user.avatar;
}

module.exports = { create };
