const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  mealDate: { type: Date, required: true },
  mealType: { type: String, required: true },
  mealTime: String,
  weight: Number,
  text: String,
  photo: String,
  profile: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
  },
});

module.exports = mongoose.model("Post", postSchema);
