import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        lowercase:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        required:true,        
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"]
    },
    refreshToken:{
        type:String
    }
},{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
});

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password);
};

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id:this._id,
        name:this.name,
        email:this.email
    },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY,
    }
)}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id:this._id,
    },
    process.env.REFRESH_TOKEN_SECRET_KEY,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY,
    })
}

export const User = mongoose.model("User",userSchema);

