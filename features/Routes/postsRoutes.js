const express = require("express");
const {
  createPost,
  getPosts,
  getPostById,
  updatePostById,
  deletePostById,
  hadleLikes,
  getAnalyticsPosts,
  topFivePost,
} = require("../../controllers/postController");
const { getUserById } = require("../../controllers/userController");
const router = express.Router();
router.route("/posts").post(createPost);
router.route("/posts").get(getPosts);
router.route("/posts/:id").get(getPostById);
router.route("/posts/:id").put(updatePostById);
router.route("/posts/:id").delete(deletePostById);
router.route("/posts/:id/like").post(hadleLikes);
router.route("/posts/:id/unlike").post(hadleLikes);
router.route("/analytics/posts").get(getAnalyticsPosts);
router.route("/analytics/posts/top-liked").get(topFivePost);
module.exports = router;
