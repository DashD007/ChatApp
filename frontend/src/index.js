import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import SignUp from "./components/SignUp.jsx";
import ErrorPage from "./components/ErrorPage.jsx"
import Login from "./components/Login.jsx";
import {Toaster} from "react-hot-toast"
import {Provider, useSelector, useDispatch} from "react-redux";
import appStore from "./utils/appStore.js";
import { useEffect, useState } from "react";
import io from "socket.io-client"
import { setSocket } from "./utils/socketSlice.js";
import { setOnlineUsers } from "./utils/userSlice.js";
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from "redux-persist";

const appRouter = createBrowserRouter([
    {
        path:"/",
        element:<HomePage/>,
        errorElement:<ErrorPage/>
    },
    {
        path:"/signup",
        element:<SignUp/>
    },
    {
        path:"/login",
        element:<Login/>
    }
])

function App(){
    const dispatch = useDispatch();
    const {authUser} = useSelector((store) => store.user);
    const {socket} = useSelector((store) => store.socket)
    useEffect(()=>{
        if(authUser){
            const socket = io('https://chat-app-backend-delta-ochre.vercel.app',{
                query:{
                    userId:authUser?._id
                }
            })
            dispatch(setSocket(socket));

            socket.on('getOnlineUsers',(onlineUsers) => {
                dispatch(setOnlineUsers(onlineUsers))
            })
            return () => socket.close()
        }
        else{
            if(socket) {
                socket.close();
                dispatch(setSocket(null));
            }
        }
    },[authUser])

    return (
    <div>    
        <Toaster/>
        <RouterProvider router={appRouter} />
    </div>)
}


let persistor = persistStore(appStore)
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<Provider store={appStore}><PersistGate loading={null} persistor={persistor}><App/></PersistGate>
</Provider>)

