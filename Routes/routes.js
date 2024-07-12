const express = require('express');
const router = express.Router();
require('./conn.js');
const User  = require("./user.js");
const{jsonmiddleware,generateToken} = require("./jwt.js");

router.post('/signUp',async (req,res)=>{
    try{
        const data = req.body;
    const newUser  = new User(data);
   const response =await  newUser.save();

   console.log("Data Saved Yes");
   const payload = {
    id:response.id
   }
   console.log(JSON.stringify(payload));
   const token  = generateToken(payload);
  
   res.status(200).json({response:response,token:token});
    } 
    catch(err){
        console.log("Error"+ err);
        res.status(500).json({err: "Internal Server error"})
    }
})
router.post('/login',async(req,res)=>{
    try{
        const{aadharCardNumber,password} = req.body;
        const user = await person.findOne({aadharCardNumber:aadharCardNumber});
        if(!user || !(await user.comparePassword(password))){
            res.status(401).json({error: "Invalid username or password"});
        }
        const payload ={
            id:user.id
        }
        const token  = generateToken(payload);
        res.json(token);


    }catch(err){

    }
})

router.put('/:Userid',jsonmiddleware,async(req,res)=>{
    try{
        const UserData = req.User;
    const{currentPassword,newPassword} = req.body;
    const user = await User.findById(UserData);
    if(!user || !(await user.comparePassword(currentPassword))){
        res.status(401).json({error: "Invalid username or password"});
    }
    User.password = newPassword;
    await User.save();
    console.log(" password change data Updated");
    res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({err:" Internal Server error"});
    }
    })
    
router.delete('/:Userid',async(req,res)=>{
        try{
        const personId = req.params.id;
        const response = await User.findByIdAndDelete(personId);
        if(!response){
            res.status(404).json({err:"Person not found"});
        }
        else{
            console.log("deleted succeessfully");
            res.status(200).json({response});
        }
        }catch(err){
            console.log(err);
            res.status(500).json({err:"Internal Server error"});
        }
    
    })
module.exports = router;
