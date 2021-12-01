import React, { useContext, useEffect, useState } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { pictureContext } from '../../contexts/pictureContext';

const SearchDoc = () => {
    const { getPictures, pictures } = useContext(pictureContext)
    useEffect(() => {
        getPictures()
    }, [])
    const [dropDownDiv, setDropDownDiv] = useState(<div style={{ display: 'none' }}></div>)
    function handleChange(value) {
        if (value.length > 2) {
            setDropDownDiv(<>

                <div style={{ backgroundColor: '#E9EBEA', marginLeft: '-100px', color: '#black', width: '400px', fontSize: '20px', height: '150px', display: 'block', border: 'none', marginTop: '220px' }}>
                    <h2>
                        You found:
                    </h2>
                    <ul >
                        {
                            pictures ? (
                                pictures.map(item => {
                                    let res = new RegExp(value)
                                    if (item.category.toLowerCase().match(res)) {
                                        return <Link to={'/details/' + item.id} key={item.id}
                                            onClick={() => {
                                                setDropDownDiv(<></>)
                                            }}
                                        ><li style={{ listStyleType: 'doted', color: '#0d4e97', textAlign: 'left' }} >{item.name}</li></Link>
                                    }
                                })
                            ) : (<h2>Loading...</h2>)

                        }
                    </ul>

                </div>
            </>)
        } else {
            setDropDownDiv(<div style={{ display: 'none' }}></div>)
        }
    }
    return (
        <>
            <div className="search-pp">

                <InputGroup style={{ width: '400px', marginLeft: '200px', height: 'auto' }}>
                    <FormControl className='search' style={{ borderRadius: '70px', fontSize: '20px', marginLeft: '20px' }} placeholder="Search your pic"
                        onChange={(e) => { handleChange(e.target.value) }} />
                </InputGroup>
            </div>
            <div>

                {dropDownDiv}
            </div>
        </>
    );
};

export default SearchDoc;