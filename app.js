const express = require("express")
const dotenv = require("dotenv").config()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const connectDatabase = require("./db/db")
const port = process.env.port || 7070

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//if express.json() use kiya hai to body parser ko use krene ki jarurat nhi hoti hai 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

const mainRoutes = require("./router/mainRoutes");
const exp = require("constants");

app.use("/v1", mainRoutes)

//Database connect
connectDatabase()


app.listen(port, () => {
    console.log(`Express servier is running at http://localhost:${port}`)
})