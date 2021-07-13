const express = require('express');
const router = express.Router();

//------------ Importing Controllers ------------//
const authController = require('../../controllers/authController')

//------------ Login Route ------------//
router.get('/login', (req, res) =>{
let errors=[]
 res.render('login',{errors:errors,title:"Login | DPS Pakur"})});


//------------ Forgot Password Route ------------//
router.get('/forgot', (req, res) => res.render('forgot',{title:'Reset Password || DPS Pakur'}));

//------------ Reset Password Route ------------//
router.get('/reset/:id', (req, res) => {
    // console.log(id)
    res.render('reset', { id: req.params.id ,title:'Reset Password || DPS Pakur'})
});

//------------ Register Route ------------//
router.get('/register', (req, res) => {
    let errors=[]
    res.render('signup',{errors:errors,title:'Register | DPS Pakur'})});

//------------ Register POST Handle ------------//
router.post('/register', authController.registerHandle);

//------------ Email ACTIVATE Handle ------------//
router.get('/activate/:token', authController.activateHandle);

//------------ Forgot Password Handle ------------//
router.post('/forgot', authController.forgotPassword);

//------------ Reset Password Handle ------------//
router.post('/reset/:id', authController.resetPassword);

//------------ Reset Password Handle ------------//
router.get('/forgot/:token', authController.gotoReset);

//------------ Login POST Handle ------------//
router.post('/login', authController.loginHandle);

//------------ Logout GET Handle ------------//
router.get('/logout', authController.logoutHandle);

module.exports = router;