const mongoose=require('mongoose');
 


var paymentSchema= mongoose.Schema({
  payment:{
    type:Boolean,
    default:false
  },
    name: {
      type: String,
      require: true
    },
    class:{
      type: String,
      require: true
    },
    ad_no:{
        type: String
    },
    email:{
        type: String
    },
    order_id :{
        type:String
    }
  
  });
  const dPayment = mongoose.model("Payment", paymentSchema);
  module.exports = dPayment