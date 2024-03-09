import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // in miliseconds
    httpOnly: true, // prevent from xss attack
    sameSite: true, // prevent csrf attacks,
  });

  console.log("cookie set succefully");
};

export default generateToken;
