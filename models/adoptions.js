const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const adoptionSchema = new Schema({
    firstName: String,
    lastName: String,
    age: Number,
    address: String,
    cityStateZip: String, 
    phoneNumber: Number,
    personOfReference: String,
    DoYouLiveInA: String,
    adoptionFee: Number,
    primaryCaregiver: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Adoption', adoptionSchema);