import React from 'react'
import usegetMessages from "../utils/usegetMessages.js";
import { useSelector } from 'react-redux';
import Message from './Message.jsx';
import useGetRealTimeMessage from '../utils/useGetRealTimeMessage.js';
const MessageContainer = () => {
    usegetMessages();
    useGetRealTimeMessage();
    const {messages} = useSelector((store) => store.message);

    return (
        <div className="overflow-auto px-4" >
            {messages && messages?.map((message) => <Message key={message?._id} message={message}/>)}
        </div>
    )
} 

export default MessageContainer