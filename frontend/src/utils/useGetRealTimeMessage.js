import { useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import {addMessage} from "../utils/messageSlice.js";
const useGetRealTimeMessage = () => {
    const {socket} = useSelector((store) => store.socket);
    const dispatch = useDispatch();
    const {selectedUser} = useSelector((store) => store.user);

    useEffect(() => {socket?.on("newMessage",(message) => {
        if(String(selectedUser._id) === String(message.owner)){
            console.log("message added")
            dispatch(addMessage(message));
        }
    })},[selectedUser,socket,addMessage])
}

export default useGetRealTimeMessage;
