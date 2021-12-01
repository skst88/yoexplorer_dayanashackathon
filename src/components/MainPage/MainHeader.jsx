import React from 'react';
import './MainHeader.css'
import { Card } from 'react-bootstrap';
import firstPhoto from '../../image/first-photo.JPG'
import second from '../../image/2.JPG'
import thirdPhoto from '../../image/3.JPG'
import four from '../../image/4.JPG'
import five from '../../image/5.JPG'
import six from '../../image/6.JPG'
import seven from '../../image/7.JPG'
import eight from '../../image/8.JPG'
import nine from '../../image/9.JPG'
import eleven from '../../image/11.JPG'
import twelve from '../../image/12.JPG'
import fourteen from '../../image/14.JPG'
import Footer from '../MainPage/Footer';


const MainHeader = () => {

    return (
        <>
            <div className="main-header">
                {/* <img src={yoLogo} alt="" /> */}
            </div>
            <div >
                <div>
                    <h2 style={{ textAlign: 'center', textAlign: 'center', paddingTop: '20px', paddingBottom: '20px' }}>Best photos for your wallpaper</h2>
                </div>
                <div className="masonry">
                    <Card className='my-cards' >
                        <Card.Img src={firstPhoto} alt="Card image" />
                    </Card>
                    <Card className='my-cards'>
                        <Card.Img src={thirdPhoto} alt="Card image" />
                    </Card>
                    <Card className='my-cards'>
                        <Card.Img src={seven} alt="Card image" />
                    </Card>
                    <Card className='my-cards'>
                        <Card.Img src={five} alt="Card image" />
                    </Card>
                    <Card className='my-cards'>
                        <Card.Img src={eight} alt="Card image" />
                    </Card>
                    <Card className='my-cards'>
                        <Card.Img src={nine} alt="Card image" />
                    </Card>
                    <Card className='my-cards'>
                        <Card.Img src={eleven} alt="Card image" />
                    </Card>
                    <Card className='my-cards'>
                        <Card.Img src={second} alt="Card image" />
                    </Card>
                    <Card className='my-cards'>
                        <Card.Img src={four} alt="Card image" />
                    </Card>
                    <Card className='my-cards'>
                        <Card.Img src={six} alt="Card image" />
                    </Card>
                    <Card className='my-cards'>
                        <Card.Img src={twelve} alt="Card image" />
                    </Card>
                    <Card className='my-cards'>
                        <Card.Img src={fourteen} alt="Card image" />
                    </Card>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MainHeader;