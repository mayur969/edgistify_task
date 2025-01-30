import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userCart: {type: mongoose.Schema.Types.ObjectId, ref: "Cart"},
    orders: {type: [mongoose.Schema.Types.ObjectId], ref: "Order"},
  });
  
export const User = mongoose.model("User", UserSchema);