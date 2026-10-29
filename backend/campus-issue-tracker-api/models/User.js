const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        fullname:{
            type: String,
            required: true,
            trim: true,
        },
        username:{
            type: String,
            required: true, 
            trim: true,
            unique: true,
            lowercase: true,
        },
        email:{
            type: String,
            required: true, 
            trim: true,
            unique: true,
            lowercase: true,
        },
        password:{
            type: String,   
            required: true,
        },
        role:{
            type: String,
            enum: ["student", "admin"],
            default: "student",
        }
    },
    {timestamps: true,}
)

module.exports = mongoose.model("User", userSchema);