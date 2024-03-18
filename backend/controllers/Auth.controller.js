import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// sign up
export const signUp = async (req, res) => {
  // res.send("Sign up Please!!!");
  const { fullName, userName, password, confirmPassword, gender } = req.body;

  // Validation of password
  if (password !== confirmPassword) {
    return res.status(401).json({
      error: "Password does not match",
    });
  }

  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    // finding if the user exist
    const user = await User.findOne({ userName });

    // if user exists
    if (user) {
      return res.status(400).json({
        error: "Username already exist",
      });
    }

    const profilepic = `https://ui-avatars.com/api/?name=${fullName}`;

    const newUser = new User({
      fullName,
      userName,
      password: hashPassword,
      gender,
      profilepic,
    });

    await newUser.save();

    const cookie = generateToken(newUser._id, res);

    res.status(201).json({
      message: "User created successfully",
      _id: newUser._id,
      username: newUser.userName,
      fullName: newUser.fullName,
      profilepic: newUser.profilepic,
      cookie: cookie,
    });
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({
      error: "Internal Server error",
    });
  }
};

//login
export const login = async (req, res) => {
  console.log("login route hit");

  const { userName, password } = req.body;

  try {
    // res.status(201).json({
    //   message: "recieved",
    // });
    const user = await User.findOne({ userName });
    // console.log(user);
    console.log("try is working in login");
    // console.log("user database - ", user);
    if (user === null || !user) {
      console.log("its null");
      return res.status(500).json({
        error: "User Does not exist please created an account",
      });
    } else {
      const isPasswordMatch = await bcrypt.compare(
        password,
        user?.password || " "
      );
      if (!isPasswordMatch) {
        return res.status(401).json({
          error: "Incorrect password",
        });
      } else {
        const cookie = generateToken(user._id, res);
        res.status(201).json({
          message: "User logged in successfull",
          cookie,
          _id: user._id,
          username: user.userName,
          fullName: user.fullName,
          profilepic: user.profilepic,
        });
      }
    }
    // console.log(res);
  } catch (error) {
    // }
    console.log("Error in login controller", error);
    res.status(500).json({
      error: "Internal Server error",
    });
  }
};

//logout
export const logout = (req, res) => {
  try {
    // console.log(req.cookie);

    // console.log(res);
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({
      message: "Logged out Succesfully",
    });
  } catch (error) {
    console.log("Error in logout controller", error);
    res.status(500).json({
      error: "Internal Server error",
    });
  }
};
