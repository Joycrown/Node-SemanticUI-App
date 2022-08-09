const express = require('express');
const router = express.Router();
const club = require('../models/club')

// router.get('/',(req,res,next) =>{
//     res.send('Express router is working');
// })
router.get('/', (req,res)=>{
    club.find((err,docs) =>{
        res.render('home',{clubs:docs})
    }).catch(err=>{
        console.log("Something Went Wrong")
    })
    
})

router.post('/add', (req,res,next)=>{
    // const name = req.body.name;
    // const players = req.body.players;
    // const coach = req.body.coach;

    const {name, players, coach} = req.body

    console.log(name,players,coach)

    const uclClub = new club({
        name,
        players,
        coach
    })
    uclClub.save((err)=>{
        if (err){
            console.log('Something Went Wrong in saving data to database')
        }else{
            console.log('Data is saved successfully')
            res.redirect('/')
        }
    })
})

// Show Update

router.get('/edit/:id',(req,res,next)=>{
    console.log(req.params.id)
    club.findOneAndUpdate({_id:req.params.id},req.body, {new:true},(err, docs)=>{
        if(err){
            console.log("cant retrive data and edit because of some database problem")
        }else{
            res.render('edit', {club: docs})
        }
    })
   
})


// Update

router.post('/edit/:id',(req,res,next)=>{
    club.findByIdAndUpdate({_id:req.params.id},req.body, (err,docs)=>{
        if(err){
            console.log('Something went wrong with updating your data')
            next(err)
        }else{
            console.log('Updated Successfully')
            res.redirect('/')
        }
    })
})

// Delete

router.get('/delete/:id',(req,res,next)=>{
    club.findByIdAndDelete({_id: req.params.id},(err,docs)=>{
        if(err){
            console.log("something went wrong with deleting your data")
            next(err)
        }else{
            console.log('Deleted Successfully')
            res.redirect('/')
        }
    })
})
module.exports = router;