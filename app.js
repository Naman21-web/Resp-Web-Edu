const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyparse = require('body-parser');
const mongoose = require('mongoose');
//const { truncate } = require('node:fs');
mongoose.connect('mongodb://localhost/contacteducation', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log("Connection Successful...."))
.catch((err)=> console.log(err));

//const db = mongoose.connection;
//db.on('error',console.error.bind(console,'connection error:'));
//db.once('open',function(){

//});

const app = express();
const port = 800;

const contactSchema = new mongoose.Schema({
    name : {
        type : String ,
        unique: true, 
        required: true},
    email : {
        type : String ,
        unique: true, 
        required: true
    },
    phoneno :{ 
        type :Number,
        unique: true,
        requires: true
    }
});

const Contact = mongoose.model('Contact',contactSchema);

app.use('/static',express.static('static'));
app.use(express.urlencoded());

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

app.get('/',(req,res)=>{
    res.status(200).render('index.pug')
})

app.post('/',(req,res)=>{//{form(action="/contact",method="post",class="myform") Writing this in html file is important otherwise data will not be saved.
    var myDataa = new Contact(req,res)
    myDataa.save().then(()=>{
        res.send("Details Submitted Successfully")
    }).catch(()=>{
        res.status(404).render("Details not Submitted")
    })
})

app.listen(port,()=>{
    console.log(`port working at ${port}`);
})