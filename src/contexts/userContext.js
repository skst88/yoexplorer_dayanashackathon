import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { APIusers } from "../config/const";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from "../firebase/Firebase";
export const userContext = React.createContext();


const INIT_STATE = {
    admins: null,
    user: null,
    admin: null,
    failedLogin: null,
};

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "LOGIN_USER":
            return { ...state, user: action.payload };
        case "FAILED_LOGIN":
            return { ...state, failedLogin: action.payload };
        case "LOGOUT_USER":
            return { ...state, user: action.payload };
        case "GET_USER":
            return { ...state, user: action.payload }
        case "ADMIN":
            return { ...state, admin: action.payload }
        case "CLEAR_STATE":
            return { ...state, phone: action.payload }
        case "GET_ALL_ADMINS":
            return { ...state, admins: action.payload }
        case "SET_USER":
            return { ...state, user: action.payload }
        default:
            return state;
    }
};

const UserContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    const signUpUser = async (username, password, email, type, age) => {
        try {
            let res = await axios(APIusers);
            let user = res.data.find((user) => user.username === username);
            if (user === undefined) {
                try {
                    let { data } = await axios.post(APIusers, {
                        username,
                        password,
                        email,
                        type,
                        age,
                    });
                    console.log(data)
                    dispatch({
                        type: "LOGIN_USER",
                        payload: data,
                    });
                    dispatch({
                        type: "FAILED_LOGIN",
                        payload: false,
                    });
                } catch (e) {
                    console.log(e);
                }
            } else {
                dispatch({
                    type: "FAILED_LOGIN",
                    payload: true,
                });
            }
        } catch (e) {
            console.log(e);
        }
    };
    const getAllAdmins = async () => {
        try {
            let { data } = await axios(APIusers)
            let result = data.filter(item => {
                return item.type === 'admin'
            })
            dispatch({
                type: 'GET_ALL_ADMINS',
                payload: result,
            })
        } catch (e) {
            console.log(e);
        }
    }
    const getUser = async (id) => {
        try {
            let response = await axios(APIusers + '/' + id);
            dispatch({
                type: "GET_USER",
                payload: response.data,
            });
        } catch (e) {
            console.log(e)
        }
    }
    const getAdmin = async (id) => {
        try {
            let response = await axios(APIusers + '/' + id)
            dispatch({
                type: "ADMIN",
                payload: response.data,
            })
        } catch (e) {
            console.log(e);
        }
    }
    const editAdmin = async (editedUser, user) => {
        try {
            await axios.patch(APIusers + '/' + user.id, editedUser)
            getAdmin(user.id)
            clearState()
        } catch (e) {
            console.log(e)
        }
    }
    const clearState = () => {
        dispatch({
            type: "CLEAR_STATE",
            payload: null,
        })
    }
    const deleteUser = async (id) => {
        try {
            await axios.delete(APIusers + '/' + id)
        } catch (e) {
            console.log(e)
        }
    }
    const loginUser = async (username, password) => {
        try {
            let res = await axios(APIusers);
            let user = res.data.find((user) => user.username === username);
            let bool = false;
            if (user) {
                bool = user.password === password ? true : false;
            }
            if (bool) {
                dispatch({
                    type: "LOGIN_USER",
                    payload: user,
                });
                dispatch({
                    type: "FAILED_LOGIN",
                    payload: false,
                });
            } else {
                dispatch({
                    type: "FAILED_LOGIN",
                    payload: true,
                });
            }
        } catch (e) {
            console.log(e);
        }
    };

    const setUser = (user) => {
        dispatch({
            type: "LOGIN_USER",
            payload: user,
        });
    };

    const logoutUser = () => {
        dispatch({
            type: "LOGOUT_USER",
            payload: null,
        });
    };

    const checkAuth = () => {
        let user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            dispatch({
                type: 'LOGIN_USER',
                payload: user
            })
            dispatch({
                type: "FAILED_LOGIN",
                payload: false,
            });
        } else {
            dispatch({
                type: "FAILED_LOGIN",
                payload: true,
            });
        }
    }
    // ! Auth with google

    const googleProvider = new GoogleAuthProvider()
    const authWithGoogle = async () => {
        try {
            const response = await signInWithPopup(auth, googleProvider)
            console.log(response)
        } catch (e) {
            console.log(e)

        }
    }
    // ! Проверка на то, что пользователь в системе или нет

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                let action = {
                    type: "SET_USER",
                    payload: user,
                }
                dispatch(action)
            }

        })
    }, [])
    // ! Выйти из системы 

    const logOut = async () => {
        try {
            await signOut(auth)
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <userContext.Provider
            value={{
                signUpUser,
                loginUser,
                logoutUser,
                setUser,
                editAdmin,
                deleteUser,
                getUser,
                clearState,
                getAllAdmins,
                getAdmin,
                authWithGoogle: authWithGoogle,
                logOut: logOut,
                checkAuth,
                admins: state.admins,
                user: state.user,
                admin: state.admin,
                state,

            }}
        >
            {props.children}
        </userContext.Provider>
    );
};

export default UserContextProvider;