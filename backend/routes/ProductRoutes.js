import express from "express";
import { createProduct, deleteProduct, getAllProducts, updateProduct } from "../controller/ProductContollers.js";

const router = express.Router();

router.get("/", getAllProducts);

router.post("/", createProduct);

router.delete("/:id", deleteProduct);

router.put("/:id", updateProduct);

export default router;