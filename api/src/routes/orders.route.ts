import { Router } from "express";
import verifyToken from "../middleware/verifyToken";
import { createOrder } from "../controllers/orders.controller";

const router = Router();

router.post("/", verifyToken, createOrder)

export default router;