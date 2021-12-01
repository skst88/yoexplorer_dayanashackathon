import React from 'react';
import insta from '../../image/instagram.svg'
import facebook from '../../image/facebook.svg'
import linkedin from '../../image/linkedin.svg'


const Footer = () => {
    return (
        <div className='my-footer'>
            <div style={{ backgroundColor: '#E9EBEA', width: '100%', height: 'auto', display: 'flex', justifyContent: 'space-evenly', color: 'black', paddingTop: '25px', paddingBottom: '25px' }}>
                <div className='first_footer_inner'>
                    <strong>Hi everyone</strong>
                    <p className='para'>About me</p>
                    <p className='para'>Tours</p>
                    <p className='para'>FAQ</p>
                </div>
                <div >
                    <strong>Contacts</strong>
                    <p className='para'>Phone: +996 557 499 800</p>
                    <p className='para'>Adress: Karakol city, Gagarin street</p>
                    <p className='para'>Gmail: ibraim.almazbekov@gmail.com</p>
                    <p className='para'>Visit Karakol</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} className='third_footer_inner'>
                    <strong >Follow me: </strong>
                    <a href="https://instagram.com/ibraim_almazbekov?utm_medium=copy_link"> <img style={{ width: '30px', height: 'auto', margin: '10px 0 10px 0' }} src={insta} alt="" /></a>
                    <a href="https://www.facebook.com/ibraim.almazbekov11"> <img style={{ width: '30px', height: 'auto', marginBottom: '10px' }} src={facebook} alt="" /></a>
                    <a href="https://kg.linkedin.com/in/ibraim-almazbekov"> <img style={{ width: '30px', height: 'auto' }} src={linkedin} alt="" /></a>
                </div>

            </div>
        </div >
    );
};

export default Footer;