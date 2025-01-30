import { Router } from "express";
import verifyToken from "../middleware/verifyToken";
import { addProduct, getCart, updateProductQuantity } from "../controllers/cart.controller";

const router = Router();

router.get("/", verifyToken, getCart)
router.post("/addProduct", verifyToken, addProduct)
router.post("/updateProductQuantity", verifyToken, updateProductQuantity)

export default router;