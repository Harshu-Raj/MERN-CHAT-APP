const express = require('express');
const router = express.Router();
const userModel = require('../model/user');
const bcrypt = require('bcrypt');
require('dotenv').config();


const jwt=require('jsonwebtoken');
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        // Check if the user already exists
        const userexist = await userModel.findOne({ email });

        if (userexist) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        // Check if all fields are provided
        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ msg: "Passwords do not match" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const user = new userModel({
            name,
            email,
            password: hashPassword,
        });

        // Save user to DB
        await user.save();

        // Send success response (Important for frontend redirection)
        return res.status(201).json({ 
            success: true, 
            msg: "Registration successful" 
        });

    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ status: "Failed", message: "All fields are required" });
        }

        // Find user in database
        const user = await userModel.findOne({ email:email});
        // console.log(user);

        if (!user) {
            return res.status(400).json({ status: "Failed", message: "User not registered" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ status: "Failed", message: "Email or password is incorrect" });
        }

        // Generate JWT Token
        const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "5d" });

        // Send success response with token
        return res.status(200).json({
            success: true,
            msg: "Login successful",
            token
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ status: "Failed", message: "Unable to login" });
    }
});
router.get('/:id',async(req,res)=>{
    try{
        const user=await userModel.findById(req.params.id);
        console.log(user);
        if(!user)return res.status(404).json({message:"User not found"})
            res.json(user);
    }catch(err){
        res.status(500).json({error:err.message});
    }
})

module.exports = router;