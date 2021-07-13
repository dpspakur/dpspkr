const mongoose=require('mongoose')


var noticeSchema = mongoose.Schema({

    title: {
      type: String,
      require: true
    },
    name:{
      type: String,
      require: true
    }
  
  });
  const dNotice = mongoose.model("Notice", noticeSchema);
  module.exports = dNotice