import asyncHandler from "../utils/asyncHandler.js";
import {Conversation} from "../models/conversation.model.js"
import {Message} from "../models/message.model.js"
import apiResponse from "../utils/apiResponse.js";
import apiError from "../utils/apiError.js";
import {getReceiverSocketId} from "../../socket/socketio.js"
import {io} from "../../socket/socketio.js"
const sendMessage = asyncHandler(async(req,res) => {
    const {receiverId} = req.params;
    const {message} = req.body;

    let gotConversation = await Conversation.findOne({
        participants:{
            $all: [req.user?._id,receiverId]
        }
    })

    if(!gotConversation){
        gotConversation = await Conversation.create({
            participants:[
                receiverId,
                req.user?._id
            ]
        })
    }
    const newMessage = await Message.create({
        owner:req.user?._id,
        sentTo: receiverId,
        content:message
    })
    if(newMessage){
        gotConversation.messages.push(newMessage?._id);
    }
    // Socket io
    await Promise.all([gotConversation.save({validationBeforeSave:false}), newMessage.save({validationBeforeSave:false})])
    const receiverSocketId = getReceiverSocketId(receiverId);
    if(receiverSocketId){
        io.to(receiverSocketId).emit("newMessage",newMessage);
    }

    res.status(201).json(new apiResponse(200,newMessage,"Message sent successfully"))
})


const getMessage = asyncHandler(async(req,res) => {
    try {
        const {receiverId} = req.params;
        const conversation = await Conversation.findOne({
            participants:{
                $all: [req.user?._id,receiverId]
            }
        }).populate("messages");
        return res.status(200).json(new apiResponse(201,conversation,"successfully fetched conversation"));
    } catch (error) {
        throw new apiError(400,error.message || "something went wrong while getting messages")
    }

});

export {sendMessage, getMessage};