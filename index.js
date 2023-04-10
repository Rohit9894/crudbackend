require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connect = require("./config/db");
const userRoute = require("./features/Routes/usersRoutes");
const postRoute = require("./features/Routes/postsRoutes");
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/", userRoute);
app.use("/", postRoute);

app.get("/", (req, res) => {
  res.send("<center><h1><i>Hello ~~~~ Adobe</i></h1></center>");
});
app.listen(5000, async () => {
  await connect();
  console.log("http://localhost:5000");
});
