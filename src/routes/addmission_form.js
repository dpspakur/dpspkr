var fs =require('fs-extra');
const nodemailer = require('nodemailer');
var blobStream = require('blob-stream');
const path =require('path');
const express = require('express')
const dadmissionForm =require('../models/admissio_form')
const PDFDocument = require('pdfkit');
const router = new express.Router();
var auth = require('../../config/auth'); 
var isUser = auth.isUser;
var isAdmin = auth.isAdmin;
var dstudentUser =require('../models/studentUser');
var mkdirp = require('mkdirp');
 
router.get("/admission",isUser,function(req,res){
   var User =req.user
   let errors=[]
   dadmissionForm.findOne({email:User.email},function(err,Student){
      if(err){
         console.log(err)
      }else{
         res.render('admission_from',{
            user:User,
            student:Student,
            errors:errors,
            title:'Online Apply'
         })
      }
   })
  
})
router.post('/admission',function(req,res){
   let errors = [];
   const dclass=req.body.dclass
   if (dclass=="nton"){
      var User=req.user;
   var email=User.email
   if(req.files){

      var file =req.files.image
      var file1 =req.files.image1
      var file2 =req.files.image2
      var fileName=file.name
      var fileName1=file1.name
      var fileName2=file2.name
      const p=path.join(__dirname,'../../',`/public/files`)
      if(file.mimetype=='image/jpeg'||file.mimetype=='image/png'&& file1.mimetype=='image/jpeg'||file1.mimetype=='image/png' && file2.mimetype=='image/jpeg'||file2.mimetype=='image/png'){
         mkdirp(p+'/forms/'+email)
         file.mv(p+'/forms/'+email +'/'+fileName)
         file1.mv(p+'/forms/'+email +'/'+fileName1)
         file2.mv(p+'/forms/'+email +'/'+fileName2)
        }else{
           errors.push({msg:'upload a jpg ,jpeg or png file'})
        }
      }
     else{
         errors.push({msg:'please upload the documents'})
     }
      
   const ad_class = req.body.Class;
   const fullname = req.body.fullname
   const dob = req.body.dob;
   const dob_day = req.body.dob_day;
   const dob_Month = req.body.dob_Month;
   const dob_year = req.body.dob_year;
   const  nationality = req.body.nationality;
   const  Religion= req.body.Religion;
   const gender = req.body.gender;
   const fatherName = req.body.fatherName;
   const father_Occupation = req.body.father_Occupation;
   const  father_Designation = req.body.father_Designation;
   const father_Annual_Income = req.body.father_Annual_Income;
   const father_work = req.body.father_work;
   const father_qual = req.body.father_qual;
   const father_contact = req.body.father_contact;
   const motherName = req.body.motherName;
   const mother_Occupation = req.body.mother_Occupation;
   const mother_Designation = req.body.mother_Designation;
   const mother_Annual_Income = req.body.mother_Annual_Income;
   const mother_work = req.body.mother_work;
   const mother_qual = req.body.mother_qual;
   const mother_contact = req.body.mother_contact;
   const home = req.body.home;
   const state = req.body.state;
   const country = req.body.country;
   const present_address = req.body.present_address;
   const permanent_address = req.body.permanent_address;
   const one_name = req.body.one_name;
   const one_admsn = req.body.one_admsn;
   const one_class = req.body.one_class;
   const one_Sec = req.body.one_Sec;
   const two_name = req.body.two_name;
   const two_admsn = req.body.one_admsn;
   const two_class = req.body.two_class;
   const two_Sec = req.body.two_Sec;
   const info = req.body.info;
   const prev_school = req.body.prev_school ;
   const prev_class= req.body.prev_class;
   const prev_position= req.body.prev_position;
   const prev_medium= req.body.prev_medium;
   const skills= req.body.skills;
   const skills_certificate= req.body.skills_certificate;
   const prev_result= req.body.prev_result;
   
   const AdmissionForm = new dadmissionForm({
      dclass:dclass,
      name :fullname,
      email:email,
      Admission_class:ad_class ,
      dob :dob,
      dob_day:dob_day,
      dob_month:dob_Month,
      dob_year:dob_year,
      nationality:nationality,
      Religion:Religion,
      Gender: gender,
      father:{
         name:fatherName,
         Occupation:father_Occupation,
         Designation:father_Designation,
         annualIncome:father_Annual_Income,
         organisationsNameAndAddress:father_work ,
         academicQualification : father_qual,
         PhoneNo :father_contact
      },
      mother:{
         name:motherName,
         Occupation:mother_Occupation,
         Designation:mother_Designation,
         annualIncome:mother_Annual_Income,
         organisationsNameAndAddress:mother_work ,
         academicQualification :mother_qual,
         PhoneNo :mother_contact
      },
      address1:{
         town :home,
         state :state,
         country:country
      },
      address2:{
         present: present_address,
         permanent :permanent_address ,

      },
      sibling:{
         one :{
            name:one_name,
            admsnNo:one_admsn ,
            class:one_class,
            sec:one_Sec
         },
         two :{
            name:two_name,
            admsnNo:two_admsn ,
            class:two_class,
            sec:two_Sec
         }
      },
      Any_other_info:info ,
      studentPic :fileName,
      fpic:fileName1,
      mpic:fileName2,
      prev_school :prev_school,
      prev_class:  prev_class,
      prev_position:prev_position,
      prev_medium:prev_medium,
      skills:skills,
      skills_certificate:skills_certificate,
      prev_result:prev_result
   })
   if (!ad_class || !fullname || !dob|| !dob_day|| !dob_Month|| !dob_year|| !nationality|| !Religion||
       !gender|| !fatherName|| !father_Occupation|| !father_Designation|| !father_Annual_Income|| !father_work||
        !father_qual|| !father_contact|| !motherName|| !mother_Occupation|| !mother_Designation|| !mother_Annual_Income  || !mother_work 
        || !mother_qual|| !mother_contact|| !home|| !state|| !country|| !present_address || !permanent_address|| !one_name||!one_admsn
        || !one_class|| !one_Sec|| !two_name || !two_admsn|| !two_class|| !two_Sec|| !info|| !prev_school|| !prev_class|| !prev_position
        || !prev_medium|| !skills|| !skills_certificate|| !prev_result ) {
      errors.push({ msg: 'Please enter all fields!!' });
  }
  if (errors.length > 0) {
      var User =req.user
      dadmissionForm.findOne({email:User.email},function(err,Student){
         if(err){
            console.log(err)
         }else{
            res.render('admission_from',{
               user:User,
               student:Student,
               errors:errors,
               title:'Online Apply',
               father_Designation,ad_class,fullname ,dob,dob_day,dob_Month,dob_year,father_work,father_Annual_Income,father_qual,
               nationality,Religion,gender,fatherName,father_Occupation,father_Designation,father_contact,motherName,mother_Annual_Income,
               mother_Occupation,mother_Designation,mother_qual,mother_work ,mother_contact,state,home,present_address,
               permanent_address,one_class,one_name,one_admsn,one_Sec,two_name,two_admsn,two_class,two_Sec,info,prev_school,
               prev_class,prev_position,prev_medium,skills,skills_certificate,prev_result
            })
         }
      })
}else{
   var User =req.user
   dstudentUser.findOneAndUpdate({email:User.email},{submit:true},function(err){
      if(err){
         console.log(err)
      }else{
         AdmissionForm.save((err)=>{
            if(err){
               console.log(err)
            }else{
               res.redirect('/admission')
            }
         });
      }
     
   })
   
   
   const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: "dpspakurweb@gmail.com",
          pass: "Dps@887711",
      },
  });
  const email =User.email
  const mailOptions = {
   from: '"Auth Admin" <dpspakurweb@gmail.com>', // sender address
   to: email, // list of receivers
   subject: "Form Review ✔", // Subject line
   html: `<h1> Your form is has been submitted sucessfully and is under review`, // html body
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
   }else{
      var User=req.user;
      var email=User.email
      if(req.files){

         var dfile =req.files.dimage
         var dfile1 =req.files.dimage1
         console.log(dfile)
          
         var dfileName=dfile.name
         var dfileName1=dfile1.name
         const p=path.join(__dirname,'../../',`/public/files`)
         if(dfile.mimetype=='image/jpeg'||dfile.mimetype=='image/png'&& dfile1.mimetype=='image/jpeg'||dfile1.mimetype=='image/png' ){
            mkdirp(p+'/forms/'+email)
            dfile.mv(p+'/forms/'+email +'/'+dfileName)
            dfile1.mv(p+'/forms/'+email +'/'+dfileName1)
            
           }else{
              errors.push({msg:'upload a jpg ,jpeg or png file'})
           }
         }
        else{
            errors.push({msg:'please upload the documents'})
        }
      var name=req.body.dname
      var mob =req.body.dmob
      var dob = req.body.ddob
      var category = req.body.dcategory
      var yop =req.body.dyop
      var school = req.body.dschool
      var nob =req.body.dnob
      var agg =req.body.dagg
      var maths = req.body.dmaths
      var science = req.body.dscience
      var ceng = req.body.dceng
      var cmaths = req.body.dcmaths
      var stream = req.body.dstream
      var one = req.body.done
      var two = req.body.dtwo 
      var three =req.body.dthree
      var four = req.body.dfour 
      var five = req.body.dfive 
      var six = req.body.dsix
      var cone = req.body.dcone
      var ctwo = req.body.dctwo 
      var cthree =req.body.dcthree
      var cfour = req.body.dcfour 
      var cfive = req.body.dcfive 
      var csix = req.body.dcsix
      var father = req.body.dfather 
      var mother = req.body.dmother
      var demail = req.body.demail
      var Occupation = req.body.doccupation
      var phno = req.body.dphno
      var adress = req.body.dadress
      const AdmissionForm =new dadmissionForm({
         dclass:dclass,
         email:email,
         eleven:{

            name:name,
            mob:mob,
            dob:dob,
            category:category,
            yop:yop,
            school:school,
            nob:nob,
            agg:agg,
            maths:maths,
            science:science,
            ceng:ceng,
            cmaths:cmaths,
            stream:stream,
            one:one,
            two:two,
            three:three,
            four:four,
            five:five,
            six:six,
            cone:cone,
            ctwo:ctwo,
            cthree:cthree,
            cfour:cfour,
            cfive:cfive,
            csix:csix,
            father:father,
            mother:mother,
            email:demail,
            phno:phno,
            Occupation:Occupation,
            adress:adress,
            pic:dfileName,
            fpic:dfileName1
         }
      })
      if(!name||!mob||!dob ||!category||!yop||!school|| !nob||!maths||!agg||!science||!ceng||!cmaths||!stream||!one||!two
         ||!three||!four||!five||!six||!cone||!ctwo||!cthree||!cfour||!cfive||!csix||!father||!mother||!email||!phno||!Occupation
         ||!adress){
            errors.push({msg:"enter all fields"})
         }
         if (errors.length > 0) {
            var User =req.user
            dadmissionForm.findOne({email:User.email},function(err,Student){
               if(err){
                  console.log(err)
               }else{
                  res.render('admission_from',{
                     user:User,
                     student:Student,
                     errors:errors,
                     title:'Online Apply'
                  })
               }
            })
      }else{
         var User =req.user
         dstudentUser.findOneAndUpdate({email:User.email},{submit:true},function(err){
            if(err){
               console.log(err)
            }else{
               AdmissionForm.save((err)=>{
                  if(err){
                     console.log(err)
                  }else{
                     res.redirect('/admission')
                  }
               });
            }
           
         })
         
         
         const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "dpspakurweb@gmail.com",
                pass: "Dps@887711",
            },
        });
        const email =req.user.email
        const mailOptions = {
         from: '"Auth Admin" <dpspakurweb@gmail.com>', // sender address
         to: email, // list of receivers
         subject: "Form review", // Subject line
         html: `<h1> Your form is has been submitted sucessfully and is under review`, // html body
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
   }
   
  


})
 
router.get('/admissionPdf/:id',isAdmin,function(req,res){
   var id =req.params.id;
   dadmissionForm.findById(id,(err,user)=>{
      if(err){
         console.log(err)
      }
      else{
         var c=user.dclass
         var email=user.email
         if(c!='eleven'){
            var n=user.name;
         const doc = new PDFDocument;
         const p=path.join(__dirname,'../../',`/public/files`)
         doc.pipe(fs.createWriteStream('public/files/forms/'+email+'/'+n+'.pdf'));
          
         // Add an image, constrain it to a given size, and center it vertically and horizontally
         doc.image(p+'/img/dps-admission-form-page-002-m.jpg',0,0, {
             fit:[615,785],
             align: 'center',
             valign: 'center'
          })
          .image(p+'/forms/'+user.email+'/'+user.studentPic,485,125,{fit:[100,100]})
          .fontSize(15)
          .text(user.Admission_class,175,205)
          .text(user.name,175,235)
          .text(user.dob,225,270)
          .text(user.dob_day,80,305)
          .text(user.dob_month,300,305)
          .text(user.dob_year,450,305)
          .text(user.nationality,145,340)
          .text(user.Religion,270,340)
          .text(user.Gender,510,340)
          .text(user.father.name,150,375)
          .text(user.father.Occupation,95,410)
          .text(user.father.Designation,270,410)
          .text(user.father.annualIncome,470,410)
          .text(user.father.organisationsNameAndAddress,170,445)
          .text(user.father.academicQualification,160,510)
          .text(user.father.PhoneNo,140,545)
          .text(user.mother.name,150,580)
          .text(user.mother.Occupation,105,615)
          .text(user.mother.Designation,270,615)
          .text(user.mother.annualIncome,470,615)
          .text(user.mother.organisationsNameAndAddress,170,645)
          .text(user.mother.academicQualification,160,675)
          .text(user.mother.PhoneNo,140,700);

          doc.addPage()
            .image(p+'/img/dps-admission-form-page-001-m.jpg',0,0, {
            fit:[615,800],
            align: 'center',
            valign: 'center'
         })
            .fontSize(15)
            .text(user.address1.town,125,55)
            .text(user.address1.state,315,55)
            .text(user.address1.country,500,55)
            .text(user.address2.present,175,85)
            .text(user.address2.permanent,175,190)
            .text(user.sibling.one.name,50,305)
            .text(user.sibling.one.admsnNo,200,305)
            .text(user.sibling.one.class,320,305)
            .text(user.sibling.one.sec,440,305)
            .text(user.sibling.one.name,50,335)
            .text(user.sibling.one.admsnNo,200,335)
            .text(user.sibling.one.class,320,335)
            .text(user.sibling.one.sec,440,335)
            .text(user.Any_other_info,50,400)
            .image(p+'/forms/'+user.email+'/'+user.fpic,485,125,{fit:[100,100]})
            .image(p+'/forms/'+user.email+'/'+user.mpic,485,125,{fit:[100,100]})
            .fontSize(10)
            .text(user.prev_school,200,630)
            .text(user.prev_class,320,645)
            .text(user.prev_position,370,660)
            .text(user.prev_medium,350,675)
            .text(user.skills,400,690);
          
         doc.end();
         var file=p+'/forms/'+n+'.pdf'
         res.download(file)
          
      }else{
         var n=user.eleven.name
         const doc = new PDFDocument;
         const p=path.join(__dirname,'../../',`/public/files`)
         doc.pipe(fs.createWriteStream(p+'/forms/'+user.email+'/'+n+'.pdf'));
          
         // Add an image, constrain it to a given size, and center it vertically and horizontally
         doc.image(p+'/img/class-xi form image.jpg',0,0, {
             fit:[615,785],
             align: 'center',
             valign: 'center'
          })
          .fontSize(12)
          .text(user.eleven.name,75,120)
          .text(user.eleven.dob,100,135)
          .text(user.eleven.category,100,150)
          .text(user.eleven.yop,180,185)
          .text(user.eleven.school,300,185)
          .text(user.eleven.nob,130,200)
          .text(user.eleven.agg,350,217)
          .text(user.eleven.maths,90,234)
          .text(user.eleven.science,190,234)
          .text(user.eleven.ceng,90,251)
          .text(user.eleven.cmaths,190,251)
          .text(user.eleven.stream,90,300)
          .text(user.eleven.one,100,363)
          .text(user.eleven.two,100,378)
          .text(user.eleven.three,100,393)
          .text(user.eleven.four,210,363)
          .text(user.eleven.five,210,378)
          .text(user.eleven.six,210,393)
          .text(user.eleven.cone,360,363)
          .text(user.eleven.ctwo,360,378)
          .text(user.eleven.cthree,360,393)
          .text(user.eleven.cfour,470,363)
          .text(user.eleven.cfive,470,378)
          .text(user.eleven.csix,470,393)
          .text(user.eleven.email,410,415)
          .text(user.eleven.father,130,435)
          .text(user.eleven.mother,130,451)
          .text(user.eleven.Occupation,440,435)
          .text(user.eleven.phno,440,450)
          .text(user.eleven.adress,90,480)
          .text(user.eleven.father,90,550)
          .text(user.eleven.name,370,550)
          .text(user.eleven.phno,130,610)
          doc.end();
          var file=p+'/files/forms/'+n+'.pdf'
          res.download(file)
      }
         }
         
   })
   
   
})

router.get('/formlist',isAdmin,function(req,res){
   dadmissionForm.find({},function(err,users){
      res.render('form_list',{
         Users:users
      })
   })
})
router.get('/form/approve/:id',function(req,res){
   const id = req.params.id;
   dadmissionForm.findById(id,function(err,user){
      if(err){
         console.log(err)
      }else{
         const email=user.email 
         dstudentUser.findOneAndUpdate({email:email},{approved:true},function(err){
            if(err){
               console.log(err)
            }else{
                
               const transporter = nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                      user: "dpspakurweb@gmail.com",
                      pass: "Dps@887711",
                  },
              });
               
              const mailOptions = {
               from: '"Auth Admin" <dpspakurweb@gmail.com>', // sender address
               to: email, // list of receivers
               subject: "Form Approval ✔", // Subject line
               html: `<h1> Your form is approved please login to continue</h1>`, // html body
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
                   res.redirect('/formlist');
               }
            })
            }
         })
         
      
      }
   })
})
router.get('/form/delete/:id',function(req,res){
   var id =req.params.id;
   dadmissionForm.findById(id,function(err,user){
      if(err){
         console.log(err)
      }else{
         var email =user.email
         dstudentUser.findOneAndDelete({email:email},function(err){
            if(err){
               console.log(err)
            }
         })
         const p=path.join(__dirname,'../../',`/public/files`)
         fs.remove(p+'/forms/'+email)
      }
   })
   dadmissionForm.findByIdAndDelete(id,function(err){
      if(err){
         console.log(err)
      }else{
         res.redirect('/formlist')
      }
   })
})
router.get('/form/:id',isAdmin,function(req,res){
   var id=req.params.id;
   dadmissionForm.findById(id,function(err,student){
      if(err){
         console.log(err)
      }else{
         dstudentUser.findOne({email:student.email},function(err,user){
            if(err){
               console.log(err)
            }else{
               res.render('form',{student:student,User:user})
            }
         })
         
        
      }
   })
  
})
router.get('/form/reject/:id',function(req,res){
   var id=req.params.id
   dadmissionForm.findById(id,function(err,user){
      if(err){
         console.log(err)
      }else{
         res.render('reject',{student:user})

      }
   })
  
})
router.post('/form/reject/:id',function(req,res){
   var id =req.params.id;
   dadmissionForm.findById(id,function(err,user){
      if(err){
         console.log(err)
      }else{
         const p=path.join(__dirname,'../../',`/public/files`)
         var email =user.email
         fs.remove(p+'/forms/'+email)
         const msg=req.body.msg
         dstudentUser.findOneAndUpdate({email:email},{submit:false},function(err){
            if(err){
               console.log(err)
            }else{
               const transporter = nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                      user: "dpspakurweb@gmail.com",
                      pass: "Dps@887711",
                  },
              });
               
              const mailOptions = {
               from: '"Auth Admin" <dpspakurweb@gmail.com>', // sender address
               to: email, // list of receivers
               subject: "Account Verification: NodeJS Auth ✔", // Subject line
               html: `<h1> Your form is rejected because of the given reasons: </h1> <br> <h3> `+msg+`</h3>`, // html body
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
                       'successfully rejected'
                   );
                   res.redirect("/formlist");
               }
            })
            }
         })
      }
   })
   dadmissionForm.findByIdAndDelete(id,function(err){
      if(err){
         console.log(err)
      }
   })
})

module.exports=router;
