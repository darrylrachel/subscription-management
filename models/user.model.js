import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User name is required'],
    trim: true,
    minLength: 2,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\.\S+/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  }
}, { timesstamps: true });


const User = mongoose.model('User', userSchema);

export default User;