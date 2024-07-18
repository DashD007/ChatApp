import jwt from "jsonwebtoken";

import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import {User} from "../models/user.model.js";

const verifyJWT = asyncHandler(async(req,res,next) => {

    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("bearer ","");

    if(!token){
        throw new apiError(400,"access token is missing");
    }

    try{
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY);
        const user = await User.findById(decodedToken?._id);
        if(!user){
            throw new apiError(404,"No user exist");
        }

        req.user = user;
        next();
    }
    catch(error){
        throw new apiError(500,error?.message);
    }
})

export default verifyJWT;
