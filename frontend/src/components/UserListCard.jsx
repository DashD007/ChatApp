import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../utils/userSlice';

const UserListCard = ({user}) => {
    const dispatch = useDispatch();
    const {onlineUsers} = useSelector((store) => store.user);
    const isOnline = onlineUsers && onlineUsers.includes(user?._id);
    const {selectedUser} = useSelector((store) => store.user);
    const selectUserHandler = async() => {
        dispatch(setSelectedUser(user));
    }

  return (
    <div className='w-[100%]' onClick={selectUserHandler}>
        <div className={` flex gap-3 items-center text-white hover:bg-zinc-700  cursor-pointer px-4 py-2 rounded-md ${selectedUser?._id == user?._id ? 'bg-zinc-700' : ''}`}>
            <div className={`avatar w-12 h-12 ${isOnline ? 'online' :' '}`}>
                <img src={user?.avatar} alt="user-profile" className='rounded-full w-12 h-12'/>
            </div>
            <div className='text-lg'>
                <p>{user?.username}</p>
            </div>
        </div>
        <div className='divider m-0'></div>
    </div>
  )
}

export default UserListCard

