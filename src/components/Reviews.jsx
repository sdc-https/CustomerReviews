import React from 'react';
import ReactDOM from 'react-dom';

const Reviews = (props) => (
  <div>
    <ul>
      {props.reviews.map((review, i) => (
        <div>
          <div>
            image placeholder {review.userName}
          </div>
          <div>
            rating placeholder {review.title}
          </div>
          <div>Reviewed in {review.location} on {review.reviewDate}</div>
          <div>{review.reviewBody}</div>
        </div>
      ))}
    </ul>
  </div>
);


export default Reviews;