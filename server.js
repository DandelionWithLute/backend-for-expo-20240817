const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const z = require("zod");
const zodStringSchema = z
  .string()
  .refine((val) => (val.length < 999) & (val.length > 0));

const app = express();
const port = 5000;

const mongoose = require("mongoose");
const userSchema = require("./userSchema");
mongoose
  .connect(process.env.MONGODB_URL)
  .then(console.log("Mongodb Connected!"))
  .catch((err) => console.log(err));

const accessTokenArr = [];

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/api/register", async (req, res) => {
  const body = await req.body;
  const name = zodStringSchema.parse(body.name);
  const email = zodStringSchema.parse(body.email);
  const password = zodStringSchema.parse(body.password);

  console.log(name, email, password);
  const user = await userSchema.create({
    name,
    email,
    password,
    createdAt: new Date(mongoose.now()),
  });
  console.log(user);
  return user;
  // await userSchema.create({})
});

app.post("/api/login", (req, res) => {
  res.send({ message: "Hello" });
});

app.get("/", (req, res) => {
  res.send({ message: "Hello" });
});

app.listen(port, () => {
  console.log(
    `App's listening on port ${port}! http://${process.env.myLocalIp}:${port}`
  );
});
