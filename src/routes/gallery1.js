var express=require('express')
var mkdirp = require('mkdirp');
 
var auth = require('../../config/auth'); 
const { Router } = require('express');
const fs = require('fs-extra');
var router = express.Router();
var isAdmin = auth.isAdmin;
const dcategory = require('../models/gallery_catergory');
const dpic =require('../models/gallery_pic')


router.get('/',function(req,res){
    dcategory.find({},function(err,categories){
        if(err){
            console.log(err)
        }else{
            res.render('gallery',{categories,title:'Gallery || DPS Pakur'})
        }
    })
})
router.get('/:category',function(req,res){
    var category = req.params.category
    dpic.find({category:category},function(err,pics){
        if(err){console.log(err)}else{
             
            res.render('gallerpic',{title:category,pics})
        }
    })
})


module.exports = router;