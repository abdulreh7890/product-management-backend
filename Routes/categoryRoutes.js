import express from "express"
import { getCategories, createCategory, getCategory , deleteCategory, updateCategory} from "../Controllers/categoryController.js"


const router = express.Router()

router.get("/categories", getCategories)
router.get("/categories/:id", getCategory)
router.post("/categories", createCategory)
router.delete("/categories/:id", deleteCategory)
router.put("/categories/:id", updateCategory)

export default router
