const postModel = require("../features/Models/postsModel");
const userModel = require("../features/Models/usersModel");
// -----------  create post ------------------//

const createPost = async (req, res) => {
  const { content, user_id } = req.body;

  if (!content) {
    return res.send({ msg: "Please Enter all the fields" });
  }
  if (content.length > 300) {
    return res.send({ msg: "Name must contains less than 50 characters" });
  }

  try {
    const { post } = await userModel.findById(user_id);
    await userModel.findByIdAndUpdate(user_id, { post: post + 1 });
    const posts = new postModel(req.body);
    await posts.save();
    res.status(201).send("created");
  } catch (e) {
    res.send(e.message);
  }
};
//---------------------------------------------------//

const getPosts = async (req, res) => {
  try {
    const Posts = await postModel.find({}).populate("user_id", "-email");
    return res.status(200).send(Posts);
  } catch (e) {
    res.send(e.message);
  }
};
// ----------- getting post by id ------------------//
const getPostById = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await postModel.findById(postId).populate("user_id", "-email");
    if (post) {
      return res.status(200).send(post);
    } else {
      return res.status(404).send("not found");
    }
  } catch (e) {
    res.send(e.message);
  }
};
//---------------------------------------------------//

// -----------  updates post by id ------------------//
const updatePostById = async (req, res) => {
  const postId = req.params.id;
  const { body } = req;
  try {
    await postModel.findByIdAndUpdate(postId, body, { new: true });
    res.status(200).send("post updated");
  } catch (e) {
    res.send(e.message);
  }
};
//--------------------------------------------------------//

// -----------  delete post by id ------------------//
const deletePostById = async (req, res) => {
  const postId = req.params.id;
  try {
    await postModel.findByIdAndDelete(postId);
    res.send("post deleted");
  } catch (e) {
    res.send(e.message);
  }
};
//--------------------------------------------------------//

const hadleLikes = async (req, res) => {
  const postId = req.params.id;
  const { body } = req;
  try {
    let likes = await postModel.findByIdAndUpdate(postId, body, { new: true });
    res.send(likes);
  } catch (e) {
    res.send(e.message);
  }
};

// -----------  getAnalyticsPosts ------------------//
const getAnalyticsPosts = async (req, res) => {
  try {
    const totalPosts = await postModel.find({}).count();
    return res.status(200).send({ count: totalPosts });
  } catch (e) {
    res.send(e.message);
  }
};
//--------------------------------------------------------//

const topFivePost = async (req, res) => {
  try {
    const posts = await postModel.find({}).sort({ likes: -1 }).limit(5);
    res.status(200).send(posts);
  } catch (e) {
    res.send(e.message);
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePostById,
  deletePostById,
  hadleLikes,
  getAnalyticsPosts,
  topFivePost,
};
