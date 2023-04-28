const ToDo = require('../models/ToDo');

const getList = async (req, res) => {
    try {
        const result = await ToDo.find();
        res.json(result);
    }
    catch (err) {
        console.log(err);
    }
}
const createList = async (req, res) => {
    try {
        const result = await ToDo.create({
            title: req.body.title,
            priority: req.body.priority,
            isCompleted: req.body.isCompleted
        });
        console.log(result);
        res.status(200).send(result);
    }
    catch (err) {
        console.log(err);
    }
}

const updateList = async (req, res) => {
    try {
        const item = await ToDo.findOne({ _id: req.body.id }).exec();

        if (!item) {
            res.status(404).send("No item found")
            return;
        }

        if (req.body.title)
            item.title = req.body.title;
        if (req.body.priority)
            item.priority = req.body.priority;
        
        const result = await item.save();

        res.status(202).json(result);
    }
    catch (err) {
        res.sendStatus(401);
    }
}

const deleteList = async (req, res) => {
    if (!req.body.id) {
      res.status(401).send("id required to delete");
      return;
    }
    try {
        const result = ToDo.deleteOne({ _id: req.body.id }).exec();
        res.status(200).send("deleted");

    }
    catch (err) {
        console.log(err);
    }
}

const getPriority = async (req, res) => {
    const priority = (req.params.priority).toString();
    const result = await ToDo.find({ priority: priority }).exec();
    res.json(result);
}

const updateComplete = async (req, res) => {
    

    try {
        const item = await ToDo.findOne({ _id: req.body.id }).exec();
        item.isCompleted = !item.isCompleted;

        const result = await item.save();

        res.status(200).json(result);
    }
    catch (err) {
        res.sendStatus(401);
    }
}

module.exports = {getList,createList,updateList,deleteList,getPriority,updateComplete};