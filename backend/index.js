// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config.env" });
}

const connectToMongo = require('./db')
const express = require('express')
const path = require("path");

var cors = require('cors') 

connectToMongo();

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.use(express.static(path.join(__dirname, "../build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../build/index.html"));
})

app.listen(port, () => {
  console.log(`Smart Notebook listening at http://localhost:${port}`)
})


