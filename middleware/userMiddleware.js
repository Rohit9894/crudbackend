const userModel = require("../features/Models/usersModel");
const checkUser = async (req, res, next) => {
  const userId = req.params.id;

  if (userId.length !== 24) {
    return res.send("not valid user id");
  }
  try {
    const user = await userModel.findById(userId);
    if (user) {
      next();
      return;
    } else {
      res.status(404).send("user not found");
    }
  } catch (e) {
    res.send(e.message);
  }
};
module.exports = checkUser;
