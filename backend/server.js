const express = require('express')
require("dotenv").config()
const workoutRouter = require('./router/workRouter')
const app = express()
const mongoose = require("mongoose")

// midddleware
app.use(express.json()) // checks for post body => json
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})


// routing 
app.use("/api/workouts", workoutRouter)

//connecting to the db 
mongoose.connect(process.env.MONGO_URL)
    .then((res => {
        // listenting for port
        app.listen(process.env.PORT, () => {
            console.log("connected to the database ", process.env.PORT)
        })
    }))
    .catch(err => {
        console.log(err);
    })






