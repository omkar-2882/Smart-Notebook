// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  console.log("Loading Environments variables!")
  require("dotenv").config({ path: "config/config.env" });
}

const path = require("path");
const connectToMongo = require('./db')
const express = require('express')

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

app.get("/", (req,res) => {
  res.send("okay")
})

const server = app.listen(port, () => {
  console.log(`Server is working on http://localhost:${port}`);
});
