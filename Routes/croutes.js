const express = require('express');
const router = express.Router();
require('./conn.js');
const User  = require("./user.js");
const candidate  = require("./candidate.js");
const{jsonmiddleware,generateToken} = require("./jwt.js");
const checkAminRole = async( candidateID)=>{
    try{
        if(!checkAminRole (req.user.id)){
           return  res.status(404).json({message:" candidate is not admin"});
        }
        const  candidate = await  candidate.findById( candidateID);
        return  candidate.role ==='admin';
    }catch(err){
        return false;
    }
}
router.post('/',jsonmiddleware,async (req,res)=>{
    try{
        if(! await checkAminRole (req. candidate,id))

             return  res.status(404).json({message:" candidate is not admin"});
        
        const  candidate = await  candidate.findById(candidate);
        
        const data = req.body;
    const newPerson  = new ( candidate);
   const response =await  new candidate.save();

   console.log("Data Saved Yes");
   const payload = {
    id:response.id
   }
   console.log(JSON.stringify(payload));
   const token  = generateToken(payload);
   console.log("token is"+ token);
   res.status(200).json({response:response});
    } 
    catch(err){
        console.log("Error"+ err);
        res.status(500).json({err: "Internal Server error"})
    }
})
router.get('/profile',jsonmiddleware,async (req,res)=>{
    try{
       const data = await  candidate.find();

   console.log("Data Fetched");
   res.status(200).json(data);
    }
    catch(err){
        console.log("Error"+ err);
        res.status(500).json({err: "Internal Server error"})
    }
})
router.put('/: candidateID',jsonmiddleware,async(req,res)=>{
    try{
        const  candidateData = req. candidate;
    const{currentPassword,newPassword} = req.body;
    const  candidate = await  candidate.findById( candidateData);
    if(! candidate || !(await  candidate.comparePassword(currentPasswordpassword))){
        res.status(401).json({error: "Invalid  candidatename or password"});
    }
     candidate.password = newPassword;
    await  candidate.save();
    console.log(" password change data Updated");
    res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({err:" Internal Server error"});
    }
    })


    

module.exports = router;
