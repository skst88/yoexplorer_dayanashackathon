import React, { useContext, useEffect } from 'react';
import { userContext } from '../contexts/userContext';
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap';
const AllAdminsPage = () => {
    const { getAllAdmins, admins } = useContext(userContext)
    useEffect(() => {
        getAllAdmins()
    }, [])

    return (
        <div style={{ textAlign: 'center', }}>
            {
                admins ? (
                    <Table style={{ fontSize: '20px', color: '#31B8BF' }}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {admins.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td><><Link style={{ textDecoration: 'none', color: '#1C374C', }} to={'/admin/' + item.id}>{item.username}</Link><br /></></td>
                                </tr>

                            ))}
                        </tbody>
                    </Table>
                ) : (<h2>Loading...</h2>)
            }
        </div >
    );
};

export default AllAdminsPage;