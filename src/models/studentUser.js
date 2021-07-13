const mongoose = require('mongoose');

//------------ User Schema ------------//
const studentUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  resetLink: {
    type: String,
    default: ''
  },
  admin :{
    type:Number
  },
  approved:{
    type:Boolean,
    default:false
  },
  submit :{
    type:Boolean,
    default:false
  },
  paymentsubmit:{
    type:Boolean,
    default:false
  },
  paymentverified:{
    type:Boolean,
    default:false
  }
}, { timestamps: true });

const dstudentUser = mongoose.model('studentUser', studentUserSchema);

module.exports = dstudentUser;