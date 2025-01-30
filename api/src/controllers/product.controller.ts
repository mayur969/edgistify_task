import { Product } from "../schema/products";
import { Request, Response } from "express";

export const addProduct = async (req: Request, res: Response) => {

    const { name, description, price,image, quantity } = req.body;
  
    try {
      const newProduct = await Product.create({
        name,
        description,
        price,
        image,
        quantity,
      });
  
      return res.status(201).json({ message: "Product added successfully.", newProduct });
    } catch (error) {
      return res.status(400).json({
        message: "An error occurred while adding the product.",
        error,
      });
    }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 12; 
    const skip = (page - 1) * limit;

    const products = await Product.find()
      .skip(skip)
      .limit(limit + 1)
      .lean();

    const hasMore = products.length > limit;
    
    const productsToSend = hasMore ? products.slice(0, limit) : products;

    return res.json({
      products: productsToSend,
      hasMore
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching products' });
  }
};