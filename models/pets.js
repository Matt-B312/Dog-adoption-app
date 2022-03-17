const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const petSchema = new Schema({
    name: String,
    age: Number,
    breed: String,
    characteristics: String, 
    coatLength: String,
    houseTrained: Boolean,
    health: String,
    goodInHome: Boolean,
    adoptionFee: Number,
    image: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Pet', petSchema);