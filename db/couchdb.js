const axios = require('axios');
const faker = require('faker');
const averageReviewsUrl = `http://localhost:5984/averagereviews`;
const reviewsUrl = `http://localhost:5984/reviews`;

const seedAverageReviews = async () => {
  for (let i = 1; i <= 10; i++) {
    let records = [];
    let productId = 0;
    for (let j = 1; j <= 10; j++) {
      productId++;
      let totalReviews = faker.datatype.number(3000);
      let averageReviews = faker.datatype.number({
        'min': 1,
        'max': 5,
        precision: .1
      })
      let avgReview = {
        productId : productId,
        totaleReivews: totalReviews,
        averageReviews: averageReviews
      }
      records.push(avgReview);
    }
  }
  axios.post(`${averageReviewsUrl}`, {averageReviews: records})
  .then(() => {
    console.log('SUCCSEFULLY ADDED ' + productId + ' RECORDS TO AVERAGE REVIEW DATABASE');
  })
  catch((error) => {
    console.log('ERROR LOADING AVERAGE REVIEWS DATABASE');
  })
}