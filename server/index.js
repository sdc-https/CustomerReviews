const express = require('express')
const app = express()
const port = 9001
const path = require('path')

app.use(express.static(path.join(__dirname, "..", "public")))

app.listen(port, ()=>{
  console.log(`Server now listening at http://localhost:${port}`)
})