import express from "express"
import { login, register } from "../Controllers/userController.js"



const router = express.Router()

// router.get("/products", getProducts)

router.post("/register", register)
router.post("/login", login)


export default router
