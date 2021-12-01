import React, { useContext, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { pictureContext } from '../contexts/pictureContext';

const CartPage = () => {
    const { changeCountPicture, getAll, cart } = useContext(pictureContext)
    useEffect(() => {
        getAll()
    }, [])
    return (
        <div>
            <h2 style={{ color: '#31B8BF', textAlign: 'center', marginTop: '25px' }} >Cart</h2>
            {
                cart ? (
                    cart.pictures.length ? (
                        <>
                            <Table striped bordered hover style={{ fontSize: '12px' }} >
                                <thead>
                                    <tr>
                                        <th>Name of picture</th>
                                        <th align="right">Category</th>
                                        <th align="right">Count</th>
                                        <th align="right">Price</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {cart.pictures.map((item) => (
                                        <tr
                                            key={item.picture.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <td component="th" scope="row">
                                                {item.picture.name}
                                            </td>
                                            <td align="right">{item.picture.category}</td>
                                            <td align="right">
                                                <input type="number" onChange={(e) => changeCountPicture(e.target.value, item.picture.id)} value={item.count} style={{ width: '40px' }} />
                                            </td>
                                            <td align="right">{item.subPrice}</td>
                                        </tr>
                                    ))}

                                    <tr >
                                        <td colSpan={3} align="right" style={{ fontWeight: 'bold', fontSize: '18px' }}>Total: </td>
                                        <td align="right" style={{ fontWeight: 'bold', fontSize: '18px' }}>{cart ? cart.totalPrice : 0} USD</td>
                                    </tr>

                                </tbody>
                            </Table>


                            <h3>Total price: {cart ? cart.totalPrice : 0} USD</h3>
                            {

                                cart ? <Link to='/credit/card'><Button style={{ backgroundColor: '#31B8BF', border: 'none' }}>Pay</Button></Link> : <></>
                            }</>
                    ) : (
                        <h2 style={{ color: '#1C374C', textAlign: 'center', marginTop: '25px' }}>You haven't pictures in the cart</h2>
                    )
                ) : (
                    <h2 style={{ color: '#1C374C', textAlign: 'center', marginTop: '25px' }}>You haven't pictures in the cart</h2>
                )
            }



        </div>
    );
};

export default CartPage;