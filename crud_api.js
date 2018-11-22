const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// app.use(bodyParser.json())


// Constants
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'inventory'
})

const hostname = 'localhost'
const port = 8001

// ----ROUTES---- //

// GET METHODS

// get all inventory
app.get("/api/inventory", (req, res) => {

    connection.query("SELECT * FROM items", (err, rows, fields) => {
        console.log("Successfully fetched items")
        res.json(rows)
    })
})

// get specific inventory with id
app.get("/api/inventory/:id", (req, res) => {
    const id = req.params.id
    const query = "SELECT * FROM items WHERE id = ?"

    connection.query(query,  [id], (err, rows, fields) => {
        console.log("Successfully fetched item")
        res.json(rows)
    })

})

// POST METHODS
// Add item to inventory
app.post("/api/inventory", (req, res) => {

    const newItem = req.body
    const id = newItem.id
    const name = newItem.name
    const qty = newItem.qty
    const amount = newItem.amount

    console.log("Connected!");
    const query = "INSERT INTO items (id, name, qty, amount) VALUES (?, ?, ?, ?)";

    connection.query(query, [name, qty, amount], (err, rows ,result) => {
        if (err) throw err;
        console.log("1 record inserted");
        res.end(JSON.stringify(newItem, null, 4))
    })
})

// PUT METHOD
app.put("/api/inventory/:id", (req, res) => {
    const itemId = req.params.id
    var item = []
    const query1 = "SELECT * FROM items WHERE id = ?"

    connection.query(query1,  [itemId], (err, rows, fields) => {
        console.log("Successfully fetched item")
        for (var i of rows)
            item.push(i)
            console.log(item[0].id)

            const keys = Object.keys(req.body)
            console.log(req.body)

            keys.forEach(key => {
                console.log(item[0])
                item[0][key] = req.body[key]
            })

            const query2 = "UPDATE items SET name = ?, qty = ?, amount = ? WHERE id = ?";
            connection.query(query2, [item[0].name, item[0].qty, item[0].amount, item[0].id], (err, rows, fields) => {
                if (err) throw err;
                console.log("Record Updated");
                res.end(JSON.stringify(item[0], null, 4))
            })
            // res.end(JSON.stringify(item[0], null, 4))
    })
})

// DELETE METHOD


// listen on localhost:8001
app.listen(port, hostname,() => {
    console.log("Server is running at localhost:8001")
})
