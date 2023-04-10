const { default: mongoose } = require("mongoose");
const postModel = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    likes: { type: Number, default: 1, min: 0 },
    content: {
      type: String,
      min: 1,
      maxlength: [300, "content must contains less than 50 characters"],
    },
  },
  { timestamps: true }
);
const post = mongoose.model("post", postModel);
module.exports = post;
