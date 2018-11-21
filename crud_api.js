//load server using express
const express = require('express')
const app = express()
const mysql = require('mysql')

// ----ROUTES---- //

// GET METHODS

// get all inventory
app.get("/inventory", (req, res) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'inventory'
    })
    connection.query("SELECT * FROM items", (err, rows, fields) => {
        console.log("Successfully fetch items")
        res.json(rows)
    })
})

// get specific inventory with id
app.get("/inventory/:id", (req, res) => {
    const id = req.params.id
    const query = "SELECT * FROM items WHERE id = ?"
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'inventory'
    })

    connection.query(query,  [id], (err, rows, fields) => {
        console.log("Successfully fetch item")
        res.json(rows)
    })
    
})

// POST METHOD
// PUT METHOD
// DELETE METHOD


// listen on localhost:8001
app.listen(8001, () => {
    console.log("Server is up 8001...")
})
