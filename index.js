const express = require('express')
const app = express()
require('dotenv').config()
const port = 3000;

app.set('view engine', 'pug')


const route = require('./api/routes/service.route')


app.use('/route', route)

app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
  })

app.get('/', function (req, res) {
  res.render('myHome')
})

app.get('/routing',function(req,res){
  res.render('routing')
})

app.get('/isoline',(req,res)=> {
  res.render('isoline')
})




