1. create new folder 
2. npm init
3. npm install --save express 
4. create app.js 
5. add start in package.json 
6. app.js :
   we need express so 
        const express = require('express');
   now our app 
        const app = express();
   our app listening 
        app.listen(8080,()=>{
            console.log('Server is running on 8080');
        })
7. we need routes for different different routes in our application.So, create routes folder and feed.js 
        
        const express = require('express');

        const router = express.Router();

        //our routes goes here 
        const { getPosts } = require('../controllers/feed');

        router.get('/posts',getPosts);

        module.exports = router;

8. now for different different routes we need controllers.So, create controller folder and feed.js file in it.
    which exports functions 
       
        exports.getPosts = (req,res,next) => {
    
        }

9.  now add our routes in app.js file  

        const feedRoutes = require('./server/routes/feed');

        app.use(feedRoutes);

10. for post requests we need body-parser for parse incoming json request 

    npm install --save body-parser 

11. 
### Example -------------------------------
 
HTML 

<button id="get">Get Posts</button>
<button id="post">Create A Post</button>

JS 

const getButton = document.getElementById('get');
const postButton = document.getElementById('post');

getButton.addEventListener('click',()=>{
    fetch('http://localhost:8080/feed/posts')
      .then(res => {
        return res.json();
      })
      .then(res => {
          console.log(res)
       })
      .catch(err => console.log(err))
});

postButton.addEventListener('click',()=>{
  fetch('http://localhost:8080/feed/create-post',{
    method : 'POST',
    body : JSON.stringify({
      title : 'Second Post',
      content : 'This is second post!'
    }),
    headers : {
      'Content-Type' : 'application/json'
    }
    }).then(res => {
        return res.json();
    })
      .then(res => {
      console.log(res)
    })
      .catch(err => console.log(err))
});


### ----------------------------------------------------------

12. CORS error 

    //CORS error solution 
    app.use((req,res,next)=>{
        res.setHeader('Access-Control-Allow-Origin','*');
        res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,PATCH');
        res.setHeader('Access-Control-Allow-Headers','Content-Type , Authorization');
        next();
    })

13. REST APIs :

a) planning a rest apis 
b) crud operations and endpoints
c) validations 
d) image upload
e) authentication

14. Server side validation 
    npm install --save express-validator

    we can use express-validator/check for validation in our route and give appropriate response from our controller 

   //route
    const { body } = require('express-validator/check');
  
    const { getPosts ,
        createPost

        } = require('../controllers/feed');

    //POST : /feed/create-post 
    router.post('/create-post', [
        body('title').trim().isLength({ min : 5 }),
        body('content').trim().isLength({ min : 5 })
    ] ,createPost );


    //controller 
    const { validationResult } = require('express-validator');

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(422).json({
            message : 'Validation Failed, entered data is incorrect.',
            errors : errors.array()
        })
    }

15. database 

    npm install --save mongoose 

    const mongoose = require('mongoose');

    mongoose.connect('mongodb+srv://Prakask:Prakash@cluster0-qih3q.mongodb.net/messanger?retryWrites=true&w=majority')
    .then(result => {

        app.listen(8080,()=>{
            console.log('Server is running on 8080');
        })
        
    })
    .catch(err => console.log(err));

16. now create models for interacting between database 

    //models/post 
    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    const postSchema = new Schema({
        title : {
            type : String,
            required : true
        },
        imageUrl : {
            type : String,
            required : true
        },
        content : {
            type : String,
            required : true
        },
        creator : {
            type : Object,
            required : true 
        }
    },{timestamps : true})

    const Post = mongoose.model('Post',postSchema);

    module.exports = {
        Post
    }

17. now we can use our post model in our controller     

18. image upload and download 

    for images we are using firebase storage for storing image and retriving them 
    code related to firebase is given in react application.

    after post insert update and delete  we are adding user to our application 

19.  add route /user/signup 
     add validations 
     add controller 
     