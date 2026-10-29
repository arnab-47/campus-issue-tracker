const brcypt = require('bcrypt');
const User = require('../models/User');

//POST /api/auth/register

async function register(req, res) {
    try{
        const {fullname,username,email,password,role} = req.body;

        if(!fullname || !username || !email || !password || !role){
            return res.status(400).json({message: "please fill in every field."});
    }

    const existing = await User.findOne({$or: [{username}, {email}]});
    if(existing){
        return res.status(409).json({message: "username or email already exists."});
    }
    //that is before the password reached to the Mongoose -- will hashed it
    //bcrypt.hash()
    const hashedPassword = await brcypt.hash(password, 10);

    const user = await User.create({
        fullname,
        username,
        email,
        password: hashedPassword,
        role : role === "admin" ? "admin" : "student"
    });

    res.status(201).json({id : user._id, username: user.username, role: user.role});
} catch (err) {
    res.status(400).json({message: err.message});
}
    
}

async function login(req, res) {
    try{
        const {username, password} = req.body;

        if(!username || !password){
            return res.status(400).json({message: "please fill in every field."});
        }

        const user = await User.findOne({username: username.toLowerCase()});

        if(!user){
            return res.status(409).json({message: "username does not exist."});
        }

        const passwordMatch = await brcypt.compare(password, user.password);
        if(!passwordMatch){
            return res.status(409).json({message: "invalid password."});
        }
        res.status(200).json({id : user._id, username: user.username, role: user.role});

    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

module.exports = { register, login};