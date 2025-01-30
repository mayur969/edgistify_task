import { Router } from "express";
import { addProduct, getProducts } from "../controllers/product.controller";


const router = Router();

router.post("/addProduct", addProduct);
router.get("/getProducts", getProducts);


export default router;