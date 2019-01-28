const express = require('express')

let app = express()
const helmet = require("helmet")
app.use(helmet())

const mysql = require("mysql")
const config = require("./config")
let connection = mysql.createConnection(config.db)

connection.connect()
app.set('views','views')
app.set('view engine','ejs')

app.use(express.static('public'))

app.get('/',(req,res,next)=>{
    res.render('index',{})
})

console.log("App is listening on port 8282")

app.listen(8282)