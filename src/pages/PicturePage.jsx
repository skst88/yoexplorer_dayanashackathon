import { Form, Button, Card } from 'react-bootstrap';
import React, { useContext, useEffect, useState } from 'react';
import * as yup from 'yup'
import { Formik } from 'formik';
import { pictureContext } from '../contexts/pictureContext';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '../components/pagination/Pagination'
import { BsGoogle } from "react-icons/bs";
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { storage } from '../firebase/Firebase';
import saveImage from 'save-image';

const PicturePage = () => {

    const { addPictures, getPictures, deletePicture, currentPosts, setCurrentPage, addAndDeletePictureInCart, checkPictureInCart, addAndDeletePictureInFavorites, checkPictureInFavorites } = useContext(pictureContext)
    const schema = yup.object().shape({
        name: yup.string().min(2).max(30).required("Required"),
        // image: yup.string().required("Required"),
        category: yup.string().required("Required"),
        price: yup.string().min(3).max(255).required("Required"),
    })
    useEffect(() => {
        getPictures()
    }, [])
    const navigate = useNavigate()
    let addForm

    let object = new URLSearchParams(window.location.search)
    const [brandValue, setBrandValue] = useState('')
    function filterPictures(key, value) {
        object.set(key, value)
        let newUrl = `${window.location.pathname}?${object.toString()}`
        navigate(newUrl)
        getPictures()
        setBrandValue(value)
    }
    useEffect(() => {
        setBrandValue(object.get('category'))
    }, [object])
    let user = JSON.parse(localStorage.getItem('user'))

    const [image, setImage] = useState("")
    function handleImage(image) {
        const storageRef = ref(storage, image.name);
        uploadBytes(storageRef, image).then((snapshot) => {
            getDownloadURL(ref(storage, image.name)).then((url) => {
                setImage(url)
                alert("Картинка загружена")
            })
        });
    }
    console.log(image)
    if (user) {
        if (user.type === 'admin') {
            addForm = <div>
                <Formik
                    validationSchema={schema}
                    onSubmit={(data, { resetForm }) => {
                        addPictures(data, image);
                        resetForm()
                    }}
                    initialValues={{
                        name: "",
                        category: "",
                        price: "",
                        // image: "",

                    }}
                >
                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                        <Form
                            style={{ width: "90%", margin: '0 auto' }}
                            className="bg-light p-4"
                            onSubmit={handleSubmit}
                        >
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Name of photo</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter photo"
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
                                    <option value="winter">Winter</option>
                                    <option value="summer">Summer</option>
                                    <option value="animals">Animals</option>
                                    <option value="city">City</option>
                                </Form.Select>

                                <Form.Control.Feedback type="invalid">
                                    {errors.category}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail2">
                                <Form.Label>Price of photo</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter the price"
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
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    placeholder="Enter the image URL"
                                    // name="image"
                                    onChange={(event) => handleImage(event.target.files[0])}
                                // isValid={!errors.image && touched.image}
                                // isInvalid={!!errors.image}
                                // value={image}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.image}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button style={{ border: 'none', marginLeft: '0', backgroundColor: '#324873' }} variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div >
        }
    }
    const download = e => {
        console.log(e.target.href);
        fetch(e.target.href, {
            method: "GET",
            headers: {}
        })
            .then(response => {
                response.arrayBuffer().then(function (buffer) {
                    const url = window.URL.createObjectURL(new Blob([buffer]));
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", "image.png"); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                });
            })
            .catch(err => {
                console.log(err);
            });
    };
    return (
        <div className='filter' >
            <div className='in_filter' >
                <h3 style={{ textAlign: 'center' }}>Filter by category</h3>
                <Form.Group
                    className="mb-3"
                    value={brandValue}
                    controlId="formBasicEmail"
                    onChange={(e) => {
                        filterPictures('category', e.target.value)
                        setCurrentPage(1)
                    }}
                >
                    <Form.Check
                        block='true'
                        label="winter"
                        value='winter'
                        name="category"
                        type="radio"
                        id="inline-radio-1"
                    />
                    <Form.Check
                        block='true'

                        label="summer"
                        value='summer'
                        name="category"
                        type="radio"
                        id="inline-radio-2"
                    />
                    <Form.Check
                        block='true'

                        label="animals"
                        value='animals'
                        name="category"
                        type="radio"
                        id="inline-radio-2"
                    />
                    <Form.Check
                        block='true'

                        label="city"
                        value='city'
                        name="category"
                        type="radio"
                        id="inline-radio-2"
                    />
                </Form.Group>
            </div>
            <div style={{ margin: 'auto' }}>
                {addForm}
                {
                    currentPosts ? (
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>{
                            currentPosts.map(item => {
                                return <Card key={item.id} style={{ width: '40rem', border: '1px solid #D0D0D0' }}>
                                    <Card.Body>
                                        <a href={item.image} target="_blank" download onClick={e => download(e)}>
                                            <Card.Img variant="top" src={item.image} />
                                        </a>
                                        <Card.Title style={{ fontWeight: 'bold', fontSize: '30px' }} >Name of photo: {item.name}</Card.Title>
                                        <Card.Subtitle>Category of picture: {item.category}</Card.Subtitle>
                                        <Card.Text>Price of picture: {item.price + '$'}</Card.Text>
                                        {
                                            user ? ((user.type === 'admin' && user) ? (<><Link to={'/edit/' + item.id}><Button style={{ marginLeft: '0', border: 'none', backgroundColor: '#324873' }} >Edit</Button></Link>
                                                <Button style={{ marginLeft: '5px', border: 'none', backgroundColor: '#324873', alignItems: 'center' }} onClick={() => { deletePicture(item.id) }}>Delete</Button></>) : (<>
                                                    <Button style={{ marginRight: '10px', }} variant={checkPictureInCart(item.id) ? 'danger' : 'primary'} onClick={() => addAndDeletePictureInCart(item)}>Cart</Button>
                                                    <Button variant={checkPictureInFavorites(item.id) ? 'danger' : 'primary'} onClick={() => addAndDeletePictureInFavorites(item)}>Favorite</Button>
                                                </>)) : (<></>)
                                        }
                                        <Link to={'/details/' + item.id}><Button style={{ backgroundColor: '#324873', marginLeft: '5px' }}>More</Button></Link>
                                        {/* sad */}
                                    </Card.Body>
                                </Card>
                            })
                        }</div>
                    ) : (
                        <h2>Loading...</h2>
                    )
                }
                <Pagination />
            </div>
        </div>
    );
};

export default PicturePage;