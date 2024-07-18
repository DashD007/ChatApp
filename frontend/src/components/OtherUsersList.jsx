import React from 'react'
import UserListCard from './UserListCard.jsx'
import useGetUsers from '../utils/useGetUsers.js'
import { useSelector } from 'react-redux'
const OtherUsersList = () => {
    useGetUsers();
    const {otherUsers} = useSelector((store) => store.user)
  return (
    <div className='w-[100%]'>
        {otherUsers?.map((user) => <UserListCard key={user?._id} user={user} />)}
    </div>
  )
}

export default OtherUsersList