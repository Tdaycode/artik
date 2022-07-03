const mongoose = require('mongoose');


const jobSchema = mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    jobDetails: {
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
   cost: {
    type: Number,
    required: true,
    trim: true,
    default: 0,
},
  deadline: {
      type: Date,
      required: true,
      unique: true,
      default: Date.now(),
    },
    isOpen:{
      type:Boolean,
      default:true,
    }
   
  },
  {
    timestamps: true,
  }
);




/**
 * @typedef Job
 */
const Job = mongoose.model('Job', jobSchema);

module.exports = Job;