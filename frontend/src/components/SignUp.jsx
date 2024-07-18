import { useRef, useState } from "react";
import {toast} from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { backendURI } from "../constants";
const SignUp = () => {
    const ConfirmPassword = useRef(null);
    const [user,setuser] = useState({
        username:"",
        email:"",
        password:"",
        gender:""
    })

    const navigate = useNavigate();
    const handleCheckBox = (gender) => {
        setuser({...user,gender:gender})
    }
    const onSubmitHandler = async(e) => {
        try{
            e.preventDefault();
            // console.log(user)
            // console.log(ConfirmPassword.current.value)
            if(ConfirmPassword.current.value != user.password){
                toast.error("password don't match")
                return null;
            }
            const response = await axios.post(`${backendURI}/user/register`,user,{
                headers:{
                    'Content-Type':"application/json"
                },
                withCredentials:true
            });
            // console.log(response);
            toast.success("user registered successfully");
            setuser({
                username:"",
                email:"",
                password:"",
                gender:""
            })
            navigate("/login")
        }
        catch(error){
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }
    return (
        <div className="flex h-screen items-center justify-center ">
        <div className="mx-auto min-w-96 rounded-md  bg-[#1D232A]  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-80 border border-gray-100">
        <form className="flex flex-col gap-4 p-5" onSubmit={onSubmitHandler}> 
            <h1 className="text-4xl text-center font-bold text-white">Sign Up</h1>
            <div>
                <label htmlFor="username" className="font-medium text-white"><span>Username</span></label><br/>
                <input id="username" className="w-full input input-bordered p-2 h-10" type="text" onChange={(e) =>{setuser({...user,username:e.target.value})}} value={user.username} placeholder="Enter your username"/>
            </div>
            <div>
                <label htmlFor="email" className="font-medium text-white"><span>Email</span></label><br/>
                <input id="email" type="email" placeholder="Enter your email" className="w-full input input-bordered p-2 h-10" onChange={(e) =>{setuser({...user,email:e.target.value})}}/>
            </div>
            <div>
                <label htmlFor="password" className="font-medium text-white"><span>Password</span></label><br/>
                <input id="password" type="password" placeholder="Enter your password" className="w-full input input-bordered p-2 h-10" onChange={(e) => {setuser({...user,password:e.target.value})}}/>
            </div>
            <div>
                <label htmlFor="cpassword" className="font-medium text-white"><span>Confirm Password</span></label>
                <input id="cpassword" ref={ConfirmPassword} type="password" placeholder="Confirm your password" className="w-full input input-bordered p-2 h-10"/>
            </div>
            <div className="flex gap-4">
                <div className="flex gap-3">
                    <label htmlFor="male" className="font-medium text-white"><span>Male</span></label>
                    <input id="male" 
                    type="checkbox" 
                    defaultChecked
                    checked={user.gender === "male"}
                    onChange={()=>handleCheckBox("male")}
                    className="checkbox bg-slate-50"/>
                </div>
                <div className="flex gap-3">
                    <label htmlFor="female" className="font-medium text-white"><span>Female</span></label>
                    <input id="female" 
                    type="checkbox"
                    checked={user.gender === "female"}
                    onChange={()=>handleCheckBox("female")}
                    className="checkbox bg-slate-50" />
                </div>
            </div>
            <div className="text-center hover:underline text-white">
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
            <button className="btn btn-block border border-slate-400 font-bold">Sign In</button>
        </form>
    </div>
        </div>
    )
    
}

export default SignUp;
