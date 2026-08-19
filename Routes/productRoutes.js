import express from "express"
import { createProduct, getProducts, getProduct, deleteProduct, updateProduct, getProductsByCategory } from "../Controllers/productController.js"
import upload from "../Middleware/uploads.js"
import verifyToken from "../Middleware/verifyToken.js"


const router = express.Router()

router.get("/", getProducts)
router.get("/category/:name", getProductsByCategory)
router.get("/:id", getProduct)
router.post("/", upload.single("image"),verifyToken ,createProduct )
router.delete("/:id", verifyToken, deleteProduct)
router.put("/:id", verifyToken, updateProduct)

export default router


