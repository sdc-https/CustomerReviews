const axios = require('axios');
const faker = require('faker');
const config = require('../couchconfig.js');
const averageReviewsUrl = `http://${config.username}:${config.password}@localhost:5984/averagereviews/_bulk_docs`;
const reviewsUrl = `http://${config.username}:${config.password}@localhost:5984/reviews/_bulk_docs`

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
        _id : productId.toString(),
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

const seedReviews = async () => {
  let productNum = 1;
  let id = 0;
  for (let j = 1; j <= 10000; j++) {
    let records = [];
    for (let k = 1; k <= 1000; k++) {
      let numberOfReviews = Math.floor(Math.random() * 7 + 1)
      for (let i = 0; i < numberOfReviews; i++) {
        let newReview = {
           productId : productNum,
           userName : faker.internet.userName(),
           rating : faker.datatype.number(5),
           title : faker.lorem.words(),
           location : faker.address.country(),
           reviewDate : faker.date.past(),
           reviewBody : faker.lorem.paragraph(),
           helpfulCount : faker.datatype.number(2000),
           abuseReported : faker.datatype.boolean()
        }
        records.push(newReview);
    }
    productNum++;
  }
  await axios.post(`${reviewsUrl}`, {docs: records})
  .then(() => {
    console.log('SUCCSEFULLY ADDED ' + (productNum - 1) + ' RECORDS TO REVIEW DATABASE');
  })
  .catch((error) => {
    console.log('ERROR LOADING REVIEWS DATABASE', error);
  })
    }
  }
  module.exports.seedAverageReviews = seedAverageReviews;
  module.exports.seedReviews = seedReviews;

  require('make-runnable');


