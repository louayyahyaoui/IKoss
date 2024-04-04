const jwt = require("jsonwebtoken");
const { daysFromNow } = require("../helpers/date");
const User = require("../models/User");

const BACKOFFICE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.BACKOFFICE_API_PROD
    : process.env.BACKOFFICE_API;

exports.login = async (req, res) => {

  const { email, password } = req.body;
  const user = await User.findOne({ email , password}).select("+password").exec();
  if (!user) {
    return res.status(401).json({ error: "Username or password is incorrect" });
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRET, {
    expiresIn: "31d",
  });
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    expires: daysFromNow(30),
  });
  const accessToken = jwt.sign(
    {
      id: user._id,
    },
    process.env.SECRET,
    {
      expiresIn: "15m",
    }
  );
  let userWithoutPassword = user.toObject();
  delete userWithoutPassword.password;
  return res.json({ token: accessToken, user: userWithoutPassword });
};
exports.getAccessToken = async (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Username or password is incorrect" });
    }
    const { id } = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(id)
      .select("+password")
      .exec();
    if (!user) {
      return res
        .status(401)
        .json({ error: "Username or password is incorrect" });
    }
  
    const accessToken = jwt.sign(
      {
        id: user._id,
        access: user.userOfData?.access.ofs,
        role: user.role,
        regie: user.teleproData?.regie,
      },
      process.env.SECRET,
      {
        expiresIn: "15m",
      }
    );
    let userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
  
    return res.json({ token: accessToken, user: userWithoutPassword });
  };
  
  exports.logout = (req, res) => {
    res.cookie("refreshToken", "", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      expires: new Date(0),
    });
    return res.send("logged out");
  };
