import { Button } from 'react-bootstrap';
import React, { useContext } from 'react';
import { pictureContext } from '../../contexts/pictureContext';

const Pagination = () => {
    const { totalPosts, postsPerPage, handlePage, currentPage } = useContext(pictureContext)
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <div className="pagination-div">
            <ul>
                {
                    pageNumbers.map(page => (
                        <li key={page}>
                            {
                                currentPage === page ? (
                                    <Button variant="outline-success" style={{ backgroundColor: '#324873', border: 'none', padding: '0 20px', display: 'inline-block', height: '30px', marginTop: '13px', marginRight: '10px', color: 'white' }} onClick={() => {
                                        handlePage(page)
                                    }} >{page}</Button>
                                ) : (
                                    <Button style={{ backgroundColor: '#324873', border: 'none', padding: '0 20px', display: 'inline-block', height: '30px', marginTop: '13px', marginRight: '10px', color: 'white' }} onClick={
                                        () => {
                                            handlePage(page)
                                        }
                                    } >{page}</Button>
                                )
                            }

                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Pagination;