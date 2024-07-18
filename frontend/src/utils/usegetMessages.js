import axios from 'axios'
import { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { setMessage } from './messageSlice'
import { backendURI } from '../constants'
const usegetMessages = () => {
    const {selectedUser} = useSelector((store) => store.user);
    const dispatch = useDispatch();
    useEffect(() => {
        const getMessages = async() => {
            try {
                axios.defaults.withCredentials = true;
                const response = await axios.get(`${backendURI}/message/${selectedUser?._id}`);
                // console.log(response);
                dispatch(setMessage(response?.data?.data?.messages || []));
            } catch (error) {
                console.log(error);
            }
        }
        getMessages();
    },[selectedUser])
}

export default usegetMessages;