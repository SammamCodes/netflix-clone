import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, 
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6, 
    },
    image: {
        type: String,
        default: "",
    },
    searchHistory: {
        type: [
            {
                id: Number,
                image: String,
                title: String,
                searchType: String,
                createdAt: Date,
            },
        ],
        default: [],
    },
});

export const User = mongoose.model('User', userSchema);
