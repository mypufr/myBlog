import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required"));
    // return res.status(400).json({message:"All fields are required"})
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(200).json({ message: "Signup successfully" });
    console.log(req.body);
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
    // return res.status(400).json({message:"All fields are required"})
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    const validPassword = await bcryptjs.compareSync(
      password,
      validUser.password
    );
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    // prevent from sending the password : to separate the password from the rest of the data
    // pass: to five a new variable name for password
    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};


export const google = async (req, res, next) => {
  const {email, name, googlePhotoUrl} = req.body;

  try {
  const user = await User.findOne({email});

// as like Login: if the user already exists
  if(user){
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
    const {password, ...rest} = user._doc;
    res.status(200).cookie('acess_token', token, {
     httpOnly: true,
    }).json(rest);
  }else{
// as like Signup: If the user does not exist, the function creates a new user with the provided Google account details (email, name, profile picture URL). It generates a random password for the user, hashes it, and saves the new user in the database.
    const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
    const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
    const newUser = new User({
      username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
      email,
      password: hashedPassword,
      profilePicture: googlePhotoUrl,
    })
    await newUser.save();
    const token = jwt.sign({ id: newUser._id}, process.env.JWT_SECRET);
    const { password, ...rest } = newUser._doc;
    res
    .status(200)
    .cookie('access_token', token, {
      httpOnly: true,
    })
    .json(rest);
  }
  }catch (error){
    next(error)
  }
}