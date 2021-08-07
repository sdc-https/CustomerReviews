import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment'

const Reviews = (props) => (
  <div>
    <ul>
      {props.reviews.map((review, i) => (
        <div className = "review-container" key = {i}>
          <div className = "review-username">
            <img className = "review-username_image" src="http://localhost:3004/user_image.png" ></img> <div className = "review-username_text"> {review.username} </div>
          </div>
          <div className = "review-title">
            {review.rating} out of 5 {review.title}
          </div>
          <div className = "location-date">Reviewed in {review.location} on {moment(review.reviewdate, 'YYYY-MM-DDThh:mm:ss.sss').format('MMMM Do, YYYY')}</div>
          <div className = "review-body">{review.reviewbody}</div>
          <div className = "helpful-count"> {review.helpfulcount} people found this helpful</div>
          <div> <button  data-testid = "helpful-button" className = "helpful-button">Helpful</button>  <span className = "abuse-text">|  Report Abuse</span> </div>
        </div>
      ))}
    </ul>
  </div>
);
export default Reviews;