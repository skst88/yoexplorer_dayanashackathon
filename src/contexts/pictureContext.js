import React, { useEffect, useReducer, useState } from "react"
import { APIpictures } from "../config/const";
import axios from 'axios';
import { calcSubPrice, calcTotalPrice } from '../config/calcPrice';

export const pictureContext = React.createContext()
const INIT_STATE = {
    pictures: null,
    pictureToEdit: null,
    countOfPictures: JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')).pictures.length : 0,
    cart: 0,
    countOfPicturesFavorites: JSON.parse(localStorage.getItem('favorites')) ? JSON.parse(localStorage.getItem('favorites')).pictures.length : 0,
    favorites: 0,
}
const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_PICTURES":
            return { ...state, pictures: action.payload }
        case "GET_PICTURES_TO_EDIT":
            return { ...state, pictureToEdit: action.payload }
        case "CLEAR_STATE":
            return { ...state, pictureToEdit: action.payload }
        case 'ADD_AND_DELETE_PICTURE_IN_CART':
            return { ...state, countOfPictures: action.payload }
        case 'GET_ALL':
            return { ...state, cart: action.payload }
        case "CLEAR_COUNT":
            return { ...state, countOfPictures: action.payload }
        case "ADD_AND_DELETE_PICTURE_IN_FAVORITES":
            return { ...state, countOfPicturesFavorites: action.payload }
        case 'GET_ALL_FAVORITES':
            return { ...state, favorites: action.payload }
        case "CLEAR_COUNT_FAVORITES":
            return { ...state, countOfPicturesFavorites: action.payload }
        default:
            return state
    }
}

const PictureContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)




    // ! CREATE 

    const addPictures = async (picture, image) => {
        console.log(image)
        try {
            const response = await axios.post(APIpictures, { ...picture, image: image })
            getPictures()
        } catch (e) {
            console.log(e)
        }
    }

    // ! READ  

    const getPictures = async () => {
        try {
            let filter = window.location.search
            const response = await axios(`${APIpictures}/${filter}`)

            let action = {
                type: "GET_PICTURES",
                payload: response.data
            }
            dispatch(action)
        } catch (e) {
            console.log(e)
        }
    }

    // ! UPDATE  

    const getPicturesToEdit = async (id) => {
        try {
            const response = await axios(` 
                ${APIpictures}/${id}`)
            let action = {
                type: "GET_PICTURES_TO_EDIT",
                payload: response.data,
            }
            dispatch(action)
        } catch (e) {
            console.log(e)
        }
    }

    const saveEditedPictures = async (editedPictures) => {
        try {
            const response = await axios.patch(`${APIpictures}/${editedPictures.id}`, editedPictures)
            getPictures()
            clearState()
        } catch (e) {
            console.log(e)
        }
    }

    const clearState = () => {
        let action = {
            type: "CLEAR_STATE",
            payload: null
        }
        dispatch(action)
    }
    const deletePicture = async (id) => {
        try {
            await axios.delete(`${APIpictures}/${id}`)
            getPictures()
        } catch (e) {
            console.log(e);
        }
    }

    const [posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(3)
    useEffect(() => {
        if (state.pictures) {
            const data = state.pictures
            setPosts(data)
        }
    }, [state.pictures])


    const numberOfLastPost = currentPage * postsPerPage
    const numberOfFirstPost = numberOfLastPost - postsPerPage
    const currentPosts = posts.slice(numberOfFirstPost, numberOfLastPost)
    const totalPosts = posts.length
    const handlePage = (newPage) => {
        setCurrentPage(newPage)
    }

    const addAndDeletePictureInCart = (picture) => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (!cart) {
            cart = {
                pictures: [],
                totalPrice: 0,
            }
        } else {

        }
        let product = {
            picture: picture,
            count: 1,
            subPrice: 0,
        }
        product.subPrice = calcSubPrice(product)
        let checkArr = cart.pictures.filter(item => {
            return item.picture.id === picture.id
        })
        if (checkArr.length === 0) {
            cart.pictures.push(product)
        } else {
            cart.pictures = cart.pictures.filter(item => {
                return item.picture.id !== picture.id
            })

        }
        cart.totalPrice = calcTotalPrice(cart)
        localStorage.setItem('cart', JSON.stringify(cart))
        let action = {
            type: "ADD_AND_DELETE_PICTURE_IN_CART",
            payload: cart.pictures.length,
        }
        dispatch(action)
    }

    const checkPictureInCart = (id) => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (!cart) {
            cart = {
                pictures: [],
                totalPrice: 0,
            }
        }
        let checkArr = cart.pictures.filter(item => {
            return item.picture.id === id
        })
        if (checkArr.length === 0) {
            return false
        } else {
            return true
        }
    }

    const changeCountPicture = (count, id) => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        cart.pictures = cart.pictures.map(item => {
            if (item.picture.id === id) {
                item.count = count
                item.subPrice = calcSubPrice(item)
            }
            return item
        })
        cart.totalPrice = calcTotalPrice(cart)
        localStorage.setItem('cart', JSON.stringify(cart))
        getAll()
    }
    const getAll = () => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        dispatch({
            type: 'GET_ALL',
            payload: cart,
        })
    }
    const clearCountOfPictures = () => {
        dispatch({
            type: "CLEAR_COUNT",
            payload: 0
        })
    }
    // favorites 

    const addAndDeletePictureInFavorites = (picture) => {
        let favorites = JSON.parse(localStorage.getItem('favorites'))
        if (!favorites) {
            favorites = {
                pictures: [],
            }
        } else {

        }
        let product = {
            picture: picture,
            count: 1,
        }
        let checkArr = favorites.pictures.filter(item => {
            return item.picture.id === picture.id
        })
        if (checkArr.length === 0) {
            favorites.pictures.push(product)
        } else {
            favorites.pictures = favorites.pictures.filter(item => {
                return item.picture.id !== picture.id
            })
        }
        localStorage.setItem('favorites', JSON.stringify(favorites))
        let action = {
            type: "ADD_AND_DELETE_PICTURE_IN_FAVORITES",
            payload: favorites.pictures.length,
        }
        dispatch(action)
    }

    const checkPictureInFavorites = (id) => {
        let favorites = JSON.parse(localStorage.getItem('favorites'))
        if (!favorites) {
            favorites = {
                pictures: [],
                totalPrice: 0,
            }
        }
        let checkArr = favorites.pictures.filter(item => {
            return item.picture.id === id
        })
        if (checkArr.length === 0) {
            return false
        } else {
            return true
        }
    }

    const changeCountPictureFavorites = (count, id) => {
        let favorites = JSON.parse(localStorage.getItem('favorites'))
        favorites.pictures = favorites.pictures.map(item => {
            if (item.picture.id === id) {
                item.count = count
            }
            return item
        })
        localStorage.setItem('favorites', JSON.stringify(favorites))
        getAllFavorites()
    }

    const getAllFavorites = () => {
        let favorites = JSON.parse(localStorage.getItem('favorites'))
        dispatch({
            type: 'GET_ALL_FAVORITES',
            payload: favorites,
        })
    }
    const clearCountOfPicturesFavorites = () => {
        dispatch({
            type: "CLEAR_COUNT_FAVORITES",
            payload: null
        })
    }
    return (<pictureContext.Provider value={
        {
            addPictures: addPictures,
            getPictures: getPictures,
            getPicturesToEdit: getPicturesToEdit,
            saveEditedPictures: saveEditedPictures,
            deletePicture: deletePicture,
            handlePage: handlePage,
            addAndDeletePictureInCart: addAndDeletePictureInCart,
            changeCountPicture: changeCountPicture,
            checkPictureInCart: checkPictureInCart,
            getAll: getAll,
            setCurrentPage: setCurrentPage,
            clearCountOfPictures: clearCountOfPictures,
            addAndDeletePictureInFavorites: addAndDeletePictureInFavorites,
            changeCountPictureFavorites: changeCountPictureFavorites,
            checkPictureInFavorites: checkPictureInFavorites,
            getAllFavorites: getAllFavorites,
            clearCountOfPicturesFavorites: clearCountOfPicturesFavorites,
            pictureToEdit: state.pictureToEdit,
            pictures: state.pictures,
            currentPosts: currentPosts,
            totalPosts: totalPosts,
            postsPerPage: postsPerPage,
            currentPage: currentPage,
            cart: state.cart,
            favorites: state.favorites,
            countOfPictures: state.countOfPictures,
            countOfPicturesFavorites: state.countOfPicturesFavorites
        }
    } > {props.children} </pictureContext.Provider>)
}


export default PictureContextProvider;