const mongoose=require('mongoose')


var picSchema = mongoose.Schema({

    category: {
      type: String,
    },
    picname:{
      type: String,
    }
  
  });
  const dpic = mongoose.model("pic", picSchema);
  module.exports = dpic;