const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.DB_LOCAL,{

}).then(()=>{
    console.log("succes s gg");
}).catch((err)=>{
    console.log(err);
})
