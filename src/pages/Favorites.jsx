import React, { useContext, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { pictureContext } from '../contexts/pictureContext';

const Favorites = () => {
    const { getAllFavorites, favorites } = useContext(pictureContext)
    useEffect(() => {
        getAllFavorites()
    }, [])
    return (
        <div>
            <h2 style={{ color: '#31B8BF', textAlign: 'center', marginTop: '25px' }} >Favorites</h2>
            {
                favorites ? (
                    <Table >
                        <thead>
                            <tr style={{ width: '70%' }}>
                                <th>Name of pictures</th>
                                <th align="right">Category</th>
                            </tr>
                        </thead>

                        <tbody>
                            {favorites.pictures.map((item) => (
                                <tr
                                    key={item.picture.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <td component="th" scope="row">
                                        {item.picture.name}
                                    </td>
                                    <td align="right">{item.picture.category}</td>
                                    <td align="right">
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    // qwe

                ) : (
                    <h2 style={{ color: '#1C374C', textAlign: 'center', marginTop: '25px' }}>You haven't pictures in the favorites</h2>
                )
            }


            {/* <h3>Total price: {favorites ? favorites.totalPrice : 0} сом</h3> */}
            {

                // favorites ? <Link to='/order'><Button style={{ backgroundColor: '#31B8BF', border: 'none' }}>Произвести оплату</Button></Link> : <></>
            }

        </div>
    );
};

export default Favorites;