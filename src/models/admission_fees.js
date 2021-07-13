const mongoose=require('mongoose');
 


var admissionFeesSchema= mongoose.Schema({
   payment:{
    type:Boolean,
    default:false
   },
    email:{
        type:String
    } ,
    order:{
        type:String
    }
  });
  const dadmissionFees = mongoose.model("admissionFees", admissionFeesSchema);
  module.exports = dadmissionFees