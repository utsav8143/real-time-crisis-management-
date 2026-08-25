import React from 'react'
import {useState, useEffect, createContext, useContext} from 'react'
import {io} from 'socket.io-client'
import { useAuth } from './AuthContext';

const SocketContext=createContext(null);

const SOCKET_URL=import.meta.env.VITE_API_URL || "http://localhost:5000"

export function SocketProvider({children}){
  const [socket, setSocket] = useState(null);
  const {user}=useAuth();

  useEffect(()=>{
    if(!user) return;

    const newSocket= io(SOCKET_URL, {
      auth:{
        token:localStorage.getItem("token") 
      }
    });

    newSocket.on("connect",()=>{
      newSocket.emit("joinDashboard");
    });

    setSocket(newSocket);

    // Clean up connection when user logs out
    return()=> newSocket.disconnect();
  },[user]) 

  return(
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket(){
  return useContext(SocketContext);
}
