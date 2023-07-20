const Post = require("../models/post");
const Profile = require("../models/profile");

async function index(req, res) {
  try {
    const mealTypeOrder = {
      breakfast: 1,
      lunch: 2,
      dinner: 3,
      snack: 4,
    };

    const currentUser = req.user;

    let profile = await Profile.findOne({ user: currentUser._id });

    if (!profile) {
      profile = await Profile.create({
        userName: currentUser.name,
        googleId: currentUser.googleId,
        avatar: currentUser.avatar,
        user: currentUser._id,
      });
    }

    const posts = await Post.find({ profile: profile._id }).sort({
      mealDate: -1,
      mealType: 1,
    });

    const dateGroups = {};

    posts.forEach((post) => {
      const dateKey = post.mealDate.toDateString();

      if (!dateGroups[dateKey]) {
        dateGroups[dateKey] = [];
      }

      dateGroups[dateKey].push(post);
    });

    const sortedDateGroups = Object.entries(dateGroups).sort(
      ([dateA], [dateB]) => new Date(dateB) - new Date(dateA)
    );

    sortedDateGroups.forEach(([date, posts]) => {
      posts.sort((a, b) => {
        const mealTypeA = a.mealType.toLowerCase();
        const mealTypeB = b.mealType.toLowerCase();

        return mealTypeOrder[mealTypeA] - mealTypeOrder[mealTypeB];
      });
    });

    res.render("posts/index", {
      dateGroups: sortedDateGroups,
      title: "My Diet Diary",
      posts,
      profile: profile,
    });
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
    const userProfileId = req.user._id;
    let profile = await Profile.findOne({ user: userProfileId });
    console.log(`User profile!!! ${profile}`);

    await Post.create({
      mealDate: req.body.mealDate,
      mealType: req.body.mealType,
      mealTime: req.body.mealTime,
      weight: req.body.weight,
      text: req.body.text,
      photo: req.body.photo,
      profile: profile._id,
    });
    res.redirect("posts");
  } catch (err) {
    res.render("posts/new", { errorMsg: err.message, title: "My Diet Diary" });
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
    await Post.deleteOne({ _id: postId });
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
