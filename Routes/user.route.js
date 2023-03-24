const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../Models/user.model");
const UserRouter = express.Router();
const jwt = require("jsonwebtoken");
const cookieparser = require('cookie-parser');
const {
  generateAccessToken,
  generateRefreshToken,
  setAccessTokenCookie,
  setRefreshTokenCookie,
} = require('../Middleware/generateToken');
require("dotenv").config();

UserRouter.use(cookieparser())

UserRouter.get("/", (req, res) => {
  res.send("user Page");
});

UserRouter.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const currentUser = await UserModel.findOne({ email });
    if (currentUser) {
      res.send({ message: "User already exist" });
    } else {
      bcrypt.hash(
        password,
        Number(process.env.ROUND),
        async function (err, hashedPassword) {
          if (err) {
            res.send({ message: err.message });
          } else {
            const newUser = new UserModel({
              email,
              password: hashedPassword,
            });

            await newUser.save();
            res
              .status(200)
              .send({ message: "User saved successfully", user: newUser });
          }
        }
      );
    }
  } catch (error) {
    res.send("Error: " + error.message);
  }
});

UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          res.send(err.message);
        } else {
          if (result) {
            // const token = jwt.sign(
            //   { userId: currentUser._id },
            //   process.env.SECRET_KEY,
            //   { expiresIn: "1m" }

            //   );
            //   const refreshToken = jwt.sign({
            //     userId: currentUser._id,
            //    },process.env.REFRESH_SECRET_KEY, {expiresIn:'5m'})

            const accessToken = generateAccessToken(user)
            const refreshToken = generateRefreshToken(user)
            
            setAccessTokenCookie(res,accessToken)
            setRefreshTokenCookie(res,refreshToken)






            res.send({ message:'Login successful!', accessToken: accessToken, refreshToken: refreshToken});
          } else {
            res.send({ message: "Invalid credentials" });
          }
        }
      });
    } else {
      res
        .status(404)
        .send({ message: "User not found! Please try again later" });
    }
  } catch (error) {}
});



UserRouter.post('/refresh_token', (req, res) => {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) {
    return res.sendStatus(401);
  }

  jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    const accessToken = generateAccessToken(user);
    setAccessTokenCookie(res, accessToken);
    const newRefreshToken = generateRefreshToken(user);
    setRefreshTokenCookie(res, newRefreshToken);
    res.send({ access_token: accessToken });
  });
});


module.exports = { UserRouter };
