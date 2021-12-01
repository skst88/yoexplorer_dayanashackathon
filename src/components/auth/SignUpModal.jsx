import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import * as yup from "yup";
import { Formik } from "formik";
import { userContext } from "../../contexts/userContext";
const SignUpModal = (props) => {
    const { signUpUser } = useContext(userContext);
    let schema
    function handleSignup(data, role) {
        signUpUser(data.username, data.password, data.email, role, data.age,);
        props.handleClose();
    }
    const [role, setRole] = useState('admin')
    const [content, setContent] = useState()
    useEffect(() => {
        if (role === 'admin') {
            schema = yup.object().shape({
                username: yup.string().min(2).max(30).required("Required"),
                role: yup.string().min(4).max(6).required("Required"),
                email: yup.string().email().min(3).max(255).required("Required"),
                age: yup.number().min(1).max(220).required("Required"),
                password: yup
                    .string()
                    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
                    .min(8)
                    .max(24)
                    .required("Required"),
                passwordConfirmation: yup
                    .string()
                    .oneOf([yup.ref("password"), null], "Passwords must match")
                    .required("Required"),
            });
            setContent(<Formik
                validationSchema={schema}
                onSubmit={(data) => {
                    console.log(data)
                    handleSignup(data, 'admin');
                }}
                initialValues={{
                    username: "",
                    role: 'admin',
                    email: "",
                    age: "",
                    password: "",
                    passwordConfirmation: "",
                }}
            >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                    <Form
                        style={{ width: "90%", margin: '0 auto', }}
                        className="bg-light p-4"
                        onSubmit={handleSubmit}
                    >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Enter your name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                name="username"
                                onChange={handleChange}
                                isValid={!errors.username && touched.username}
                                isInvalid={!!errors.username}
                                value={values.username}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.username}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail1">
                            <Form.Label>Enter your email adress</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email adress"
                                name="email"
                                onChange={handleChange}
                                isValid={!errors.email && touched.email}
                                isInvalid={!!errors.email}
                                value={values.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail2">
                            <Form.Label>Enter your age</Form.Label>
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
                        <Form.Group className="mb-3" controlId="formBasicPassword1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your"
                                name="password"
                                onChange={handleChange}
                                isValid={!errors.password && touched.password}
                                isInvalid={!!errors.password}
                                value={values.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword2">
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm your password"
                                name="passwordConfirmation"
                                onChange={handleChange}
                                isValid={
                                    !errors.passwordConfirmation &&
                                    touched.passwordConfirmation
                                }
                                isInvalid={!!errors.passwordConfirmation}
                                value={values.passwordConfirmation}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.passwordConfirmation}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button style={{ border: 'none', backgroundColor: '#7787A6' }} type="submit">
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>)
        } else {
            schema = yup.object().shape({
                username: yup.string().min(2).max(30).required("Required"),
                role: yup.string().min(4).max(6).required("Required"),
                email: yup.string().email().min(3).max(255).required("Required"),
                age: yup.number().min(1).max(220).required("Required"),
                password: yup
                    .string()
                    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
                    .min(8)
                    .max(24)
                    .required("Required"),
                passwordConfirmation: yup
                    .string()
                    .oneOf([yup.ref("password"), null], "Passwords must match")
                    .required("Required"),
            });
            setContent(<Formik
                validationSchema={schema}
                onSubmit={(data) => {
                    handleSignup(data, 'user');
                }}
                initialValues={{
                    username: "",
                    role: 'user',
                    email: "",
                    age: "",
                    password: "",
                    passwordConfirmation: "",
                }
                }

            >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                    <Form
                        style={{ width: "90%", margin: '0 auto' }}
                        className="bg-light p-4"
                        onSubmit={handleSubmit}
                    >

                        <Form.Group className="mb-3" controlId="formBasicEmail1">
                            <Form.Label>Enter your name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                name="username"
                                onChange={handleChange}
                                isValid={!errors.username && touched.username}
                                isInvalid={!!errors.username}
                                value={values.username}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.username}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail2">
                            <Form.Label>Enter your email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                onChange={handleChange}
                                isValid={!errors.email && touched.email}
                                isInvalid={!!errors.email}
                                value={values.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail3">
                            <Form.Label>Enter your age</Form.Label>
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
                        <Form.Group className="mb-3" controlId="formBasicPassword4">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                name="password"
                                onChange={handleChange}
                                isValid={!errors.password && touched.password}
                                isInvalid={!!errors.password}
                                value={values.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword5">
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm your password"
                                name="passwordConfirmation"
                                onChange={handleChange}
                                isValid={
                                    !errors.passwordConfirmation &&
                                    touched.passwordConfirmation
                                }
                                isInvalid={!!errors.passwordConfirmation}
                                value={values.passwordConfirmation}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.passwordConfirmation}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button style={{ border: 'none', backgroundColor: 'green' }} type="submit">
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik >)
        }
    }, [role])


    return (
        <>
            <Modal show={props.show} onHide={() => {
                props.handleClose()
                setRole('admin')
            }}>
                <Modal.Header style={{ backgroundColor: '#D0D0D0' }} closeButton>
                    <Modal.Title >Registration</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Check
                            inline
                            label="Admin"
                            name="group1"
                            type="radio"
                            id="inline-radio-1"
                            onChange={() => setRole('admin')}
                            defaultChecked
                        />
                        <Form.Check
                            inline
                            label="Guest"
                            name="group1"
                            type="radio"
                            id="inline-radio-2"
                            onChange={() => setRole('user')}
                        />
                    </Form.Group>
                    {content}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default SignUpModal;