import React, { useContext, useEffect } from "react";
import { BsFillHeartFill } from "react-icons/bs";
import { useParams } from "react-router";
import { likesContext } from "../../contexts/LikesContext";
const Likes = () => {
  const { getLikes, likes, addLike, saveEditedLikes } =
    useContext(likesContext);
  const params = useParams();
  useEffect(() => {
    getLikes(params.id);
  }, []);
  let user = JSON.parse(localStorage.getItem("user"));
  let idFeedTemp,
    checkFeed,
    myRate = 0;
  let count = 0;
  let avgRate = 0;

  if (likes) {
    // console.log(likes);
    likes.forEach((item) => {
      if (
        item.productId === params.id &&
        item.owner === user.email
      ) {
        idFeedTemp = item.id;
        checkFeed = true;
        myRate = item.rate;
      }
      if (item.productId === params.id) {
        count++;
        avgRate += item.rate;
      }
    });
  }
  const handleRating = () => {
    if (checkFeed) {
      let editRate = {
        owner: user.email,
        productId: params.id,
        rate: myRate === 1 ? 0 : 1,
        id: idFeedTemp,
      };
      saveEditedLikes(editRate);
    } else {
      addLike(user.email, params.id, 1);
    }
  };
  return (
    <>
      {likes ? (
        <>
          <BsFillHeartFill
            style={{
              color: myRate === 1 ? "red" : "pink",

              fontSize: "30px",
              marginLeft: "10px",
              cursor: "pointer",
            }}
            onClick={handleRating}
          />
          <span style={{ marginLeft: "5px", fontSize: "25px" }}>
            {likes.filter((item) => item.rate === 1).length}
          </span>
        </>
      ) : (
        <h2>Load</h2>
      )}
    </>
  );
};
export default Likes;
