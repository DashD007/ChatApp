import React from 'react'
import { IoMdSend } from "react-icons/io";
import { useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import { setMessage } from '../utils/messageSlice';
import { backendURI } from '../constants';

const SendMessage = () => {
    const [message,setmessage] = useState("");
    const { selectedUser } = useSelector((store) => store.user);
    const {messages} = useSelector((store) => store.message);
    const dispatch = useDispatch();
    const messageSender = async(e) => {
        try {
            e.preventDefault();
            axios.defaults.withCredentials = true ;
            const response = await axios.post(`${backendURI}/message/send/${selectedUser?._id}`,{message},{
                headers:{
                    'Content-Type':"application/json"
                },
                withCredentials:true
            });
            // console.log(response)
            dispatch(setMessage([...messages,response?.data?.data]))
            setmessage("");
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='w-[100%] h-16 rounded-md'>
        <form onSubmit={messageSender} >
            <div className='w-full relative'>
                <input type="text" value={message} onChange={(e) => setmessage(e.target.value)} placeholder='Type a message' className="border bg-zinc-700 border-zinc-500 text-white text-md block w-full p-4 rounded-lg"/>
                {message?.length ? 
                <button type="submit" className='absolute flex items-center inset-y-0 end-0 px-4 text-lg text-white' ><IoMdSend /></button> 
                : null}
            </div>
        </form>
    </div>
  )
}

export default SendMessage;