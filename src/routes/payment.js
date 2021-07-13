 

const Payment =require('../models/payment')
const express=require('express');
const router = new express.Router();
const admissionFees =require('../models/admission_fees');
const studentUser = require('../models/studentUser');
const nodemailer = require('nodemailer');
var auth = require('../../config/auth'); 
var isAdmin= auth.isAdmin

router.get('/payment', function(req,res){
    let errors=[];
    res.render('payment',{title:'Fee Payment || DPS Pakur',errors:errors});
  })

router.post('/payment',function(req,res){
    var name =req.body.name;
    var std =req.body.class;
    var ad_no =req.body.ad_no;
    var order_id =req.body.order_id;
    var email =req.body.email;
    let errors=[]
    if(!name||!std||!ad_no||!order_id||!email){
        errors.push({msg:'enter all fields'})
        res.render('payment',{title:'Fee Payment || DPS Pakur',errors:errors})
    }else{
        Payment.findOne({email:email},function(err,user){
            if(err){res.send('error')}
            else{
                if(user.order_id==order_id){
                    errors.push({msg:'order id alreday exist please wait for the mail,if you have already paid'})
                    res.render('payment',{title:'Fee Payment || DPS Pakur',errors:errors})
                }else{
                    
                        const payment =new Payment({
                            name:name,
                            class:std,
                            ad_no:ad_no,
                            email:email,
                            order_id:order_id
                        })
                        payment.save((err)=>{
                            if(err){
                                console.log(err)
                            }else{
                                res.render('thankyou',{title:'payment || DPS Pakur'})
                            }
                        });
                    
                   
                }
            }
        })
    }
    
   
   
})
router.get('/admission_fees',function(req,res){
    var User=req.user
    res.render('admission_fees',{
        title:'Payment || DPS Pakur',
        user:User
    })
})
router.post('/admission_fees',function(req,res){
    var order_id=req.body.id
    var email=req.user.email
   
    var fees=new admissionFees({
        email:email,
        order:order_id
    })
    studentUser.findOneAndUpdate({email:email},{paymentsubmit:true},function(err ){
     if(err){
         res.send('error')
     }   
    })
    fees.save(function(err){
        if(err){
            res.send('error')
        }else{
            res.redirect('/admission_fees')
        }
    })
})
router.get('/fee_list',isAdmin,function(req,res){
    res.render('fee_list')
})
router.get('/admission_fee_list',isAdmin,function(req,res){
    admissionFees.find({},function(err,fees){
        if(err){
            res.send('error')
        }else{
            res.render('admission_fees_list',{
                fees:fees
            })
        }
    })
})
router.get('/paymentapprove/:email',function(req,res){
    var email=req.params.email
    admissionFees.findOneAndUpdate({email:email},{payment:true},function(err){
        if(err){res.send('error')}
    })
    studentUser.findOneAndUpdate({email:email},{paymentverified:true},function(err){
        if(err){
            res.send('error')
        }else{
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: "dpspakurweb@gmail.com",
                    pass: "8877115641",
                },
            });
            const email =req.params.email
            const mailOptions = {
             from: '"Auth Admin" <dpspakurweb@gmail.com>', // sender address
             to: email, // list of receivers
             subject: "Payment status ✔", // Subject line
             html: `<h1> Your payment is sucessfull`, // html body
          };
          
          transporter.sendMail(mailOptions, (error, info) => {
             if (error) {
                 console.log(error);
                 req.flash(
                     'error_msg',
                     'Something went wrong on our end. Please register again.'
                 );
                 res.redirect('/auth/login');
             }
             else {
                 console.log('Mail sent : %s', info.response);
                 req.flash(
                     'success_msg',
                     'Activation link sent to email ID. Please activate to log in.'
                 );
                 res.send('success');
             }
          })
          }
            
        
    })
})
router.get('/tuition_fee_list',isAdmin,function(req,res){
    Payment.find({},function(err,fees){
        if(err){
            res.send('error')
        }else{
            res.render('tuition_fee_list',{
                fees:fees
            })
        }
    })
})
router.get('/tpaymentapprove/:email',function(req,res){
    var email=req.params.email
    
    Payment.findOneAndUpdate({email:email},{payment:true},function(err){
        if(err){
            res.send('error')
        }else{
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: "dpspakurweb@gmail.com",
                    pass: "8877115641",
                },
            });
            const email =req.params.email
            const mailOptions = {
             from: '"Auth Admin" <dpspakurweb@gmail.com>', // sender address
             to: email, // list of receivers
             subject: "Payment Status", // Subject line
             html: `<h1> Your payment is sucessfull`, // html body
          };
          
          transporter.sendMail(mailOptions, (error, info) => {
             if (error) {
                 console.log(error);
                 req.flash(
                     'error_msg',
                     'Something went wrong on our end. Please register again.'
                 );
                 res.redirect('/auth/login');
             }
             else {
                 
                 res.redirect('/fee_list');
             }
          })
          }
            
        
    })
})
    
  module.exports=router;