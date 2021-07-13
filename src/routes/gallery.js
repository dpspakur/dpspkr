var express=require('express')
var mkdirp = require('mkdirp');
const path = require('path');
var auth = require('../../config/auth'); 
const { Router } = require('express');
const fs = require('fs-extra');
var router = express.Router();
var isAdmin = auth.isAdmin;
 
const dcategory = require('../models/gallery_catergory');
const dpic =require('../models/gallery_pic')

router.get('/',isAdmin,function(req,res){
    dcategory.find({},function(err,categories){
        if(err){
            console.log(err)
        }else{
            dpic.find({},function(err,pics){
                if(err){
                    console.log(err)
                }else{
                    res.render('edit_gallery',{categories,pics})
                }
            })
        }
    })
     
})
router.get('/add_category',isAdmin,function(req,res){
    res.render('add_category')
})
router.post('/add_category',function(req,res){
    if(req.files){
        var file =req.files.thumb
        var name =file.name
        var title = req.body.title
        const add_category= new dcategory({
            title:title,
            picname: name
        })
        add_category.save();
        const p=path.join(__dirname,'../../',`/public/files/gallery`)
        mkdirp(p+'/'+title )
        file.mv(p+'/'+title+'/'+name,function(err){
            if(err){
                console.log(err)
            }else{
                res.redirect('/admingallery')
            }
        })
    }else{
        res.redirect('/admingallery/add_category')
    }
})
router.get('/add_pic',isAdmin,function(req,res){
    dcategory.find({},function(err,user){
        if(err){
            console.log(err)
        }else{
            res.render('add_pic',{categories:user})
        }
    })
})
router.post('/add_pic',function(req,res){
    if(req.files){
        var file=req.files.pic
        var name=file.name
        var category =req.body.category
        var newpic= new dpic({
            category:category,
            picname:name
        })
        newpic.save()
        const p=path.join(__dirname,'../../',`/public/files/gallery`)
        file.mv(p+'/'+category +'/'+name,function(err){
            if(err){
                console.log(err)
            }else{
                res.redirect("/admingallery")
            }
        })
    }else{
        res.redirect('/admingallery/add_pic')
    }
})
router.get('/deletepic/:id',function(req,res){
    var id = req.params.id
    dpic.findById(id,function(err,pic){
        if(err){
            console.log(err)
        }else{
            var name=pic.picname
            var category = pic.category
            const p=path.join(__dirname,'../../',`/public/files/gallery`)
            fs.remove(p+'/'+category+'/'+name)
        }
    })
    dpic.findByIdAndDelete(id,function(err){
        if(err){
            console.log(err)
        }else{
            res.redirect('/admingallery')
        }
    })
})
router.get('/deletecategory/:id',function(req,res){
    var id =req.params.id
    dcategory.findById(id,function(err,category){
        if(err){
            console.log(err)
        }else{
            var name= category.title
            const p=path.join(__dirname,'../../',`/public/files/gallery`)
            fs.remove(p+'/'+name)
            dpic.find({category:name},function(err,pics){
                if(err){
                    console.log(err)
                }else{
                    pics.forEach(function(pi){
                        dpic.findOneAndDelete({category:pi.category},function(err){
                            if(err){
                                console.log(err)
                            } 
                        })
                    })
                }
            })
        }
    })
    dcategory.findByIdAndDelete(id,function(err){
        if(err){
            console.log(err)
        }else{res.redirect('/admingallery')}
    })

})
module.exports = router;