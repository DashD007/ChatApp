import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import {User} from "../models/user.model.js"
import uploadOnCloudinary from "../utils/cloudinary.js"
import {httpOption} from "../constants.js";

const generateAccessTokenAndRefreshToken = async(userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({validationBeforeSave:false});
        return {accessToken,refreshToken};
    } catch (error) {
        throw new apiError(500,error?.message || "something went wrong in server while generating tokens");
    }
};

const registerUser = asyncHandler(async(req,res) => {
    // console.log(req)
    const {username,email,password,gender} = req.body;
    const avatarLocalPath = req?.file?.path;
    if([username,email,password,gender].some((field) => field?.trim() === "")){
        throw new apiError(400,"all field are required");
    }

    const user = await User.findOne({
        $or:[{username},{email}]
    })

    if(user){
        throw new apiError(400,"username or email already exist");
    }
    let avatar;
    if(avatarLocalPath){
        const avatarInstance = await uploadOnCloudinary(avatarLocalPath);
        
        avatar = avatarInstance?.url;
        // throw new apiError(400,"avatar file is missing");
        if(!avatar){
            throw new apiError(500,"Something went wrong while uploading avatar");
        }
    }
    else{
        avatar = gender === "male" ? `https://avatar.iran.liara.run/public/boy?username=${username}` : `https://avatar.iran.liara.run/public/girl?username=${username}`;
    }
    
    

    const userInDB = await User.create({
        username: username?.toLowerCase(),
        email,
        password,
        avatar,
        gender
    })

    const registeredUser = await User.findById(userInDB?._id).select("-password -refreshToken");
    if(!registeredUser){
        throw new apiError(500,"Something went wrong while creating user");
    }

    return res.status(200).json(new apiResponse(201,registeredUser,"Successfully created user"))
})


const loginUser = asyncHandler(async(req,res) => {
    const {username, email, password} = req.body;
    if(!(username || email)){
        throw new apiError(400,"username or email is required");
    }
    if(!password){
        throw new apiError(400,"password is missing");
    }
    // console.log(password);
    const user = await User.findOne({
        $or:[{username},{email}]
    });
    if(!user){
        throw new apiError(404,"user not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if(!isPasswordValid){
        throw new apiError(400,"password is incorrect");
    }

    const {accessToken, refreshToken} = await generateAccessTokenAndRefreshToken(user?._id);

    const loggedInUser = await User.findById(user?._id).select("-password -refreshToken");
    return res.status(200)
    .cookie("accessToken",accessToken,httpOption)
    .cookie("refreshToken",refreshToken,httpOption)
    .json(new apiResponse(201,loggedInUser,"successfully loggedIn user"))
})

const logoutUser = asyncHandler(async(req,res) => {
    const user = await User.findById(req.user?._id);
    if(!user){
        throw new apiError(404,"user doesnot exist");
    }
    try {
        await User.findByIdAndUpdate(user?._id,{refreshToken:undefined},{new:true});
        return res.status(200)
        .clearCookie("accessToken",httpOption)
        .clearCookie("refreshToken",httpOption)
        .json(new apiResponse(201,{},"User logged out successfully"))
    } catch (error) {
        throw new apiError(500,"Something went wrong while logouting user")
    }
})


const getOtherUsers = asyncHandler(async(req,res) => {
    const users = await User.find({ _id: { $ne: req.user?._id } }).select("-password -refreshToken");
    if(!users){
        throw new apiError(500,"Something went wrong while getting other user")
    }

    return res.status(200).json(new apiResponse(200,users,"successfully fetched all loggedin user"))
})
export {registerUser, loginUser,logoutUser,getOtherUsers};