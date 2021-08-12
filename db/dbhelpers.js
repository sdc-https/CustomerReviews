const postgres = require('postgres');
const env = require('../config.env')
const sql = postgres(`postgresql://jordanace:${env.PostgresPW}@3.139.18.46:5432/postgres`);
const faker = require('faker');


if(sql) {
  console.log('CONNECTED TO POSTGRES DATABASE')
} else {
  console.log('ERROR CONNECTED TO POSTGRES DATABASE');
}

//Get All Reviews for Given Product ID
let getReviews = async (productId) => {
  console.log('get reviews is running');
  console.log(productId);
  return await sql `
  SELECT * FROM reviews WHERE productid = ${productId};
  `
  .then((reviews) => {
    console.log(reviews);
    return reviews;
  })
  .catch((error) => {
    console.log(`ERROR GETTING REVIEWS FOR PRODUCT ID ${productId}`);
  })
}

//Get Average Reviews for Given Product ID
let getAverageReviews = async (productId) => {
  console.log('get average reviews is running');
  console.log(productId);
  return await sql `
  SELECT * FROM averagereview WHERE productid = ${productId};
  `
  .then((reviews) => {
    console.log(reviews);
    return reviews;
  })
  .catch((error) => {
    console.log(`ERROR GETTING AVERAGE REVIEWS FOR PRODUCT ID ${productId}`);
  })
}

//Post New Review for Given Product ID
let postReviews = async () => {

  let productId = Math.floor(Math.random() * (100000000 - 10000001) + 10000001);
  let userName = faker.internet.userName();
  let rating = faker.datatype.number(5);
  let title = faker.lorem.words();
  let location = faker.address.country();
  let reviewDate = faker.date.past();
  let reviewBody = faker.lorem.paragraph();
  let helpfulCount = faker.datatype.number(2000);
  let abuseReported = faker.datatype.boolean();


  await sql`
      INSERT INTO reviews VALUES (
        ${productId}, ${userName}, ${rating}, ${title}, ${location}, ${reviewDate}, ${reviewBody}, ${helpfulCount}, ${abuseReported}
        )
      `
}

//Update Review for Given Product ID
let putReviews = (productId, data) => {
  console.log('Updating database', data);
  return Review.findOneAndUpdate({productId}, data, {upsert: true})
  .then((response) => {
    console.log('Update Response', response)
  })
  .catch((err) => {
    console.log('Error in Update Response', err)
  })
}

//Delete Reviews for Given Product ID
let deleteReview = async (productId) => {
  console.log('delete review is running');
  console.log(productId);
  return await sql `
  DELETE FROM reviews WHERE productid = ${productId};
  `
  .then((reviews) => {
    console.log(reviews);
    return reviews;
  })
  .catch((error) => {
    console.log(`ERROR DELETING REVIEWS FOR PRODUCT ID ${productId}`);
  })
}

module.exports.deleteReview = deleteReview;
module.exports.putReviews = putReviews;
module.exports.postReviews = postReviews;
module.exports.getReviews = getReviews;
module.exports.getAverageReviews = getAverageReviews;
module.exports.sql = sql;
