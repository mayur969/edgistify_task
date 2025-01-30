import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, required: true },
});

export type productDocument = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

export const Product = mongoose.model("Product", ProductSchema);