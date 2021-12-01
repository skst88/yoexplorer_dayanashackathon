import React from "react";
import useForm from "./useForm";
import { Button, Form, Alert, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CreditCardPage.css";
import Cards from "react-credit-cards";
import * as yup from "yup";
import { Formik } from "formik";
import "react-credit-cards/es/styles-compiled.css";
import { useNavigate } from "react-router";


const CreditCardPage = () => {
    const { handleChange, handleFocus, handleSubmit, values, errors } = useForm();
    const navigate = useNavigate()
    return (
        <div className="containerCard" >
            < div className="box justify-content-center align-items-center" >
                <div className="formDiv" >
                    <div className="creditCard" >
                        <Cards
                            cvc={values.cardSecurityCode}
                            expiry={values.cardExpiration}
                            focused={values.focus}
                            name={values.cardName}
                            number={values.cardNumber}
                        />
                        <Form onSubmit={() => {
                            alert('Thank you, for choosing us!')
                            navigate('/')
                        }}>
                            <Form.Group style={{ margin: '10px', marginBottom: '20px' }}>
                                <Form.Control
                                    type="text"
                                    id="cardName"
                                    data-testid="cardName"
                                    name="cardName"
                                    placeholder="Name of owner"
                                    required
                                    value={values.cardName}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    isValid={errors.name}
                                />
                            </Form.Group>
                            <Form.Group style={{ margin: '10px' }}>
                                <Form.Control
                                    type="text"
                                    maxLength='16'
                                    id="cardNumber"
                                    data-testid="cardNumber"
                                    name="cardNumber"
                                    placeholder="Number of card"
                                    required
                                    value={values.cardNumber}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    isValid={errors.number}
                                />
                            </Form.Group >
                            <Row>
                                <Col>
                                    <Form.Group style={{ margin: '10px' }}>
                                        <Form.Control
                                            type="text"
                                            maxLength='4'
                                            id="cardExpiration"
                                            data-testid="cardExpiration"
                                            name="cardExpiration"
                                            placeholder="Validity period"
                                            required
                                            value={values.cardExpiration}
                                            onChange={handleChange}
                                            onFocus={handleFocus}
                                            isValid={errors.exp}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group style={{ margin: '10px' }}>
                                        <Form.Control
                                            type="text"
                                            maxLength='3'
                                            id="cardSecurityCode"
                                            data-testid="cardSecurityCode"
                                            name="cardSecurityCode"
                                            placeholder="CVV"
                                            required
                                            value={values.cardSecurityCode}
                                            onChange={handleChange}
                                            onFocus={handleFocus}
                                            isValid={errors.cvv}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button
                                style={{ backgroundColor: '#324873', border: 'none', alignItems: 'center', marginLeft: '75px', marginTop: '15px' }}
                                size={"block"}
                                data-testid="validateButton"
                                id="validateButton"
                                type="submit"
                            >
                                Confirm your order
                            </Button>
                        </Form>
                    </div >
                    {/* <Alert
                        id="alertMessage"
                        data-testid="alertMessage"
                        variant={errors.variant}
                        show={errors.show}
                    >
                        {errors.message}
                    </Alert>{" "} */}
                </div >
            </div >
        </div >
    );
};

export default CreditCardPage;