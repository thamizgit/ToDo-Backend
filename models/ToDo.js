const mongoose = require('mongoose');

const toDoSchema = mongoose.Schema(
    {
        title: String,
        isCompleted: Boolean,
        priority: String
    }
)

module.exports = mongoose.model('ToDo', toDoSchema);