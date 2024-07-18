import React from 'react'
import { useSelector } from 'react-redux';
import MessageContainer from "./MessageContainer.jsx";
import SendMessage from './SendMessage.jsx';

const MessagePanel = () => {
  const {selectedUser, authUser} = useSelector((store) => store.user)
  return selectedUser ? (
    <div className='w-[100%] m-0 rounded-r-md h-[100%] flex flex-col'>
        <div className='flex gap-4 items-center h-16 bg-zinc-700 w-[100%] text-white px-4 rounded-md'>
            <img src={selectedUser?.avatar} alt="user-profile" className='rounded-full w-12 h-12 object-center'/>
            <p className="text-xl">{selectedUser?.username}</p>
        </div>
        <div className="flex-1 overflow-auto">
          <MessageContainer/>
        </div>
        <div className='py-2'>
          <SendMessage/>
        </div>
    </div>
  ) : (<div className='w-[100%] m-0 rounded-r-md h-[100%] text-white flex flex-col gap-1 items-center justify-center text-2xl font-bold'> <span className="text-3xl">Hi, {authUser?.username} </span><br/> Let's start conversation</div>)
}

export default MessagePanel