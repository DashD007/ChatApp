import React, {useEffect, useRef} from 'react'
import { useSelector} from 'react-redux'

const Message = ({message}) => {
    const {selectedUser,authUser} = useSelector((store) => store.user);
    const scroll = useRef();
    useEffect(()=>{
        scroll.current.scrollIntoView({behavior:"smooth"})
    },[message])
  return (
    <div ref={scroll} className={`chat ${message?.owner == selectedUser?._id ? "chat-start" : "chat-end"}`}>
        <div className="chat-image avatar">
            <div className="w-10 rounded-full">
                <img alt="user-profile" src={message?.owner == selectedUser?._id ? selectedUser?.avatar : authUser?.avatar} />
            </div>
        </div>
        <div className="chat-header">
            <time className="text-xs opacity-50 text-white">{message?.createdAt.slice(message?.createdAt.indexOf("T")+1 ,message?.createdAt.indexOf("T") + 6) }</time>
        </div>
        <div className="chat-bubble">{message?.content}</div>
    </div>)
}

export default Message