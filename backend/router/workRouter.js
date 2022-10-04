const express = require('express')
const Work = require("../Models/WorkModel.js")
const mongoose = require("mongoose")
const {postController, singleWork, getWorks, deleteWork, updateWork} = require("../Controllers/WorkController")
const requireAuth = require("../middleware/requireAuth")

const router = express.Router()
//middleware to requrie authorizaion before routes
router.use(requireAuth)

// getting all works
router.get("/", getWorks)

// getting speific work
router.get("/:id", singleWork)


// posting a new work
router.post("/", postController)

// deleting a work 
router.delete("/:id", deleteWork)

// updating a blog
router.patch("/:id", updateWork)

module.exports = router; 