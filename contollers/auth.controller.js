import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.model.js';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js';

export const signUp = async (req, res, next) => {
  // Implement sign up logic
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Logic to create a new user
    const { name, email, password } = req.body;

    // Check if a user already exists
    const existingUser = await UserActivation.findOne( {email} );

    if(existingUser) {
      const error = new Error('User already exists');
      error.statusCode = 409;
      throw error;
    }

    // Hash Paswword
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hash(password, salt);
    
    const newUsers = await User.create([{ name, email, password: hashedPassword }], { session });

    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })



    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        token,
        user: newUsers[0]
      }
    })

  } catch (error) {
    await session.abortTransaction()
    session.endSession();
    next(error);
  }

}

export const signIn = async (req, res, next) => {
  // Implement sign in logic
  
}

export const signOut = async (req, res, next) => {
  // Implement sign out logic
  
}