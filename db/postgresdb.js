const postgres = require('postgres');
const sql = postgres('postgresql://localhost:5432/reviews');
const faker = require('faker');


let count;

 let seedPostgres = async () => {

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
        console.log('ERROR ADDING TO DATABASE', error)
      })
    }

    console.log('SUCCESSFULLY ADDED ' + count + ' RECORDS TO AVERAGE REVIEW DATABASE');

  await sql`
  CREATE TABLE IF NOT EXISTS reviews (
    productId SERIAL,
    USERNAME varchar(255),
    RATING INT,
    TITLE varchar(255),
    LOCATION varchar(255),
    REVIEWDATE DATE,
    REVIEWBODY varchar(255),
    HELPFULCOUNT INT,
    ABUSEREPORTED BOOL,
    PRIMARY KEY (productId)
  );
  `
  await sql`
  CREATE TABLE IF NOT EXISTS averagereview (
    productId INT,
    totalreviews Int,
    averagereviews int
  )
  `
}

seedPostgres();