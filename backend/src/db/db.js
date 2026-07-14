const dns = require("dns")
dns.setServers(["8.8.8.8", "8.8.4.4"])
const moongose = require('mongoose')

async function connectDB() {
    try {
        await moongose.connect(process.env.MONGO_URI)
        console.log("DB connected")
    } catch (error) {
        console.log("Database connection error:", error)
    }
}

module.exports = connectDB