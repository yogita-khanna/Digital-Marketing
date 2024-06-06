const mongoose = require('mongoose');

// Define Rider Schema
const riderSchema = new mongoose.Schema({
  name: {
    type: String,

  },
  address:{
    type: String,
    
  },
  email:{
    type: String,

  },
  phoneNumber:{
    type: Number,
 
  },
  drivingPapers:{
    type: String
  },
  preOwned:{
    type: Number,

  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
  
    },
    coordinates: {
      type: [Number],
  
    },
  },
});

// Create Rider model
const Rider = mongoose.model('Rider', riderSchema);

module.exports = Rider;
