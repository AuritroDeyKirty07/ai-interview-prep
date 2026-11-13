const userModel = require ("../models/user.model.js")
const bcrypt = require("bcryptjs")
const jwt = require ("jsonwebtoken")
const tokenBlackListModel = require ("../models/blacklist.model.js")
const authUser = require ('../middleware/auth.middleware.js')


const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000,
};


/**
* @name registerUserController
* @route POST /api/auth/register
* @description Register a new user
* @access Public
*/

async function registerUserController(req,res) {
    const {username, email, password} = req.body

    if(!username || !email || !password){
        return res.status(400).json({
            message:"Please provide username, email and password"
        })
    }

    const isUserAlreadyExists =await userModel.findOne({
        $or: [{username},{email}]
    })

    if(isUserAlreadyExists){
        return res.status(400).json({
            message: "Account already with this email address or username"
        })
    }

    const hash=await bcrypt.hash(password, 10)
    
    const user =await userModel.create({
        username,
        email,
        password:hash,
    })

    const token = jwt.sign(
        {id:user._id, username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie("token", token, cookieOptions)
    res.status(201).json({
        message:"user registered succesfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

/**
 * @name loginUserController
 * @description Login a user, expects email and password
 * @access Public
 */

async function loginUserController(req, res) {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // Important: use cookieOptions here too
        res.cookie("token", token, cookieOptions);

        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Login Error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


async function logoutUserController(req,res){
    const token= req.cookies.token

    if(token){
        await tokenBlackListModel.create({token})
    }
    res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
});
    res.status(200).json({message: "User logged out successfully"})
}



/**
 * @name GetMeController
 * @description Get the current logged in user details
 * @access Private
 */

async function getMeController(req,res){
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message:"User details fetched successfully",
        user:{
            id:user._id,
            username: user.username,
            email:user.email
        }
    })
}





module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}