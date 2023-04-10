const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  getAnalyticsUsers,
  topFiveUser,
} = require("../../controllers/userController");
const checkUser = require("../../middleware/userMiddleware");
router.route("/users").post(createUser);

router.route("/users").get(getUsers);
router.route("/users/:id").get(checkUser, getUserById);
router.route("/users/:id").put(checkUser, updateUserById);
router.route("/users/:id").delete(checkUser, deleteUserById);
router.route("/analytics/users").get(getAnalyticsUsers);
router.route("/analytics/users/top-active").get(topFiveUser);
module.exports = router;
