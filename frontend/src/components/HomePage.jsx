import React, { useEffect } from 'react'
import Sidebar from './Sidebar.jsx'
import MessagePanel from './MessagePanel.jsx'
import { useDispatch, useSelector  } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSelectedUser,setOtherUsers} from '../utils/userSlice.js'



const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {authUser} = useSelector((store) => store.user)
  useEffect(()=>{
    if (!authUser) {
      dispatch(setSelectedUser(null));
      dispatch(setOtherUsers(null));
      navigate("/login");
    }
  },[])
  

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='flex mx-auto h-[90%] sm:min-w-[550px] md:min-w-[850px] rounded-md bg-[#42474F] bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-90 border border-gray-100'>
        <Sidebar/>
        <div className="divider divider-horizontal m-0"></div>
        <MessagePanel/>
      </div>
    </div>
  )
}

export default HomePage