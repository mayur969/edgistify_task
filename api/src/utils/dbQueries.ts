import { Cart } from "../schema/cart";
import { Product } from "../schema/products";

export const findProductById = async (productId: string) => {
    return await Product.findById(productId);
  };
  
export const findUserCart = async (userCartId: string) => {
    return await Cart.findById(userCartId);
  };