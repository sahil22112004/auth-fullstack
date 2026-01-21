'use client'

import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

export default function dashboard(){
    const currentuser = useSelector((state:RootState)=>state.auth.currentUser)
    console.log("curr",currentuser)
    return (
        <>
        <h1>Welcome  {currentuser?.email} your role is {currentuser?.role} </h1>
        </>
    )
}