const express = require('express')
const router = express.Router()
router.get('/',(req,res)=>{
    res.render('index')
})
router.get('/contact',(req,res)=>{
    res.render('contact')
})
router.get('/about-us',(req,res)=>{
    res.render('about-us')
})
router.get('/faq',(req,res)=>{
    res.render('faq')
})
router.get('/services',(req,res)=>{
    res.render('services')
})
router.get('/coming-soon',(req,res)=>{
    res.render('coming-soon')
})
router.get('/contacts',(req,res)=>{
    res.render('contacts')
})

module.exports =router