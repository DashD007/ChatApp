import dotenv from "dotenv";
import connectDB from "./src/database/db.js";
import {app,server} from "./socket/socketio.js";

dotenv.config({
    path:"./.env"
})


import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from "./src/routers/user.router.js"
import messageRouter from "./src/routers/message.router.js";

// import {app} from "../socket/socketio.js";

const corsOptions = {
    origin:["https://chat-app-frontend-six-opal.vercel.app"],
    methods : ["GET","POST","PATCH"],
    credentials:true   
};
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


// routes 
app.use("/api/v1/user",userRouter);
app.use("/api/v1/message",messageRouter);




server.listen(process.env.PORT || 3000, ()=>{
    connectDB();
    console.log(`server is running on port ${process.env.PORT}`)
})
// .then(() => {app.listen(process.env.PORT || 3000),console.log("Server is running on port ",process.env.PORT)})
// .catch((error) => console.log("Error",error))

