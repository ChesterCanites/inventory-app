const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
    extended: false
}))

// app.use(bodyParser.json())


// Constants
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'inventory'
})

// ----ROUTES---- //

// GET METHODS

// get all inventory
app.get("/inventory", (req, res) => {

    connection.query("SELECT * FROM items", (err, rows, fields) => {

        console.log("Successfully fetched items")
        res.json(rows)
    })
})

// get specific inventory with id
app.get("/inventory/:id", (req, res) => {
    const id = req.params.id
    const query = "SELECT * FROM items WHERE id = ?"

    connection.query(query,  [id], (err, rows, fields) => {
        console.log("Successfully fetched item")
        res.json(rows)
    })

})

// POST METHODS
// Add item to inventory
app.post("/create_item", (req, res) => {
    // connection.connect(function(err) {
    //   if (err) throw err;
    //
    //   const name = req.body.name
    //   const qty = req.body.qty
    //   const amount = req.body.amount
    //   console.log("Connected!");
    //   const sql = "INSERT INTO items (name, qty, amount) VALUES (?, ?, ?)";
    //
    //   connection.query(sql, [name, qty, amount], (err, result) => {
    //     if (err) throw err;
    //     console.log("1 record inserted");
    //     res.json(result)
    //   })
    // })
    const newItem = req.body
    const name = req.body.name
    const qty = req.body.qty
    const amount = req.body.amount

    console.log("Connected!");
    const query = "INSERT INTO items (name, qty, amount) VALUES (?, ?, ?)";

    connection.query(query, [name, qty, amount], (err, rows ,result) => {
        if (err) throw err;
        console.log("1 record inserted");
        res.end("Post Successfully: \n" + JSON.stringify(newItem, null, 4))
    })


    // console.log('creating an item')
    // console.log(item)
    // res.end()
})

// PUT METHOD
// DELETE METHOD


// listen on localhost:8001
app.listen(8001, () => {
    console.log("Server is up 8001...")
})
