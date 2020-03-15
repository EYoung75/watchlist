import React from "react";

const Review = props => {
  return (
    <div className="reviews">
      {props.reviews.map(review => (
        <div className="reviews__review">
          <h4>Author: {review.author}</h4>
          <p>{review.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Review;
