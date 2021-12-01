import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { pictureContext } from "../contexts/pictureContext";
import { Button } from "react-bootstrap";
import Feedbacks from "../components/feedback/Feedback";
// import RecommendItems from "../components/RecommendItems";
import Comment from "../components/comments/Comment";
import Likes from "../components/likes/Likes";

const AllAboutOnePicture = () => {
    const {
        getPicturesToEdit,
        pictureToEdit,
        checkPictureInCart,
        addAndDeletePictureInCart,
        checkPictureInFavorites,
        addAndDeletePictureInFavorites,
    } = useContext(pictureContext);
    const params = useParams();
    useEffect(() => {
        getPicturesToEdit(params.id);
    }, []);
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="container" style={{ height: '100%' }}>
                {pictureToEdit ? (
                    <div style={{ display: "flex" }}>
                        <div>
                            <img width="500px" src={pictureToEdit.image} alt="product" />
                        </div>
                        <div style={{ marginLeft: '60px', width: '300px' }}>
                            <h2><h2 style={{ color: '#D0D0D0' }}>Name of picture:</h2> {pictureToEdit.name}</h2>
                            <h3><h3 style={{ color: '#D0D0D0' }}>Category of picture:</h3> {pictureToEdit.category}</h3>
                            <p><p style={{ color: '#D0D0D0' }}>Price:</p> {pictureToEdit.price} USD</p>

                            <div
                                style={{
                                    marginBottom: "-10px",
                                    width: "290px",
                                    // borderRadius: "80%",
                                    // height: "30px",
                                    // display: "inline-block",
                                }}
                            ></div>
                            <br />
                            <br />
                            <>
                                <Button
                                    style={{ marginRight: "10px", backgroundColor: '#324873', border: 'none' }}
                                    variant={
                                        checkPictureInCart(pictureToEdit.id) ? "danger" : "primary"
                                    }
                                    onClick={() => addAndDeletePictureInCart(pictureToEdit)}
                                >
                                    Cart
                                </Button>
                                <Button
                                    style={{ backgroundColor: '#324873', border: 'none' }}
                                    variant={
                                        checkPictureInFavorites(pictureToEdit.id)
                                            ? "danger"
                                            : "primary"
                                    }
                                    onClick={() => addAndDeletePictureInFavorites(pictureToEdit)}
                                >
                                    Favorites
                                </Button>
                                <Feedbacks />
                                <Likes />
                            </>
                        </div>
                    </div>
                ) : (
                    <h2>Loading</h2>
                )}

                {/* <RecommendItems /> */}
            </div>
            <Comment />
        </div>
    );
};

export default AllAboutOnePicture;