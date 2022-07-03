const mongoose = require('mongoose');


const bookSchema = mongoose.Schema(
  {
    clientID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    artisanID: {
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