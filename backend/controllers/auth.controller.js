import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const signup = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      return res
        .status(400)
        .json({ message: "All fields are Required", success: false });
    }

    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const user = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await user.save();

    generateTokenAndSetCookie(res, user._id);

    return res.status(201).json({
      message: "User created successfully",
      success: false,
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in signup" + error);
    return res
      .status(500)
      .json({ message: "Internal sever exception", sucess: false });
  }
};

export const login = async (req, res) => {};

export const logout = async (req, res) => {};
