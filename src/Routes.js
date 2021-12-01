import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navibar from '../src/components/MainPage/Navibar'
import PictureContextProvider from './contexts/pictureContext';
import CartPage from './pages/CartPage';
import EditPage from './pages/EditPage';
import MainPage from './pages/MainPage';
import PicturePage from './pages/PicturePage';
import OrderPage from './pages/OrderPage';
import CommentContextProvider from './contexts/commentsContext';
import Favorites from './pages/Favorites';
import FeedbackContextProvider from './contexts/feedbackContext';
import AllAdminsPage from './pages/AllAdminsPage';
import AllAboutOnePicture from './pages/AllAboutOnePicture'
import CreditCardPage from './pages/CreditCard/CreditCardPage';
import LikesContextProvider from './contexts/LikesContext';


const MyRoutes = () => {
    return (
        <PictureContextProvider >
            <CommentContextProvider>
                <FeedbackContextProvider>
                    <LikesContextProvider>
                        <BrowserRouter>
                            <Navibar />
                            <Routes>
                                <Route path='/' element={<MainPage />} />
                                <Route path='/admin/:id' element={<AllAdminsPage />} />
                                <Route path='/photos' element={<PicturePage />} />
                                <Route path='/details/:id' element={<AllAboutOnePicture />} />
                                <Route path="/edit/:id" element={<EditPage />} />
                                <Route path="/cart" element={<CartPage />} />
                                <Route path="/credit/card" element={<CreditCardPage />} />
                                {/* <Route path='/order' element={<OrderPage />} /> */}
                                <Route path='/favorites' element={<Favorites />} />
                            </Routes>
                        </BrowserRouter>
                    </LikesContextProvider>
                </FeedbackContextProvider>
            </CommentContextProvider>
        </PictureContextProvider>
    );
};

export default MyRoutes;