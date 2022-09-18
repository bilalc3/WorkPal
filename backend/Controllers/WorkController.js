const mongoose = require("mongoose")
const Work = require("../Models/WorkModel.js")


// getting all works 
const getWorks = async (req, res) => {
    const works = await Work.find({}).sort({createdAt: -1})
    res.status(200).json(works)

}


// getting a single work 
const singleWork = async(req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such work found"})
    }
    const work = await Work.findById(id)

    if (!work) {
        return res.status(404).json({error: "No work found"})
    }

    res.status(200).json(work)
}

// adding a new work
const postController = async (req, res) => {
    const {title, cycles} = req.body
    try {
        const work = await Work.create({title, cycles})
        res.status(200).json(work)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a work 
const deleteWork = async (req, res) => {
    const {id} = req.params 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such work found"})
    }

    const work = await Work.findOneAndDelete({_id: id})

    if (!work) {
        return res.status(404).json({error: "Have no such work"})
    }

    res.status(200).json(work)
}

// update work 
const updateWork = async(req, res) => {
    const {id} = req.params 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such work found"})
    }

    const work = await Work.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!work) {
        return res.status(404).json({error: "Have no such work"})
    }

    res.status(200).json(work)
}


module.exports = {
    postController, 
    getWorks, 
    singleWork, 
    deleteWork, 
    updateWork
}