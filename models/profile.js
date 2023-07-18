const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  userName: String,
  googleId: {
    type: String,
    required: true,
  },
  avatar: String,
  bio: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Profile", profileSchema);
