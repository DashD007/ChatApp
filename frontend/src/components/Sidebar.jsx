import React from 'react'
import { BsSearch } from "react-icons/bs";
import OtherUsersList from './OtherUsersList.jsx';
import axios from "axios"
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthUser,setOtherUsers, setSelectedUser,setOnlineUsers} from '../utils/userSlice.js';
import { backendURI } from '../constants.js';
const Sidebar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logoutHandler = async() => {
        try{
            axios.defaults.withCredentials=true;
            const response = await axios.patch(`${backendURI}/user/logout`,{
                headers:{
                    'Content-Type':"application/json"
                },
                withCredentials:true
            });
            console.log(response)
            if(response.data.success === true){
                toast.success("user logged out successfully");
                dispatch(setAuthUser(null));
                dispatch(setOtherUsers(null));
                dispatch(setSelectedUser(null));
                dispatch(setOnlineUsers(null));
                navigate("/login")
            }
        }
        catch(error){
            // console.log(error)
            toast.error(error?.response?.data?.message || "Something went wrong while logging out user")
        }
    }
  return (
    <div className='h-[100%] w-[30%] p-3 rounded-md flex flex-col gap-2 '>
        <div className=' h-[10%]' >
            <form className='flex gap-2 justify-center items-center'>
                <input className="rounded-full w-[80%] input" type="text" placeholder='Search'/>
                <button type="submit" className="rounded-full bg-white flex justify-center items-center btn"><BsSearch /></button>
            </form>
            <div className='divider'></div>
        </div>
        <div className='overflow-auto flex-1 mt-4'>
            <OtherUsersList/>
        </div>
        <div className='flex'>
            <button className='btn btn-sm' onClick={logoutHandler}>logout</button>
        </div>
    </div>
  )
}

export default Sidebar