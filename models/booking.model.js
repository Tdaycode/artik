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
        required: true,
        trim: true,
        default: '',
    },
    location: {
      type: String,
      required: true,
      trim: true,
      default: 'current location',
  },
   budgetCost: {
    type: Number,
    required: true,
    trim: true,
    default: 0,
},
  deadline: {
      type: Date,
      required: true,
      default: Date.now(),
    },
   clientAddress: {
    type: String,
    required: true,
    trim: true,
    default: '',
  },
  detail: { 
    type: String,
    required: true,
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