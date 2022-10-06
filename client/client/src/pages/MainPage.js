import "../css/mainPage.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import React from "react";

function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
        <Modal.Title className="col-12 text-center py-4"><p>As</p></Modal.Title>
        <Modal.Body>
            <div class="h60"></div>
            <img className="col-4 px-4 py-4" src="img/clientlogimg.png" alt="asdas"/>
            <img className="col-4 px-4 py-4" src="img/jurylogimg.png" alt="asdas"/>
            <img className="col-4 px-4 py-4" src="img/adminlogimg.png" alt="asdas"/>
        </Modal.Body>
        </Modal>
    );
}

function MainPage() {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="justify-content-start" id="basic-navbar-nav">
                    <Nav className="header-navbar">
                        <Nav.Link href="#home">&nbsp;Main&nbsp;</Nav.Link>
                        <Nav.Link href="#link">&nbsp;Seach&nbsp;</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                    <Nav className="header-navbar">
                        <Nav.Link href="#home" onClick={() => setModalShow(true)}>&nbsp;Login&nbsp;</Nav.Link>
                        <Nav.Link className="bord" href="#link">
                            Sing Up
                        </Nav.Link>
                        <MyVerticallyCenteredModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div class="mian-container">
                <img src="img/logo.png" alt="asdas"/>
                <div class="h60"></div>
                <h2>Description and other things. I don’t know what should be there. Just some text without any meaning.</h2>
            </div>
        </>
    );
}

export default MainPage;
