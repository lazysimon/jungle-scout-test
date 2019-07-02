const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product = new Schema({
    asin: { type: String },
    productDimensions: { type: String },
    rank: { type: String },
    category: { type: String }
});

module.exports = mongoose.model('Products', product);