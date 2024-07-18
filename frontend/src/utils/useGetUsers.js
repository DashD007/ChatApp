import axios from "axios"
import { useEffect,} from "react";
import {useDispatch} from "react-redux";
import { setOtherUsers } from "./userSlice";
import {backendURI} from "../constants.js"
import toast from "react-hot-toast";
const useGetUsers = () => {
    const dispatch = useDispatch();
    useEffect(()=> {
        const fetchData = async () => {
            try {
                axios.defaults.withCredentials = true;
                const response = await axios.get(`${backendURI}/user/others`);
                dispatch(setOtherUsers(response?.data?.data))
            } catch (error) {
                toast.error(error?.response?.data?.message || "Something went wrong while fetching other users");
            }
        }
        fetchData();
    },[])
}

export default useGetUsers;