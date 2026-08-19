import users from "../Models/userModel.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await users.create({
      name,
      email,
      password: hashedPassword
    });
    res.status(201).json({
      message: "User registered successfully",
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function login(req, res) {
  try {
    const {email , password} = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await users.findOne({email})

    if(!user){
      res.status(401).json({message:"Invalid Email or Password!"})
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {id: user._id}, 
      process.env.JWT_SECRET,
      {expiresIn: "1d"} 
    )

    res.status(200).json({
      message: "Login successful",
      token: token,
      user: { id: user._id, name: user.name, email: user.email }
    });


  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
