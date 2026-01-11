const bcrypt = require('bcrypt');
const UserModel = require('../Models/User');
const jwt = require('jsonwebtoken'); 

const signup = async (req, res) => {
    try{
        const {fullname, email, password, confirmpassword} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(409).json({message: "User already exists", success:false});
        }
        const userModel = new UserModel({ fullname, email, password, confirmpassword });
        userModel.password = await bcrypt.hash(password, 10);
        userModel.confirmpassword = await bcrypt.hash(confirmpassword, 10);
        await userModel.save();
        res.status(201).json({message: "User registered successfully", success:true});
    }
    catch(err){
        res.status(500).json({message: "Internal Server Error", success:false});
    }
};

const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await UserModel.findOne({email});
        const errMsg = "Authentication Failed";
        if(!user){
            return res.status(403).json({message: errMsg, success:false});
        }
        const isPassCorrect = await bcrypt.compare(password, user.password);
        if(!isPassCorrect){
            return res.status(403).json({message: errMsg, success:false});
        }
        const jwtToken = jwt.sign(
            {email:user.email,_id:user.id},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        )

        res.status(200).json({
            message: "User Logged In successfully",
            success:true,
            token:jwtToken,
            email,
            username:user.fullname
        });
    }
    catch(err){
        res.status(500).json({message: "Internal Server Error", success:false});
    }
};

module.exports = {
    signup,
    login
};