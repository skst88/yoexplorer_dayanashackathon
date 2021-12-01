import React, { useContext, useEffect } from 'react';
import * as yup from 'yup'
import { Formik } from 'formik';
import { pictureContext } from '../contexts/pictureContext';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';

const EditPage = () => {
    const { saveEditedPictures, getPicturesToEdit, pictureToEdit } = useContext(pictureContext)
    const params = useParams()
    useEffect(() => {
        getPicturesToEdit(params.id)
    }, [])
    const schema = yup.object().shape({
        name: yup.string().min(2).max(30).required("Required"),
        category: yup.string().required("Required"),
        price: yup.string().min(2).max(255).required("Required"),
    })
    const navigate = useNavigate()
    return (
        <div>
            <h2 style={{ textAlign: 'center', marginTop: '15px' }}>Edit Page</h2>
            {
                pictureToEdit ? (
                    <Formik
                        validationSchema={schema}
                        onSubmit={(data, { resetForm }) => {
                            saveEditedPictures(data);
                            navigate(-1)
                        }}
                        initialValues={pictureToEdit}
                    >
                        {({ handleSubmit, handleChange, values, touched, errors }) => (
                            <Form
                                style={{ width: "90%", margin: '0 auto' }}
                                className="bg-light p-4"
                                onSubmit={handleSubmit}
                            >
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Name of photo
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Name of photo"
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
                                <Form.Group className="mb-3" controlId="formBasicEmail1">
                                    <Form.Label>Category of photo</Form.Label>
                                    <Form.Select
                                        aria-label="Default select example"
                                        name="category"
                                        onChange={handleChange}
                                        isValid={!errors.category && touched.category}
                                        isInvalid={!!errors.category}
                                        value={values.category}
                                    >
                                        <option>Select category</option>
                                        <option value="summer">Summer</option>
                                        <option value="winter">Winter</option>
                                        <option value="animals">Animals</option>
                                        <option value="city">City</option>
                                    </Form.Select>

                                    <Form.Control.Feedback type="invalid">
                                        {errors.category}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail2">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Price"
                                        name="price"
                                        onChange={handleChange}
                                        isValid={!errors.price && touched.price}
                                        isInvalid={!!errors.price}
                                        value={values.price}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.price}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail2">
                                    <Form.Label>URL picture</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="URL"
                                        name="image"
                                        onChange={handleChange}
                                        isValid={!errors.image && touched.image}
                                        isInvalid={!!errors.image}
                                        value={values.image}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.image}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Button style={{ backgroundColor: '#324873', border: 'none' }} variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        )}
                    </Formik>
                ) : (
                    <h2>Loading...</h2>
                )
            }

        </div>
    );
};

export default EditPage;