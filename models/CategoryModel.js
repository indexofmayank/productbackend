const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },

    status: {
        type: Boolean,
        require: true
    }
});

module.exports = mongoose.model('Category', categorySchema);