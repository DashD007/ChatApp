import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../utils/userSlice";
import { backendURI } from "../constants";


const Login = () => {
    const [user,setuser] = useState({
        email:"",
        password:"",      
    })
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onSubmitHandler = async(e) => {
        try{
            e.preventDefault();
            // console.log(user)
            const response = await axios.post(`${backendURI}/user/login`,user,{
                headers:{
                    'Content-Type':"application/json"
                },
                withCredentials:true
            });
            // console.log(response);
            toast.success("user logged in")
            setuser({
                email:"",
                password:"", 
            })
            // console.log(response.data)
            dispatch(setAuthUser(response?.data?.data))
            navigate("/")
        }
        catch(error){
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }
    return (
        <div className="flex h-screen items-center justify-center ">
            <div className="mx-auto min-w-96 rounded-md  bg-[#1D232A]  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-80 border border-gray-100">
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-4 p-5"> 
            <h1 className="text-4xl text-center font-bold text-white">Login</h1>
            <div>
                <label htmlFor="email" className="font-medium text-white"><span>Email</span></label><br/>
                <input id="email" type="email" placeholder="Enter your email" className="w-full input input-bordered p-2 h-10" value={user.email} onChange={(e) => {setuser({...user,email:e.target.value})}}/>
            </div>
            <div>
                <label htmlFor="password" className="font-medium text-white"><span>Password</span></label><br/>
                <input id="password" type="password" placeholder="Enter your password" className="w-full input input-bordered p-2 h-10" value={user.password} onChange={(e) => {setuser({...user,password:e.target.value})}}/>
            </div>
            
            <div className="text-center hover:underline text-white">
                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </div>
            <button type="submit" className="btn font-bold">Login</button>
        </form>
    </div>
        </div>
    )
    
}

export default Login;
