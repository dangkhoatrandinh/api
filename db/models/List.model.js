const mongoose = require('mongoose');
const ListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: new Date()
    }
})

const List = mongoose.model('List', ListSchema);
module.exports = List;