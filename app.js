const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//const multer = require('multer');
const fileUpload = require('express-fileupload');

const app = express();

app.use(fileUpload());

//app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

//app.use(multer().single('image'))

app.use('/images',express.static(path.join(__dirname,'server','images')))
console.log(path.join(__dirname,'server','images'))
//CORS error solution 
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,PATCH');
    res.setHeader('Access-Control-Allow-Headers','Content-Type , Authorization');
    next();
})

const feedRoutes = require('./server/routes/feed');
const userRoutes = require('./server/routes/user');

app.use('/feed',feedRoutes);
app.use('/user',userRoutes);


app.use((err,req,res,next)=>{
    console.log(err);
    const status = err.statusCode;
    const message = err.message;
    const data = err.data;
    res.status(status).json({ message : message , data : data })
})

mongoose.connect('mongodb+srv://Prakask:Prakash@cluster0-qih3q.mongodb.net/messanger?retryWrites=true&w=majority')
.then(result => {

    app.listen(8080,()=>{
        console.log('Server is running on 8080');
    })
    
})
.catch(err => console.log(err));
