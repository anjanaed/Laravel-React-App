import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'
import { useStateContext } from '../contexts/contextprovider'

const GuestLayout = () => {
    const {token}=useStateContext();
    if(token){
      return <Navigate to='/'/>
    }
  return (
    <div>
        <div></div>
        <Outlet/>
        </div>
  )
}

export default GuestLayout