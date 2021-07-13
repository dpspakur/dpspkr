const mongoose=require('mongoose')


var categorySchema = mongoose.Schema({

    title: {
      type: String,
      require: true
    },
    picname:{
      type: String,
      require: true
    }
  
  });
  const dcategory = mongoose.model("category", categorySchema);
  module.exports = dcategory;