const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
//@desc Register a User 
//route POST /api/users/register
//@access Public 

const registerUser = asyncHandler(async (req, res)=>{
    const {username, email, password} = req.body;
    if(!username || !email | !password){
         res.status(400);
         throw new Error("All fields are mandatory");
    }

    const userAvailable = await User.findOne({email});
    if(userAvailable)
    {
        res.status(400);
        throw new Error("User Already Registered");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Hashed password: ", hashedPassword);

    const registerUser = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    console.log(`The new user created ${registerUser}`);
    if(registerUser){
      res.status(201).json({_id: registerUser.id, email: registerUser.email})
    }else
    {
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.json({message: "Register the user"});
});


//@desc login a User 
//route POST /api/users/login
//@access Public 
const loginUser = asyncHandler(async (req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
         res.status(400);
         throw new Error("All fields are mandatory");
    }
    console.log("About to get user details:");
    const userDetail = await User.findOne({email});
    console.log("The user details are:", userDetail);
    if(userDetail && (await bcrypt.compare(password, userDetail.password)))
    {
        const accessToken = jwt.sign(
        {
            user:{
                username: userDetail.username,
                email: userDetail.email,
                id: userDetail._id,
            }
        }, process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"});
       res.status(200).json({accessToken});
    }else{
        res.status(400);
        throw new Error("email and password is invalid");
    }

});

//@desc get current User information 
//route GET /api/users/current
//@access Private 

const currentUser = asyncHandler(async (req, res)=>{
    res.json(req.user);
    //res.json({message: "current user details"});
});

module.exports = { registerUser,loginUser,currentUser};