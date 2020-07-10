const mongoose = require('mongoose');
const TaskSschema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    _listId: {
        type:mongoose.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    }
})

const Task = mongoose.model('Task', TaskSschema);
module.exports = Task;