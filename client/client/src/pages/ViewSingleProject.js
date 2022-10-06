import "../css/index.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from "react";
import Button from "react-bootstrap/esm/Button";

function ViewSingleProject(){
    return (
        <>
            <div class='row conteiner'>
                <div className="col-9">
                    <Navbar bg="light" expand="lg">
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse className="justify-content-start" id="basic-navbar-nav">
                        <Nav className="header-navbar">
                            <Nav.Link href="#home">&nbsp;Main&nbsp;</Nav.Link>
                            <Nav.Link href="#link">&nbsp;Seach&nbsp;</Nav.Link>
                        </Nav>
                        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                            <Nav className="header-navbar">
                                <Nav.Link href="#link">Juri</Nav.Link>
                            </Nav>
                            </Navbar.Collapse>
                        </Navbar.Collapse>
                    </Navbar>
                    <Container>
                        <h1>Name</h1>
                        <h6>Date:24.09.22&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tag: 2565</h6>
                        <br/>
                        <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </h5>
                        <br/>
                        <br/>
                        <br/>
                        <button>docunet.dox</button>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Оценка за креативность"></input>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Оценак за вариативность"></input>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Оценак за мяу муя муя"></input>
                        <Button variant="lite" className='nextbtn' type="submit">
                            <img className='nextImg' src='img/next.png'/>
                        </Button>
                    </Container>
                </div>
                <div className="col-2 right">
                <div className='right'>
                    <a href='#'><img src='img/qession.png' className='qessionBtn'/></a>
                </div>
                </div>
            </div>
        </>
    )
}

export default ViewSingleProject

