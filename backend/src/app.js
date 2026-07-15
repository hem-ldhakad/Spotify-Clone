const express = require('express')
const cors = require("cors");
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.route.js')
const musicRoutes = require("./routes/music.routes.js")

const app = express()

app.use(cors({
    origin: "http://localhost:3001",
    credentials: true
}));


app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/music', musicRoutes)

module.exports = app
