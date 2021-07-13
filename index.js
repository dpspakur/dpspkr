const http = require('http');
const ejs =require('ejs');
const express=require('express')
const app =express();
const path =require('path')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const flash = require('connect-flash')
const expressValidator = require('express-validator')
const session = require('express-session')
const noticeRouter= require('./src/routes/notice')
var Notice= require('./src/models/notice')
const userRouter = require('./src/routes/user')
const admission = require('./src/routes/addmission_form')
const payment = require('./src/routes/payment')
const User = require('./src/models/user')
const gallery =require('./src/routes/gallery')
const gallery1 =require('./src/routes/gallery1')

const fileUpload = require('express-fileupload');
const Payment = require('./src/models/payment');
const { messaging } = require('firebase-admin');
const message = require('./src/routes/message');
const Message=require('./src/models/message')
 
app.use(bodyParser.urlencoded({
  extended : true
}))
// parse application/json
app.use(bodyParser.json())
app.use(fileUpload());
require('./config/passport')(passport);
app.locals.errors = null

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static("public"))
app.get('/',function(req,res){
  Notice.find({},function(err,notices){

    Message.findOne({name:"msg"},function(err,msg){
       res.render('index',{notices:notices,msg:msg})
  })
})
})
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true,
  // cookie: { secure: true }
}))
// passport middleware
app.use(passport.initialize());
app.use(passport.session());

 
  app.use(flash());
  // app.use(function (req, res, next) {
  //   res.locals.messages = require('express-messages')(req, res);
  //   next();
  // })
  app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });
  
 

  // app.use('/users',userRouter)
  
  app.get('/playgrounds', function (req, res) {
    res.render('playgrounds',{title:'Playgrounds || DPS Pakur'})
  })
  app.get('/curriculum', function (req, res) {
    res.render('curriculum',{
      title:"Curriculum | DPS Pakur" 
    })
  })
  app.get('/Syllabus', function (req, res) {
    res.render('syllabus',{
      title:"Syllabus | DPS Pakur" 
    })
  })
  app.get('/procedure', function (req, res) {
    res.render('procedure',{
      title:"Procedure | DPS Pakur" 
    })
  })
  app.get('/fees', function (req, res) {
    res.render('fees',{
      title:"Fee Details | DPS Pakur" 
    })
  })
  app.get('/contact', function (req, res) {
    res.render('contact',{
      title:"Contact Us | DPS Pakur" 
    })
  })
  app.get('/certificates', function (req, res) {
    res.render('recognition',{
      title:"NOC | DPS Pakur" 
    })
  })
  app.use('/gallery', gallery1)
  app.get('/sports', function (req, res) {
    res.render('sports',{title:'Gallery || sports'})
  })
 app.use('/admingallery',gallery)
  app.use('/',payment)
  app.get('/director_message',function(req,res){
    Message.findOne({name:"msg"},function(err,msg){
      if(err){
          res.send('somethimg went wrong')
      }else{
          res.render('director_message',{msg:msg,title:'Director Message'})
      }
  })
  })
  app.get('/principal_message',function(req,res){
    Message.findOne({name:"msg"},function(err,msg){
      if(err){
          res.send('somethimg went wrong')
      }else{
          res.render('principal_message',{msg:msg,title:'Principal Message'})
      }
  })
  })
  app.use('/admin_message',message)
 
  app.use('/notice',noticeRouter);
  app.use('/', admission)
  app.use('/auth', require('./src/routes/auth'));
const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log("server started ")
})
 




mongoose.connect('mongodb+srv://dps:dps@cluster0.harcc.mongodb.net/Cluster0?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useCreateIndex :true
})
