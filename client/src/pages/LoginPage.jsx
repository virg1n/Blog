import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import './Login.css';
import { loginUser } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify'
import { checkIsAuth } from '../redux/features/auth/authSlice';

export const LoginPage = () => {
  const [email, setUserEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const {status} = useSelector((state)=> state.auth)
  const isAuthUser = useSelector(checkIsAuth)
  const navigate = useNavigate()

  useEffect(()=>{
    if (status){
      toast(status)
    }
    if(isAuthUser){
      navigate('/')
      
    }
  },[status, isAuthUser, navigate])

  const handleSubmit = () =>{
    try {
      dispatch(loginUser({email,password}))
      setUserEmail('')
      setPassword('')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="mainLogin" >
      <div className='contentLogin'>
        <form action="#" className='form-input'>
          <h1 style={{display:'flex',justifyContent:"center",alignItems:"center"}}>Sign in</h1>
          <div className='form-input'>
            <input type="email" placeholder='Email'
            value={email}
            onChange={(e)=>setUserEmail(e.target.value)}
            />
          </div>
          <div className='form-input'>
            <input type="password" placeholder='Password' 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <div className='form-submit'>
            <button onClick={handleSubmit}> Log in </button>
          </div>
          <Link to="/register">Sign in if you have not an account</Link>
        </form>
      </div>
    </div>
  )
}
