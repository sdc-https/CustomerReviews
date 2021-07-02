const axios = require('axios');
const faker = require('faker');
const config = require('../couchconfig.js');
const averageReviewsUrl = `http://${config.username}:${config.password}@localhost:5984/averagereviews/_bulk_docs`;
const reviewsUrl = `http://localhost:5984/reviews`;

const seedAverageReviews = async () => {
  let productId = 0;
  for (let i = 1; i <= 1000; i++) {
    let records = [];
    for (let j = 1; j <= 10000; j++) {
      productId++;
      let totalReviews = faker.datatype.number(3000);
      let averageReviews = faker.datatype.number({
        'min': 1,
        'max': 5,
        precision: .1
      })
      let avgReview = {
        productId : productId,
        totalReviews: totalReviews,
        averageReviews: averageReviews
      }
      records.push(avgReview);
    }
    await axios.post(`${averageReviewsUrl}`, {docs: records})
   .then(() => {
     console.log('SUCCSEFULLY ADDED ' + productId + ' RECORDS TO AVERAGE REVIEW DATABASE');
   })
   .catch((error) => {
     console.log('ERROR LOADING AVERAGE REVIEWS DATABASE', error);
   })
  }

}

seedAverageReviews();
