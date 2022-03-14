const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const destinationSchema = new Schema({
    airport: {type: String, enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']},
    arrival: Date,
  }, {
    timestamps: true
  });

const flightSchema = new Schema({
    airline: {type: String, default: 'American', enum: ['American', 'Southwest', 'United']},
    airport: {type: String, default: 'DEN', enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']},
    flightNo: {type: Number, min: 10, max: 9999},
    departs: {type: Date, default: new Date(new Date().setFullYear(new Date().getFullYear() + 1))}, 
    destinations: [destinationSchema],
}, {
    timestamps: true
});

module.exports = mongoose.model('Flight', flightSchema);