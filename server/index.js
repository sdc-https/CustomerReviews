const express = require('express')
const app = express()
const port = 3004
const path = require('path')
const db = require('../db/dbhelpers')
const cors = require('cors')

app.use(express.static(path.join(__dirname, "..", "public")))
app.use(cors());
// app.use( (req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
//   next();
// });

app.listen(port, ()=>{
  console.log(`Server now listening at http://localhost:${port}`)
})

app.get('/reviews/:productid', function(req, res) {
  return db.getReviews(req.params.productid)
    .then((reviews) => {
      res.send(reviews);
    })
})

app.get('/averagereview/:productid', function(req, res) {
  return db.getAverageReviews(req.params.productid)
    .then((score) => {
      res.send(score);
    })
})

app.get('/dp/:productid', function(req, res) { //refactor to include /dp/:productid
  console.log(req)
  res.sendFile(path.join(__dirname, '/../public/Index.html'))
})