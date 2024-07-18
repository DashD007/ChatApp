import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from "./routers/user.router.js"
import messageRouter from "./routers/message.router.js";

import {app} from "../socket/socketio.js";

const corsOptions = {
    origin:'http://localhost:1234',
    credentials:true,   
};
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


// routes 
app.use("/api/v1/user",userRouter);
app.use("/api/v1/message",messageRouter);

// server.listen()
// export default app;
