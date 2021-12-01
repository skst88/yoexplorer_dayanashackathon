// import React, { useEffect, useReducer } from 'react';
// import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth'
// import { auth } from '../firebase';

// export const authContext = React.createContext()

// const INIT_STATE = {
//     user: null,
// }

// const reducer = (state = INIT_STATE, action) => {
//     switch (action.type) {
//         case "SET_USER":
//             return { ...state, user: action.payload }
//         default:
//             return state
//     }
// }

// const AuthContextProvider = (props) => {

//     const [state, dispatch] = useReducer(reducer, INIT_STATE)
//     // ! Auth with google

//     const googleProvider = new GoogleAuthProvider()
//     const authWithGoogle = async () => {
//         try {
//             const response = await signInWithPopup(auth, googleProvider)
//             console.log(response)
//         } catch (e) {
//             console.log(e)

//         }
//     }

//     // ! Проверка на то, что пользователь в системе или нет

//     useEffect(() => {
//         onAuthStateChanged(auth, (user) => {
//             let action = {
//                 type: "SET_USER",
//                 payload: user,
//             }
//             dispatch(action)

//         })
//     }, [])
//     // ! Выйти из системы 

//     const logOut = async () => {
//         try {
//             await signOut(auth)
//         } catch (e) {
//             console.log(e)
//         }
//     }

//     return (
//         <authContext.Provider value={{
//             authWithGoogle: authWithGoogle,
//             logOut: logOut,
//             user: state.user,
//         }}>
//             {props.children}
//         </authContext.Provider>
//     );
// };

// export default AuthContextProvider;