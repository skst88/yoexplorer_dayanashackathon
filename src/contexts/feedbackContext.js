import axios from 'axios';
import React, { useReducer } from 'react';
import { APIfeedbacks } from '../config/const';

export const feedbackContext = React.createContext()

const INIT_STATE = {
    feedbacks: null,
    feedbacksToEdit: null,
}

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_FEEDBACKS":
            return { ...state, feedbacks: action.payload }
        case "GET_FEEDBACKS_TO_EDIT":
            return { ...state, feedbacksToEdit: action.payload }
        default:
            return state
    }
}

const FeedbackContextProvider = (props) => {

    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    // ! CREATE 

    const addFeedback = async (owner, adminId, rate) => {
        try {
            let feedbacks = {
                owner,
                adminId,
                rate,
            }
            const response = await axios.post(APIfeedbacks, feedbacks)
            getFeedbacks(adminId)
        } catch (e) {
            console.log(e)
        }
    }

    // ! READ

    const getFeedbacks = async (adminId) => {
        try {
            const response = await axios(APIfeedbacks + '?adminId' + adminId)
            let action = {
                type: "GET_FEEDBACKS",
                payload: response.data
            }
            dispatch(action)
        } catch (e) {
            console.log(e)
        }
    }

    // ! UPDATE 

    const getFeedbacksToEdit = async (id) => {
        try {
            const response = await axios(`${APIfeedbacks}/${id}`)
            let action = {
                type: "GET_FEEDBACKS_TO_EDIT",
                payload: response.data
            }
        } catch (e) {
            console.log(e)
        }
    }

    const saveEditedFeedbacks = async (editedFeedbacks) => {
        try {
            const response = await axios.patch(`${APIfeedbacks}/${editedFeedbacks.id}`, editedFeedbacks)
            getFeedbacks(editedFeedbacks.adminId)
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <feedbackContext.Provider value={{
            addFeedback: addFeedback,
            getFeedbacks: getFeedbacks,
            getFeedbacksToEdit: getFeedbacksToEdit,
            saveEditedFeedbacks: saveEditedFeedbacks,
            feedbacks: state.feedbacks,
            feedbacksToEdit: state.feedbacksToEdit,
        }}>
            {props.children}
        </feedbackContext.Provider>
    );
};

export default FeedbackContextProvider;