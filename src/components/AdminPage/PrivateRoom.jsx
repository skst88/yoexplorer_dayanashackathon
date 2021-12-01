import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { userContext } from '../../contexts/userContext';
import { commentsContext } from '../../contexts/commentsContext'
import { Button, Form, Modal } from 'react-bootstrap';
import * as yup from "yup";
import { Formik } from "formik";
import Comment from '../comments/Comment'
import Feedback from '../Feedbacks/Feedback'
const PrivateRoom = () => {
    const { user, getAdmin, admin, editAdmin, deleteUser, logoutUser, clearState } = useContext(userContext)
    const { getCommentsForRoom } = useContext(commentsContext)
    const [show, setShow] = useState(false);
    useEffect(() => {
        clearState()
    }, [])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    function handleDelete() {
        if (window.confirm('Are you sure?')) {
            logoutUser();
            deleteUser(params.id)
            history('/')
            localStorage.clear();
        }
    }
    const schema = yup.object().shape({
        experience: yup.string().min(2).max(30).required("Required"),
    });
    const params = useParams();
    useEffect(() => {
        getAdmin(params.id);
    }, []);
    const history = useNavigate()
    useEffect(() => {
        getCommentsForRoom(params.id)
    }, [])
    return (
        <div className='container1' style={{ backgroundColor: '#D0D0D0' }} >
            {
                admin ? (
                    <div style={{ backgroundColor: 'white', boxShadow: '4px 4px 8px 0px rgba(23, 27, 30, 0.63)', margin: '0 auto', textAlign: 'center', width: '500px', alignItems: 'center' }} >
                        <h2>Private room of:  {admin.username}</h2>
                        <h3>Age: {
                            admin.age ? (
                                admin.age
                            ) : (
                                'Not filled'
                            )}</h3>
                        <h3>Experience: {
                            admin.experience ? (
                                admin.experience
                            ) : (
                                'Not filled'
                            )}</h3>
                        <Feedback admin={admin} />
                    </div>
                ) : (
                    <h2>Loading...</h2>
                )
            }
            {
                user ? (user.type === 'admin' ? (<><Button style={{ border: 'none', fontSize: '20px', backgroundColor: '#31B8BF', marginLeft: '610px' }} onClick={handleShow}>Edit</Button>
                    <Button style={{ border: 'none', fontSize: '20px', backgroundColor: '#31B8BF', marginLeft: '10px' }} onClick={handleDelete}>
                        Delete profile
                    </Button></>) : (
                    <>
                    </>
                )) : (<h2>Loading...</h2>)




            }
            {
                admin ? (<Comment admin={admin} />) : (<h2>Loading..</h2>)
            }
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        admin ? (
                            <Formik
                                validationSchema={schema}
                                onSubmit={(data) => {
                                    editAdmin(data, admin);
                                    getAdmin(admin.id)
                                }}
                                initialValues={admin}
                            >
                                {({ handleSubmit, handleChange, values, touched, errors }) => (
                                    <Form
                                        style={{ width: "90%", margin: '0 auto' }}
                                        className="bg-light p-4"
                                        onSubmit={handleSubmit}
                                    >
                                        <Form.Group className="mb-3" controlId="formBasicEmail5">
                                            <Form.Label>Your name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter your name"
                                                name="name"
                                                onChange={handleChange}
                                                isValid={!errors.name && touched.name}
                                                isInvalid={!!errors.name}
                                                value={values.name}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.name}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicEmail5">
                                            <Form.Label>Your age</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter your age"
                                                name="age"
                                                onChange={handleChange}
                                                isValid={!errors.age && touched.age}
                                                isInvalid={!!errors.age}
                                                value={values.age}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.age}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicEmail5">
                                            <Form.Label>Your experience</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter your experience"
                                                name="experience"
                                                onChange={handleChange}
                                                isValid={!errors.experience && touched.experience}
                                                isInvalid={!!errors.experience}
                                                value={values.experience}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.experience}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Button variant="primary" type="submit" onClick={handleClose}>
                                            Edit
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                        ) : (<h3>Loading...</h3>)
                    }

                </Modal.Body>

            </Modal>

        </div>
    );
};

export default PrivateRoom;