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
    const animalQuery = `SELECT * FROM animals;`
    connection.query(animalQuery,(error,results)=>{
        const rand = Math.floor(Math.random() * results.length)
        res.render('index',{animal:results[rand]})
    })
    
})

app.get('/vote/:value/:id',(req,res,next)=>{
    const value = req.params.value 
    const id = req.params.id
    const insertQuery = `INSERT INTO votes (id,aid,value)
    VALUES (DEFAULT,?,?)`
    connection.query(insertQuery,[id,value],(error,results)=>{
        if (error){throw error}
        res.redirect('/')
    })
})
console.log("App is listening on port 8282")

app.listen(8282)