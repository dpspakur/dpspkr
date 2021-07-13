var express=require('express')
const path = require('path');
var auth = require('../../config/auth'); 
var dNotice = require('../models/notice');
const { Router } = require('express');
const fs = require('fs-extra');
var router = express.Router();
var isAdmin = auth.isAdmin;
 
router.get('/admin/upload',isAdmin, function (req, res) {
  res.render('file_upload')
})
router.post('/admin/upload',function(req,res){
  
  
  if(req.files){

    var file =req.files.sampleFile
    var fileName=file.name
     
    var title=req.body.title
    var notice = new dNotice({
      title: fileName,
      name: title,
      
    });
    notice.save();
    
  }
  const p=path.join(__dirname,'../../',`/public/files/notices/${fileName}`)
  file.mv(p,function(err){
    if(err){
      res.send(err)
    }else{
      res.redirect('/notice/admin/notice')
    }
  })
})

 
router.get('/:name',function(req,res){
  const file=path.join(__dirname,'../../',`/public/files/notices/${req.params.name}`)
    // var file=p+req.params.name;
    res.download(file);
  })
router.get('/',function(req,res){
    dNotice.find({},function(err,notices){
      res.render('test',{
        notices:notices,
        title: "Notices | DPS Pakur"
      }
      
      )
      
    })
    
  })
  router.get('/admin/notice',isAdmin,function(req,res){
    dNotice.find({},function(err,notices){
      res.render('admin_notice',{
        notices:notices
      }
      
      )
      
    })
    
  })
  router.get('/delete/:id',function(req,res){
    var id =req.params.id
    dNotice.findOne({_id:id},function(err,user){
      const file=path.join(__dirname,'../../',`/public/files/notices/${user.title}`)
      // var file='public/files/notices/'+user.title;
      fs.remove(file);
    })
    dNotice.findByIdAndRemove(id, function (err) {
      if(err){
        res.send(err)
      }else{
        res.redirect('/notice/admin/notice')
      }
    });
    
  })
  module.exports = router;