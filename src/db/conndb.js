

// console.log('connecting to db')
// getting-started.js
const mongoose = require('mongoose');
const bodyParser = require('body-parser')


   
mongoose.connect(process.env.DATA_BASE).then(()=>{
    console.log('connection successful')
}).catch((e)=>{
    console.log(e.message);
})
