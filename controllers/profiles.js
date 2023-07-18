const Profile = require("../models/profile");
// const User = require("../models/user");

async function index(req, res) {
  try {
    const currentUser = req.user;
    console.log(`Current User: ${currentUser}`);

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

    console.log(`profile: ${profile}`);

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

// async function show(req, res) {
//   const postId = req.params.id;

//   // req.body.user = req.user._id;
//   // req.body.userName = req.user.name;
//   //  req.body.userAvatar = req.user.avatar;

//   try {
//     const post = await Post.findById(postId);
//     console.log(post);
//     post.profile.push(req.body);
//     await post.save();
//     res.render("profiles/show", { profile, post, title: "My Diet Diary" });
//   } catch (err) {
//     console.log(err);
//     res.redirect("/posts");
//   }
// }

// async function createProfile(req, res) {
//   try {
//     const userId = req.user._id;

//     // Check if the user already has a profile
//     const existingProfile = await Profile.findOne({ user: userId });
//     if (existingProfile) {
//       // If a profile already exists, handle the appropriate action (e.g., redirect to the profile edit page)
//       return res.redirect("/profile/edit");
//     }

//     // Create the initial profile for the logged-in user
//     const initialProfile = {
//       userName: req.user.name,
//       googleId: req.user.googleId,
//       avatar: req.user.avatar,
//       user: userId,
//     };

//     // Create the profile document
//     const profile = await Profile.create(initialProfile);

//     // Handle any further actions after profile creation (e.g., redirect to the profile page)
//     res.redirect("/profile");
//   } catch (err) {
//     console.error(err);
//     // Handle error cases
//     res.status(500).send("Internal Server Error");
//   }
// }
