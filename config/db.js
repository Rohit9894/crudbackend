const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const connect = async () => {
  mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
module.exports = connect;
