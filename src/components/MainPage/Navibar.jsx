import React, { useContext, useState, useEffect } from 'react';
import { Container, Nav, Navbar, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router'
import { userContext } from '../../contexts/userContext';
import LogInModal from '../auth/LogInModal';
import SignUpModal from '../auth/SignUpModal';
import { BsFillCartFill, BsHeartFill } from "react-icons/bs";
import { pictureContext } from '../../contexts/pictureContext';
import './Navibar.css'
import SearchAdmin from '../search/SearchAdmin';
import phone from '../../image/phoneOnNavbar.svg'
import { BsGoogle } from "react-icons/bs";


const Navibar = () => {
    const { user, logoutUser, setUser, authWithGoogle, logOut } = useContext(userContext);
    const { countOfPictures, countOfPicturesFavorites } = useContext(pictureContext)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showLogin, setShowLogin] = useState(false);
    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);
    let button;
    let privateRoom
    const history = useNavigate()
    function logout() {
        logOut()
        logoutUser();
        history('/')
        localStorage.clear();
    }
    let content

    if (user) {

        if (user.type === 'admin') {
            privateRoom = <Link style={{ textDecoration: 'none', color: 'black' }} to={'/admin/' + user.id}>PRIVATE ROOM</Link>
        } else {

            privateRoom = <>
                <Link style={{ marginRight: '10px' }} to='/cart'> <Badge bg="secondary">{countOfPictures}<BsFillCartFill /></Badge></Link>
                <Link to='/favorites'> <Badge bg="secondary">{countOfPicturesFavorites}<BsHeartFill /></Badge></Link>

            </>
        }
        let struser = JSON.stringify(user);
        localStorage.setItem("user", struser);
        button = (
            <>
                <Navbar.Text>
                    Signed in as: <Badge style={{ marginRight: '10px', textAlign: 'center', color: 'white' }} bg="secondary">{user.username ? user.username : user.displayName}</Badge>
                </Navbar.Text>
                <Button style={{ backgroundColor: '#324873', color: 'white', border: 'none' }} onClick={() => logout()}>
                    LogOut
                </Button>
            </>
        );
    } else {
        button = (
            <>
                <Button
                    className="login"
                    onClick={handleShowLogin}
                >
                    Log In
                </Button>
                <Button
                    className="signup"
                    onClick={handleShow}
                >
                    Sign Up
                </Button>
                <Button color="inherit" variant="text" onClick={authWithGoogle}>
                    <BsGoogle />
                </Button>
            </>
        );
    }

    let struser = JSON.parse(localStorage.getItem("user"));
    function setuser() {
        if (struser) {
            // const user = JSON.parse(struser);
            const user = struser;
            setUser(user);
        }
    }
    useEffect(() => setuser(struser), []);

    return (
        <>
            <div className="pre-navbar">
                <div className="containerpr">
                    <div className="right-side-navbar">
                        <img src={phone} alt="" />
                        <span>+996 557 499 800 | Almazbekov Ibraim</span>
                    </div>
                    <div className="left-side-navbar">
                        <Nav className='ms-auto'>
                        </Nav>
                        {button}
                    </div>
                </div>
            </div>
            <Navbar className='main-navbar' expand="lg">
                <Container>
                    <Link className="main-word" to='/'> <span>YoEXPLORER</span> </Link>
                    <SearchAdmin />
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mx-auto" >
                            <Link style={{ textDecoration: 'none', color: 'black' }} to="/PrivateRoom" className='px-3'>ABOUT</Link>
                            <Link style={{ textDecoration: 'none', color: 'black' }} to="/photos" className='px-3'>PORTFOLIO</Link>
                            <Link style={{ textDecoration: 'none', color: 'black' }} to="/" className='px-3'>TRIPS</Link>
                            {privateRoom}
                            {content}
                        </Nav>

                    </Navbar.Collapse>
                </Container>
                <SignUpModal handleClose={handleClose} show={show} />
                <LogInModal handleCloseLogin={handleCloseLogin} showLogin={showLogin} />
            </Navbar>
        </>
    );
};

export default Navibar;