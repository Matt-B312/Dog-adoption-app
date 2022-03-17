const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        minlength: [3, 'First Namemmust be more than 3 characters'],
        maxlength: [99, 'this is too much....chill']
    },
    lastName: {
        type: String,
        required: true,
        minlength: [3, 'First Namemmust be more than 3 characters'],
        maxlength: [99, 'this is too much....chill']
    },
    emailAddress: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    
},
    password: {
        type: String,
        required: true,
        minlength: [6, 'your passwrod should be at least 6 characters']
        
        
    },
    age: Number,
    address: String,
    cityStateZip: String, 
    phoneNumber: Number,
    personOfReference: String,
    DoYouLiveInA: String,
    adoptionFee: Number,
    primaryCaregiver: String,
    petsAdopted:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet'
    }]
    //userRole:{
        //type: String
        //enum: ['admin', 'regular', 'superAdmin]
        //default: 'regular
    //}
},
    {
    timestamps: true
    })

    //verify password
    userSchema.methods.verifyPassword = function(password) {
        console.log(password);
        console.log(this.password);
        return bcrypt.compareSync(password, this.password);
    }
    


const User = mongoose.model('User', userSchema);

module.exports = User;