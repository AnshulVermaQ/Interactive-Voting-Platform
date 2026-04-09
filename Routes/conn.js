const mongoose = require('mongoose');
require('dotenv').config();
if (!process.env.DB_LOCAL) throw new Error('DB_LOCAL is not set'); mongoose.connect(process.env.DB_LOCAL,{

}).then(()=>{
    console.log("succes s gg");
}).catch((err)=>{
    console.log(err);
})
