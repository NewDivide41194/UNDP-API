let express = require('express')
const bodyParser = require('body-parser')
const path = require('path');

let app = express()
// let personRoute = require('./routes/person')
// app.use(personRoute)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'))

const PORT  = process.env.PORT || 3001
app.listen(PORT,()=> console.log(`Server has started on ${PORT}`))