import React, { useContext, useEffect, useState } from 'react'
import { FormControl, InputGroup, Button, Card } from 'react-bootstrap';
import { useParams } from 'react-router'
import { commentsContext } from '../../contexts/commentsContext';
import CommentBody from './CommentBody';
const Comment = (props) => {
    const { addComments, getCommentsForRoom, getCommentToEdit, saveEditedComment, deleteComment, comments } = useContext(commentsContext)
    const [comment, setComment] = useState('')
    function handleChange(e) {
        setComment(e.target.value)
    }
    function handleDelete(com) {
        deleteComment(com)
    }
    const params = useParams()
    useEffect(() => {
        getCommentsForRoom(params.id)
    }, [])
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    function creatingComment(e) {
        e.preventDefault()
        let time = new Date();
        let timeMls = Date.now();
        addComments(comment, user.username, params.id, time, timeMls)
        setComment('')
    }
    let commenting
    const [bool, setBool] = useState(false)
    const [editComm, setEditComm] = useState('')
    function handleChangeEdit(e) {
        setEditComm(e.target.value)
    }
    function saveComment(item) {
        saveEditedComment(editComm, item.id)
        setBool(false)
    }
    function handleEdit(item) {
        setBool(true)
        commenting = <><InputGroup className="mb-3 createComment">
            <FormControl
                rows={2}
                as="textarea"
                placeholder="Drop a comment"
                maxLength="140"
                onChange={handleChangeEdit}
                value={comment}
            />
            <Button style={{ backgroundColor: '#324873', border: 'none' }} onClick={creatingComment}>
                Submit
            </Button>
        </InputGroup><Button onClick={() => saveComment(item)}>Save</Button></>
        getCommentToEdit(item.id)
    }
    return (
        <>
            {
                user.type === 'user' ? (
                    <div className='mt-4 container'>
                        <InputGroup className="mb-3 createComment">
                            <FormControl
                                rows={2}
                                as="textarea"
                                placeholder="Leave review"
                                maxLength="140"
                                onChange={handleChange}
                                value={comment}
                            />
                            <Button style={{ backgroundColor: '#324873', border: 'none' }} onClick={creatingComment}>
                                Submit
                            </Button>
                        </InputGroup>

                    </div>
                ) : (
                    <></>
                )
            }

            <div className="mt-4 container bg-secondary">
                {
                    comments ? (comments.sort((a, b) => b.createdAtMs - a.createdAtMs).map(item => (
                        <CommentBody key={item.id} item={item} admin={params} />
                    ))) : (<h2>Loading...</h2>)
                }

            </div>
        </>
    )
};

export default Comment;