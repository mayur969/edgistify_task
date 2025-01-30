import { Request, Response } from "express";
import { shippingAddressSchema } from "../utils/types/orderType";
import { Cart } from "../schema/cart";
import { Product } from "../schema/products";
import { Order } from "../schema/order";
import { User } from "../schema/user";

export const createOrder = async (req: Request, res: Response) => {
  const { shippingAddress, user } = req.body;

  try {
    shippingAddressSchema.parse(shippingAddress);
  } catch (error) {
    return res.status(400).json({
      errorCode: "INVALID_DATA_FORMAT",
      message:
        "The data provided is in an invalid format. Please check and try again.",
      error,
    });
  }

  try {
    const cart = await Cart.findById(user.userCart)
      .populate({
        path: "products.productId",
      })
      .lean()
      .exec();

    if (!cart || cart.products.length === 0) {
      return res.status(404).json({
        errorCode: !cart ? "CART_NOT_FOUND" : "CART_EMPTY",
        message: !cart ? "Cart not found" : "Cart is empty",
      });
    }

    //check  if items are available
    let totalPrice = 0;
    const updatedProducts = [];

    for (const product of cart.products) {
      const productData: any = product.productId;

      if (productData.quantity < product.quantity) {
        return res.status(400).json({
          errorCode: "INSUFFICIENT_STOCK",
          message: `The product ${
            productData.name || "unknown"
          } is out of stock.`,
        });
      }

      productData.quantity -= product.quantity;
      updatedProducts.push({
        productId: productData._id,
        quantity: productData.quantity,
      });

      totalPrice += productData.price * product.quantity;
    }

    totalPrice = Math.round(totalPrice * 100) / 100;

    const order = await new Order({
      userId: user._id,
      products: cart.products.map((product: any) => ({
        productId: product.productId._id,
        quantity: product.quantity,
        price: product.productId.price,
      })),
      totalPrice,
      shippingAddress,
      paymentStatus: "Pending",
      orderStatus: "Pending",
    }).save();

    await Product.bulkWrite(
      updatedProducts.map((prod) => ({
        updateOne: {
          filter: { _id: prod.productId },
          update: { $set: { quantity: prod.quantity } },
        },
      }))
    );

    //save order id into userdata
    await User.findByIdAndUpdate(user._id, { $push: { orders: order._id } });

    await Cart.findByIdAndUpdate(user.userCart, { $set: { products: [] } });

    return res.status(200).json({ message: "Order placed successfully" });
  } catch (error) {
    return res.status(500).json({
      errorCode: "INTERNAL_SERVER_ERROR",
      message: "An error occurred while fetching the cart.",
      error,
    });
  }
};
