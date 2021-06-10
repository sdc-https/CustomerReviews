import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment'

const Reviews = (props) => (
  <div>
    <ul>
      {props.reviews.slice(0,10).map((review, i) => (
        <div className = "review-container" key = {i}>
          <div className = "review-username">
            <img className = "review-username_image" src="https://amazoncustomerreviews.s3.us-east-2.amazonaws.com/user_image.png" ></img> <div className = "review-username_text"> {review.userName} </div>
          </div>
          <div className = "review-title">
            {review.rating} out of 5 {review.title}
          </div>
          <div className = "location-date">Reviewed in {review.location} on {moment(review.reviewDate, 'YYYY-MM-DDThh:mm:ss.sss').format('MMMM Do, YYYY')}</div>
          <div className = "review-body">{review.reviewBody}</div>
          <div className = "helpful-count"> {review.helpfulCount} people found this helpful</div>
          <div> <button  data-testid = "helpful-button" className = "helpful-button">Helpful</button>  <span className = "abuse-text">|  Report Abuse</span> </div>
        </div>
      ))}
    </ul>
  </div>
);
export default Reviews;