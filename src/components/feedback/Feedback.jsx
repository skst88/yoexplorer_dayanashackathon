import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Rating } from 'react-simple-star-rating'
import { feedbackContext } from '../../contexts/feedbackContext';

const Feedback = (props) => {
    const [rating, setRating] = useState(0)
    const { getFeedbacks, feedbacks, addFeedback, getFeedbacksToEdit, feedbacksToEdit, saveEditedFeedbacks } = useContext(feedbackContext)
    const params = useParams()
    useEffect(() => {
        getFeedbacks(params.id)
    }, [])

    let user = JSON.parse(localStorage.getItem('user'))
    let avgRate = 0
    feedbacks ? (feedbacks.forEach(element => {
    })
    ) : (<></>)
    let idFeedTemp, checkFeed, myRate
    let count = 0
    feedbacks ? (avgRate /= feedbacks.length) : (<></>)

    if (feedbacks) {
        feedbacks.forEach(item => {
            if (item.adminId === params.id && item.owner === user.username) {
                idFeedTemp = item.id
                checkFeed = true
                myRate = item.rate
            }
            if (item.adminId === params.id) {
                count++
                avgRate += item.rate
            }
        })
    }
    avgRate /= count
    if (count === 0) {
        avgRate = 0
    }
    const handleRating = (rate) => {
        setRating(rate)
        if (checkFeed) {
            let editRate = {
                owner: user.username,
                adminId: params.id,
                rate: rate,
                id: idFeedTemp,
            }
            saveEditedFeedbacks(editRate)
        } else {
            addFeedback(user.username, params.id, rate)
        }
    }

    return (
        <div style={{ marginTop: '30px' }}>
            {
                user.type === 'user' ? (
                    <Rating onClick={handleRating} ratingValue={myRate} />
                ) : (
                    <></>
                )
            }
            <p style={{ color: '#9E9E9E', justifyContent: 'space-between', width: '400px' }}>Rating of picture: ({(Math.round(avgRate * 10) / 10)}), number of reviews ({feedbacks ? count : 0}) </p>
        </div>
    );
};

export default Feedback;