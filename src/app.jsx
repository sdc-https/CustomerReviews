import React from 'react';
import ReactDOM from 'react-dom';
import Reviews from './components/Reviews.jsx';
import $ from 'jquery';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      productId: window.location.pathname.split("/")[2] || "1",
      reviews: [],
      score: 0
    };
    this.setReviewsFeed = this.setReviewsFeed.bind(this);
    this.proxyip = '3.131.237.78';
  }

  setReviewsFeed (data) {
    this.setState({
      reviews: data,
    })
  }


  componentDidMount() {
    let product = new URL(window.location);
    $.ajax({
      method: 'GET',
      url: `http://${this.proxyip}/reviews/` + this.state.productId,
      success: (data, res) => {
        console.log(`REVIEWS ON COMPONENT DID MOUNT, ${data} `)
        this.setReviewsFeed(data);
      }
    })
  }

  render() {
    return (
      <div className = "Customer-Reviews">
        <Reviews className = "reviews-container" reviews={this.state.reviews}/>
      </div>
    )
  }
}


export default App;