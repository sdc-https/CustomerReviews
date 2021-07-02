const postgres = require('postgres');
const sql = postgres('postgresql://localhost:5432/reviews');
const faker = require('faker');


let count;

 let seedAvgReviews = async () => {

  await sql`
  CREATE TABLE IF NOT EXISTS averagereview (
    productId INT,
    totalreviews Int,
    averagereviews int
  )
  `

   for (let i = 1; i <= 10000000; i++) {
     count = i;
    let averageReviews = faker.datatype.number({
      'min': 1,
      'max': 5,
      precision: .1
  })
    let totalReviews = faker.datatype.number(3000);
    await sql`
    INSERT INTO averagereview VALUES (
      ${i}, ${totalReviews}, ${averageReviews}
      )
      `
      .catch((error) => {
        console.log('ERROR ADDING TO AVERAGE REVIEWS DATABASE', error)
      })
    }

    console.log('SUCCESSFULLY ADDED ' + count + ' RECORDS TO AVERAGE REVIEW DATABASE');



}

// seedAvgReviews();

let seedReviews = async () => {

  await sql`
  CREATE TABLE IF NOT EXISTS reviews (
    productId INT,
    USERNAME varchar(255),
    RATING INT,
    TITLE varchar(255),
    LOCATION varchar(255),
    REVIEWDATE DATE,
    REVIEWBODY TEXT,
    HELPFULCOUNT INT,
    ABUSEREPORTED BOOL
  );
  `
  .catch((error) => {
    console.log('ERROR SAVING TO REVIEWS DATABASE', error)
  })

  for (let j = 1; j <= 10000000; j++) {
    let numberOfReviews = Math.floor(Math.random() * 10 + 1)
    for (let i = 0; i < numberOfReviews; i++) {
      let productId = j;
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
      .catch((error) => {
        console.log('ERROR ADDING TO DATABASE', error)
      })
    }
  }
}


// seedReviews();