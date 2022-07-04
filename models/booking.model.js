const mongoose = require('mongoose');


const bookSchema = mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    artisan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    clientName: {
        type: String,
     
        trim: true,
        default: '',
    },
    location: {
      type: String,
     
      trim: true,
      default: 'current location',
  },
   budgetCost: {
    type: Number,
   
    trim: true,
    default: 0,
},
  deadline: {
      type: Date,
    
      default: Date.now(),
    },
   clientAddress: {
    type: String,

    trim: true,
    default: '',
  },
  detail: { 
    type: String,
 
    trim: true,
  },
  isAccepted: { 
    type: Boolean,
    default: false,
  }
   
  },
  {
    timestamps: true,
  }
);




/**
 * @typedef Job
 */
const Booking = mongoose.model('Book', bookSchema);

module.exports = Booking;