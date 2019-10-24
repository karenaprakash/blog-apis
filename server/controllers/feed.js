const { validationResult } = require('express-validator');
const { Post } = require('../models/post');
const { User } = require('../models/user');


exports.getPosts = (req,res,next) => {
    const currentPage = req.query.page || 1;
    const perPage = 2;
    let totalItems;
    Post.find()
    .count()
    .then(count=>{
        totalItems = count;
        return  Post.find()
                    .skip((currentPage - 1) * perPage )
                    .limit(perPage);
    })  
    .then(posts => {
        res
        .status(200)
        .json({
            message : 'Posts fetched successfully.',
            posts : posts,
            totalItems : totalItems
        })
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err)
    })
  

   
}

exports.createPost = (req,res,next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation Failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }

    const title = req.body.title
    const content = req.body.content;
    let url = req.body.imageUrl;
    let creator;
    console.log(url)
    if(url){

        console.log(req.userId)

        const post = new Post({
            title : title , 
            content : content ,
            imageUrl : url,
            creator : req.userId
        })

        post.save()
        .then(result => {
            return  User.findById(req.userId);
        })
        .then(user=>{
            creator = user;
            user.posts.push(post);
            return user.save();
        })
        .then(result=>{
            post.creator =  {_id:creator._id,name:creator.name}
            res.status(201).json({
                message : 'Post created succesfully',
                post : post,
                creator : {_id:creator._id,name:creator.name}
            })
        })
        .catch(err => { 
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err)
        })  
    }
       
}


exports.getSinglePost = (req,res,next) => {
    const postId = req.params.postId;
    Post.findById(postId)
    .then(post=>{
        if(!post){
            const error = new Error('Post not found.');
            error.statusCode = 400;
            throw error;      
        }
        res.status(200).json({
            message : 'Post Fetched!',
            post : post 
        })
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err)    
    })
}


exports.updatePost  = (req,res,next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation Failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }

    const postId = req.params.postId;

    const post = req.body;
    console.log(post)
    Post.findOneAndUpdate(postId,{$set:post},{ new : false })
    .then(post =>{
        if(!post){
            const error = new Error('Post not found.');
            error.statusCode = 400;
            throw error;      
        }
        console.log(post)
        res.status(200).json({
            message : 'Post Updated!',
            post : post 
        })
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err)    
    })
}



exports.deletePost  = (req,res,next) => {

    const postId = req.params.postId;

    Post.findByIdAndRemove(postId)
    .then(post =>{
        if(!post){
            const error = new Error('Post not found.');
            error.statusCode = 400;
            throw error;      
        }
        console.log(post)
        res.status(200).json({
            message : 'Post Deleted!',
            post : post 
        })
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err)    
    })
}