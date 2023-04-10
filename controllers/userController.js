const userModel = require("../features/Models/usersModel");

// ----------- creating User ------------------//
const createUser = async (req, res) => {
  const { name, email, bio } = req.body;
  if (!name || !email) {
    return res.send({ msg: "Please Enter all the fields" });
  }
  if (name.length > 50) {
    return res.send({ msg: "Name must contains less than 50 characters" });
  }
  if (bio.length > 200) {
    return res.send({ msg: "Bio must contains less than 50 characters" });
  }
  if (
    !email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    return res.send({ msg: "Invalid Email" });
  }
  const userExist = await userModel.findOne({ email });
  if (userExist) {
    return res.send({ msg: "User already exist" });
  }

  try {
    const user = new userModel(req.body);
    await user.save();
    res.status(201).send({ msg: "created" });
  } catch (e) {
    res.send(e.message);
  }
};
//---------------------------------------------------//
const getUsers = async (req, res) => {
  try {
    const Users = await userModel.find({});
    return res.status(200).send(Users);
  } catch (e) {
    res.send(e.message);
  }
};
// ----------- getting user by id ------------------//
const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userModel.findById(userId);
    if (user) {
      return res.status(200).send(user);
    } else {
      return res.status(404).send("not found");
    }
  } catch (e) {
    res.send(e.message);
  }
};
//---------------------------------------------------//

// -----------  updates user by id ------------------//
const updateUserById = async (req, res) => {
  const userId = req.params.id;
  const { body } = req;
  try {
    await userModel.findByIdAndUpdate(userId, body, { new: true });
    res.status(200).send("user updated");
  } catch (e) {
    res.send(e.message);
  }
};
//--------------------------------------------------------//

// -----------  delete user by id ------------------//
const deleteUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    await userModel.findByIdAndDelete(userId);
    res.status(204).send("user deleted");
  } catch (e) {
    res.send(e.message);
  }
};
//--------------------------------------------------------//

// -----------  getAnalyticsUsers ------------------//
const getAnalyticsUsers = async (req, res) => {
  try {
    const totalUsers = await userModel.find({}).count();
    return res.status(200).send({ count: totalUsers });
  } catch (e) {
    res.send(e.message);
  }
};

const topFiveUser = async (req, res) => {
  try {
    const users = await userModel.find({}).sort({ post: -1 }).limit(5);
    res.send(users);
  } catch (e) {
    res.send(e.message);
  }
};
module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  getAnalyticsUsers,
  topFiveUser,
};
