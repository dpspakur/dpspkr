const mongoose =require('mongoose')
// User Schema

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
      },
      email: {
        type: String,
        require: true
      },
      username: {
        type: String,
        require: true
      },
      password: {
        type: String,
        require: true
      },
      admin: {
        type: Number
      }
    
});
const dadminUser = new mongoose.model("adminUser", userSchema)
module.exports =dadminUser