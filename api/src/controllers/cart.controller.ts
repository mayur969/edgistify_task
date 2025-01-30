import { Request, Response } from "express";
import { cartItemaddSchema, updateProductSchema } from "../utils/types/cartTypes";
import { Cart } from "../schema/cart";
import { findProductById, findUserCart } from "../utils/dbQueries";

export const getCart = async (req: Request, res: Response) => {
  const { user } = req.body;

  try {
    const cart = await Cart.findById(user.userCart).populate({path: "products.productId"}).lean().exec();

    if (!cart) {
      res.status(400).json({ message: "Cart not found." });
      return;
    }

    res.status(200).json({ cart });
    return;
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving the cart.",
      error,
    });
    return;
  }
}

export const addProduct = async (req: Request, res: Response) => {
  const { user, ...product } = req.body;

  try {
    cartItemaddSchema.parse(product);
  } catch (error) {
    res.status(400).json({
      errorCode: "INVALID_DATA_FORMAT",
      message:
        "The data provided is in an invalid format. Please check and try again.",
      error,
    });
    return;
  }

  const { productId, quantity } = product;
  try {
    const item = await findProductById(productId);

    if (!item) {
      res.status(400).json({ message: "Product not found." });
      return;
    }

    if (item.quantity < quantity) {
      res.status(400).json({ message: "Not enough stock." });
      return;
    }

    const cart = await findUserCart(user.userCart);

    if (!cart) {
      res.status(400).json({ message: "Cart not found." });
      return;
    }

    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (productIndex >= 0) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ productId: item._id, quantity });
    }
    await cart.save();

    res.status(201).json({ message: "Product added to cart successfully." });
    return;
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while adding products to cart.",
      error,
    });
    return;
  }
};

export const updateProductQuantity = async (req: Request, res: Response) => {
  const { product, user } = req.body;

  try {
    updateProductSchema.parse(product);
  } catch (error) {
    res.status(400).json({
      errorCode: "INVALID_DATA_FORMAT",
      message:
        "The data provided is in an invalid format. Please check and try again.",
      error,
    });
    return;
  }

  const { productId, action } = product;

  try {
    const item = await findProductById(productId);
    if (!item) {
      res.status(400).json({ message: "Product not found." });
      return;
    }

    const cart = await findUserCart(user.userCart);
    if (!cart) {
      res.status(400).json({ message: "Cart not found." });
      return;
    }
    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (productIndex >= 0) {
      if (action === "increase") {

        if (item.quantity <= cart.products[productIndex].quantity + 1) {
          res.status(400).json({ message: "Not enough stock available." });
          return;
        }
        cart.products[productIndex].quantity += 1;

      } else if (action === "decrease") {
        
        cart.products[productIndex].quantity -= 1;

        if (cart.products[productIndex].quantity <= 0) {
          cart.products.splice(productIndex, 1);
        }
      }
    } else {
      res.status(400).json({ message: "Product not in cart." });
      return;
    }

    await cart.save();

    res.status(200).json({ message: "Cart updated successfully." });
    return;
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the cart.",
      error,
    });
    return;
  }
};
