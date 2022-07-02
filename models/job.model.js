// const mongoose = require('mongoose');

// const jobSchema = mongoose.Schema(
//   {
//     postedBy: {
//       type: Schema.Types.ObjectId,
//       ref: 'User'
//     },
//     lastName: {
//         type: String,
//         required: true,
//         trim: true,
//         default: '',
//     },
//     city: {
//       type: String,
//       required: true,
//       trim: true,
//       default: 'current location',
//   },
//    state: {
//     type: String,
//     required: true,
//     trim: true,
//     default: 'state',
// },
//   phone: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//       default: '+234',
//     },
//     isArtisan: {
//       type: Boolean,
//       default: false,
//     },
//     skill:{
//       type: String,
//       default: '',      
//     },
//     experience: {
//       type: String,
//       default: '',
//     },
//     workshopAddress: {
//       type: String,
//       default: '',
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//       lowercase: true,
//       validate(value) {
//         if (!validator.isEmail(value)) {
//           throw new Error('Invalid email');
//         }
//       },
//     },
//     password: {
//       type: String,
//       required: true,
//       trim: true,
//       minlength: 8,
//       validate(value) {
//         if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
//           throw new Error('Password must contain at least one letter and one number');
//         }
//       }
//     }
//   },
//   {
//     timestamps: true,
//   }
// );




// /**
//  * @typedef Job
//  */
// const User = mongoose.model('User', userSchema);

// module.exports = User;