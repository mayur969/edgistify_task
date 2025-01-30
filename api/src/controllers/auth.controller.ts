import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { loginSchema, userInfoSchema } from "../utils/types/userTypes";
import jwt from "jsonwebtoken";
import { User } from "../schema/user";
import env from "../../env";
import { Cart } from "../schema/cart";

const salt = bcrypt.genSaltSync(10);

export const register = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;

  try {
    userInfoSchema.parse(req.body);
  } catch (error) {
    return res.status(400).json({
      errorCode: "INVALID_DATA_FORMAT",
      message:
        "The data provided is in an invalid format. Please check and try again.",
      error,
    });
    ;
  }

  try {
    const user = await User.find({ email });
    if (user.length > 0) {
      return res.status(400).json({ message: "User with this email already exists." });
    }

    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = await new User({
      fullName,
      email,
      password: hashedPassword,
    });

    const cart = await new Cart({}).save();

    newUser.userCart = cart._id;
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully.", newUser });
  } catch (error) {
    return res.status(400).json({
      message: "An error occurred while registering the user.",
      error,
    });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  try {
    loginSchema.parse(req.body);
    
  } catch (error) {
    return res.status(400).json({
      errorCode: "INVALID_DATA_FORMAT",
      message:
        "The data provided is in an invalid format. Please check and try again.",
    });
  }

  const user = await User.findOne({ email }).lean();

  if (!user) {
    return res.status(400).json({ message: "User not found." });
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid password." });
    
  }

  const { password: userPassword, _id, ...userData } = user;

  const token = jwt.sign({ userData }, env.JWT_SECRET_KEY, {
    expiresIn: env.SEESION_TOKEN_AGE,
  });

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: env.SEESION_TOKEN_AGE,
  });

  return res.status(200).json({ message: "User logged in successfully.", userData });
};
