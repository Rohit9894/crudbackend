const mongoose = require("mongoose");
const userModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: [50, "Name must contains less than 50 characters"],
    },
    email: {
      type: String,
      required: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    post: { type: Number, default: 1, min: 0 },
    bio: {
      type: String,
      maxlength: [200, "Bio must contains less than 50 characters"],
    },
  },
  { timestamps: true }
);

const user = mongoose.model("user", userModel);
module.exports = user;
