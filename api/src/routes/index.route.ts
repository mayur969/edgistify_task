import { Router } from "express";
import authRoute from "./auth.route";
import cartRoute from "./cart.route";
import productsRoute from "./products.route";
import ordersRoute from "./orders.route";

const router = Router();

router.use("/auth" ,authRoute)
router.use("/cart", cartRoute)
router.use("/products", productsRoute)
router.use("/orders", ordersRoute)

export default router;