const mongoose = require("mongoose")
const Schema = mongoose.Schema; 

const workScheme = new Schema({
    title : {
        type: String,
        required: true
    }, 
    cycles : {
        type: Number, 
        required: true
    }

}, {timestamps: true});


module.exports = mongoose.model("Work", workScheme)