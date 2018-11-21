//load server using express
const express = require('express')
const app = express()

// ----ROUTES---- //

// GET METHOD
app.get("/inventory", (req, res) => {
    console.log("Responding to rout route")
    res.send("Hello")
})

// POST METHOD
// PUT METHOD
// DELETE METHOD


// localhost:8001
app.listen(8001, () => {
    console.log("Server is up 8001...")
})
