const Profile = require("../models/profile");
// const User = require("../models/user");

async function index(req, res) {
  try {
    const currentUser = req.user;

    let profile = await Profile.findOne({ user: currentUser._id }).populate(
      "user"
    );

    if (!profile) {
      profile = await Profile.create({
        userName: currentUser.name,
        googleId: currentUser.googleId,
        avatar: currentUser.avatar,
        user: currentUser._id,
      });
    }

    res.render("profile/index", {
      user: currentUser,
      profile: profile,
      title: "My Diet Diary",
    });
  } catch (err) {
    console.log(err);
    res.redirect("/posts");
  }
}

async function edit(req, res) {
  try {
    const profile = await Profile.findById(req.params.id);
    res.render("profile/edit", { profile, title: "My Diet Diary" });
  } catch (err) {
    console.log(err);
    res.redirect("/profile/index");
  }
}

async function update(req, res) {
  try {
    const profileId = req.params.id;
    const updatedData = req.body;

    let profile = await Profile.findById(profileId);
    Object.assign(profile, updatedData);
    await profile.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect("/profile/index");
}

module.exports = { index, edit, update };
