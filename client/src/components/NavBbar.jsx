import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'
import { NavLink, useNavigate } from 'react-router-dom'
import './NavBbar.css'
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, logout } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify'

export const NavBbar = () => {
  const navigate = useNavigate()

  const activeStyles = {
    color: 'white',
  }
  const unActiveStyles = {
    color: 'black',
  }
  const isAuthUser = useSelector(checkIsAuth)
  const dispatch = useDispatch()

  const logoutHandler = ()=>{
    dispatch(logout())
    window.localStorage.removeItem('token')
    toast('Log out')
  }
  return (
    <div>
      <div className='flex py-4 justify-between items-center' >
      {isAuthUser?<div className='flex py-4 justify-center'>
          <Navbar bg="transparent" expand="lg">
            <Container>
              <Navbar.Brand href="/">Home</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto gap-2">
                  <NavLink className="NavBbar" style={({ isActive }) => isActive ? activeStyles : unActiveStyles} to={'/new'} href="/">New</NavLink>

                  {/* style={({ isActive }) => isActive ? activeStyles : undefined} */}
                  <NavLink className="NavBbar" style={({ isActive }) => isActive ? activeStyles : unActiveStyles} to={'/posts'} href="/">Posts</NavLink>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar> 
        </div>
        :
        undefined}
        
        <div>
          {isAuthUser?<Button variant="secondary" onClick={logoutHandler}>Logout</Button> : <Button variant="secondary" onClick={()=>navigate("/login")}>Login</Button>}
        </div>
      </div>

      
    </div>
  );
}