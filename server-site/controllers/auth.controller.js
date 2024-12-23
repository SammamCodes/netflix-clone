import { User } from '../models/user.models.js';
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from '../utils/generateToken.js';

// Signup Function
export async function signup(req, res) {
    try {
        const { email, password, username } = req.body;

        // Validate input fields
        if (!email || !password || !username) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format",
            });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least six characters long",
            });
        }

        // Check if email already exists
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).json({
                success: false,
                message: "Email already in use",
            });
        }

        // Check if username already exists
        const existingUserByUsername = await User.findOne({ username });
        if (existingUserByUsername) {
            return res.status(400).json({
                success: false,
                message: "Username already in use",
            });
        }

        // Hash password and generate a random profile image
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

        // Create new user
        const newUser = new User({ email, password: hashedPassword, username, image });
        await newUser.save();

        // Generate token and respond
        generateTokenAndSetCookie(newUser._id, res);

        return res.status(201).json({
            success: true,
            user: {
                ...newUser._doc,
                password: undefined, // Exclude password from response
            },
        });

    } catch (error) {
        console.error("Signup error:", error.message);
        return res.status(500).json({
            success: false,
            message: "An error occurred during signup",
        });
    }
}

// Login Function
export async function login(req, res) {
    try {
        const { email, password } = req.body;

        // Validate input fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found for email:", email);  // Debug log
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Log the stored password hash and incoming password
        console.log("Stored password hash:", user.password);
        console.log("Incoming password:", password);

        // Compare the provided password with the stored hashed password
        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
        if (!isPasswordCorrect) {
            console.log("Password mismatch"); // Debug log
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Generate token and respond
        generateTokenAndSetCookie(user._id, res);

        return res.status(200).json({
            success: true,
            user: {
                ...user._doc,
                password: undefined, // Exclude password from response
            },
        });
    } catch (error) {
        console.error("Login error:", error.message);
        return res.status(500).json({
            success: false,
            message: "An error occurred during login",
        });
    }
}

// Logout Function
export async function logout(req, res) {
    try {
        res.clearCookie("jwt-netflix"); // Ensure the cookie name matches your app's implementation
        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        console.error("Logout error:", error.message);
        return res.status(500).json({
            success: false,
            message: "An error occurred during logout",
        });
    }
}
export async function authCheck (req,res){
    try {
        console.log("req.user:",req.user);
        
        res.status(200).json({success:true, user:req.user});
    } catch (error) {
       console.log("Error in authCheck controller", error.message);
   res.status(500).json({success: false,message: "An error occurred during login",});
    }
}