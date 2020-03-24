const express = require('express');
const router = express.Router();
const mongoose= require('mongoose');
const passport= require('passport');

//Post model
const Post=require('../../models/Post');

//Profile model
const Profile = require('../../models/Profile');

//validation
const validatePostinput = require('../../validation/post');

// @route   POST api/posts
// @desc    Create post
// @access  Private

router.post('/',passport.authenticate('jwt',{session:false}) ,
(req,res) =>
{
  const{erros,isValid} =  validatePostInput(req.body);

  //check validation
  if(!isValid){
    return res.status(400).json(errors);
  }
  //create post

  const newPost = new Post({
   
    name:req.body.name,
    user:req.user.id,
    imagepost:req.body.imagepost,
    avatar:req.body.avatar
  });
  newPost.save()
  .then(post => res.json(post));
});

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private

router.post('/like/:id',passport.authenticate('jwt'),{session:false},
(req,res) =>{
  Profile.findOne({user:req.user.id}) 
  .then(profile =>
    {
      Post.findById(req.params.id) 
      .then(post => {
        if(
          //checking if user already liked the post
          post.likes.filter(like => like.user.toString() === req.user.id).length > 0 ) 
          {
            return res.status(400).json({alreadyliked:'user already liked this post'});
          }

          //add user to like array
          post.likes.unshift({user:req.user.id});
          post.save()
          .then(post => res.json(post));
         })

         .catch(err => res.status(404).json({postnotfound:'No post found'}));
    });

});

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private

router.post('/unlike/:id',passport.authenticate('jwt',{session:false}),
(req,res) => {
Profile.findOne({user:req.user.id})
.then(profile =>{
  Post.findById(req.params.id)
  .then(post => {
    if(
         post.likes.filter(like => like.user.toString() === req.user.id) .length ===0
    ){
        return res.status(400).json({notliked:'User has not liked this post earlier'});
    }
    //remove user from likes array
      
    const removeIndex= post.likes.map(item => item.user.toString()).indexOf(req.user.id);

    //splice
    post.likes.splice(removeIndex,1);

    //save
    post.save()
    .then(post => res.json(post));

  })
  .catch(err => res.status(404).json({postnotfound:'No post found'}));
    
});

});

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private

router.post('/comment/:id',passport.authenticate('jwt',{session:false}) ,
(req,res) => {
  const{errors,isValid} = validatePostinput(req.body);

  if(!isValid){
    return res.status(400).json(errors);
  }
  //find post to add comment
  Post.findById(req.params.id)
  .then(post => {
    const newComment = {
      text: req.body.text,
      avatar:req.body.avatar,
      name:req.body.name,
      user:req.user.id
    };
    post.comments.unshift(newComment);

    //save comment
    post.save()
    .then(post => res.json(post));
  })
  .catch(err => res.status(404).json({postnotfound:'No post found to add comment'}));
}
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete('/comment/:id/:comment_id',passport.authenticate('jwt',{session:false}),
(req,res) => {
  Post.findById(req.params.id)
  .then(post => {
if(
  post.comments.filter(comment => comment_id.toString() === req.params.comment_id ).length === 0)
  {
  return res.status(404).json({commentnotexits:'no such comment exists for this post'});
}
 //splice out comment
     const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id);

     post.comments.splice(removeIndex,1);
     post.save()
     .then(post => res.json(post));
  })
  .catch(err => res.status(404).json({nopostfound: 'No post found'}));
}
);

// @route   GET api/posts
// @desc    Get posts
// @access  Public

router.get('/',(req,res) =>{

  Post.find()
  .sort({date : -1})
  .then(posts => res.json(posts))
  .catch(err => res.status(404).json({nopostsfound:'No post found to display'}));

});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public

router.get('/:id',(req,res) => {
  Post.findById(req.params.id)
  .then(post => res.json(post))
  .catch(err => res.status(404).json({nopostfound:'No post Found with this ID'}));
});

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private

router.delete('/:id',passport.authenticate('jwt'),{session:false},
(req,res) => {
  Profile.findOne({user:req.user.id})
  .then(profile => 
    {
        Post.findById(req.params.id)
        .then(post => {
          if(post.user.toString() !==  req.user.id ){
               return res.status(401).json({notauthorized:'User not authorized to delete the post'});   
          }

          //Delete post
           post.remove()
           .then(() => res.json({success:true}));

        })
        .catch(err => res.status(404).json({postnotfound:'No post found'}));
  });
}
);


module.exports = router;

