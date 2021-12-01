import React, { useContext, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { userContext } from "../../contexts/userContext";

const LogInModal = (props) => {
    const { loginUser } = useContext(userContext);
    const [user, setUser] = useState({ username: "", password: "" });
    function handleChange(e) {
        let userr = { ...user, [e.target.name]: e.target.value };
        setUser(userr);
    }

    function handleLogIn(e) {
        e.preventDefault();
        loginUser(user.username, user.password);
        props.handleCloseLogin();
    }

    return (
        <>
            <Modal
                show={props.showLogin}
                onHide={props.handleCloseLogin}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Welcome back!</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#D0D0D0' }}>
                    <Form onSubmit={handleLogIn}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                onChange={handleChange}
                                name="username"
                                type="text"
                                placeholder="Enter your name"
                            />
                            <Form.Text className="text-muted">
                                We'll never share your user name with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                onChange={handleChange}
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                            />
                        </Form.Group>

                        <Button style={{ border: 'none', backgroundColor: '#7787A6' }} type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default LogInModal;