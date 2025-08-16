import { router,publicProcedure } from "../trpc.js";
import { z } from "zod";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from "../models/UserModel.js";

// Input validation schema
const signupInput = z.object({
    email: z.string(),
    password: z.string().min(6),
    name: z.string()
});
const signinInput = z.object({
    email: z.string(),
    password: z.string().min(6),
});

export const UserRouter=router({
    signup: publicProcedure
        .input(signupInput)
        .mutation(async (opts) => {
            try {
                const { email, password, name } = opts.input;

                // Check if user already exists
                const existingUser = await User.findOne({ email: email.toLowerCase() });
                if (existingUser) {
                    throw new Error("User with this email already exists");
                }

                // Hash the password
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(password, saltRounds);

                // Create new user
                const user = new User({
                    email: email.toLowerCase(),
                    password: hashedPassword,
                    name: name.trim()
                })
                await user.save();

                // Generate JWT token
                const token = jwt.sign(
                    { 
                        userId: user._id,
                        email: user.email 
                    },
                    'SECRET'
                );

                return {
                    success: true,
                    message: "User created successfully",
                    token,
                    user: {
                        id: user._id,
                        email: user.email,
                        name: user.name,
                        
                    }
                };
            } catch (error) {
                throw new Error( "Failed to create user");
            }
        }),
    signin: publicProcedure
        .input(signinInput)
        .mutation(async (opts) => {
            try {
                const { email, password } = opts.input;

                // Find user by email
                const user = await User.findOne({ email: email.toLowerCase() });
                if (!user) {
                    throw new Error("Invalid email or password");
                }

                // Compare password
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    throw new Error("Invalid email or password");
                }

                // Generate JWT token
                const token = jwt.sign(
                    { 
                        userId: user._id,
                        email: user.email 
                    },
                    'SECRET',
                    { expiresIn: '7d' }
                );

                return {
                    success: true,
                    message: "Signin successful",
                    token,
                    user: {
                        id: user._id,
                        email: user.email,
                        name: user.name,
                       
                    }
                };
            } catch (error) {
                throw new Error("Signin failed");
            }
        })

})