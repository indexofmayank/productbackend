const mongoose = require('mongoose');

const productSchema = mongoose.Schema({

    name: {
        type: String,
        require: true
    },

    product_status: {
        type: Boolean,
        require: true
    },

    category: {
        type: mongoose.Types.ObjectId,
        require: true
    },

    add_ons: {
        type: String,
        require: true
    },

    search_tags: {
        type: String,
        require: true
    },

    price: {
        type: String,
        require: true
    },

    sku: {
        type: String,
        require: true
    },

    barCode: {
        type: String,
        require: false
    },

    tax: {
        type: String,
        require: true
    },

    description: {
        type: String,
        require: true
    },

    featured: {
        type: Boolean,
        require: true
    }


});

module.exports = mongoose.model('Product', productSchema);