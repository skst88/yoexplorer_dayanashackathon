import React, { useEffect, useReducer, useState } from "react"
import { APIcomments } from "../config/const";
import axios from 'axios';

export const commentsContext = React.createContext()
const INIT_STATE = {
    comments: [],
    commentToEdit: null,
}
const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_COMMENTS_FOR_ROOM":
            return { ...state, comments: action.payload }
        case "GET_COMMENTS_TO_EDIT":
            return { ...state, commentToEdit: action.payload }
        default:
            return state
    }
}

const CommentContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)


    // ! CREATE 

    const addComments = async (text, owner, doctorId, createdAt,
        createdAtMs) => {

        try {
            let comment = {
                text,
                owner,
                doctorId,
                createdAt,
                createdAtMs,
            }
            const response = await axios.post(APIcomments, comment)
            getCommentsForRoom(doctorId)
        } catch (e) {
            console.log(e)
        }
    }

    // ! READ  

    const getCommentsForRoom = async (doctorId) => {
        try {
            const response = await axios(APIcomments + '?doctorId=' + doctorId)
            let action = {
                type: "GET_COMMENTS_FOR_ROOM",
                payload: response.data
            }
            dispatch(action)
        } catch (e) {
            console.log(e)
        }
    }

    // ! UPDATE  

    const getCommentToEdit = async (id) => {
        try {
            const response = await axios(` 
                ${APIcomments}/${id}`)
            let action = {
                type: "GET_COMMENTS_TO_EDIT",
                payload: response.data,
            }
            dispatch(action)
        } catch (e) {
            console.log(e)
        }
    }


    const saveEditedComment = async (editedComment, id) => {
        try {

            const response = await axios.patch(`${APIcomments}/${id}`, editedComment)
            getCommentsForRoom(editedComment.doctorId)
            // clearState()
        } catch (e) {
            console.log(e)
        }

    }


    const deleteComment = async (comment) => {
        try {
            await axios.delete(`${APIcomments}/${comment.id}`)
            getCommentsForRoom(comment.doctorId)
        } catch (e) {
            console.log(e);
        }
    }



    return (<commentsContext.Provider value={
        {
            addComments,
            getCommentsForRoom,
            getCommentToEdit,
            deleteComment,
            saveEditedComment,
            comments: state.comments,
            commentToEdit: state.commentToEdit,
            state,

        }
    } > {props.children} </commentsContext.Provider>)
}


export default CommentContextProvider;