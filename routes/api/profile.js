const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const passport = require('passport')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

//loading profile model
const Profile = require('../../models/Profile')
//loading user model
const User = require('../../models/User')
//loading post model
const Post = require('../../models/Post');
//loading validation
const validateProfileInput = require('../../validation/profile')
const validateChangePwd = require('../../validation/changepassword')
//@GET api/profile
//@desc Get current user's profile
//@access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {}

    Profile.findOne({ UserID: req.user.id })

      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user"
          return res.status(404).json(errors)
        }
        res.json(profile)
      })
      .catch(err => res.status(404).json(err))

  }
)

//@route GET api/profile/all
//@desc Get all profiles
//@access Public
router.get(
  "/all",
  (req, res) => {
    const errors = {}

    Profile.find()
      .then(profiles => {
        if (!profiles) {
          errors.noprofile = "There are no profiles"
          return res.status(404).json(errors)
        }
        res.json(profiles)
      })
      .catch(err => res.status(404).json(err))
  }
)

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ UserID: req.params.user_id })
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
});

//@POST api/profile
//@desc Create or Edit profile
//@access Private

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(req.user.password)
    const {errors, isValid} = validateProfileInput(req.body)
    //check validation
    if(!isValid) {
      //return any errors with 400 status
      return res.status(400).json(errors)
    }

    const profileFields = {}
    profileFields.UserID = req.user.id;
    profileFields.Email = req.user.email;
    profileFields.Name = req.user.name;
    profileFields.ChangePassword ={}
    profileFields.ChangePassword.oldpwd = req.user.password;
    profileFields.Username = (req.body.username) ? req.body.username : req.user.name;
    profileFields.Avatar = (req.body.avatar) ? req.body.avatar : req.user.avatar
    //if (req.body.name) profileFields.Name = req.body.name;
    if (req.body.website) profileFields.Website = req.body.website;
    if (req.body.bio) profileFields.Bio = req.body.bio;
    if (req.body.phoneno) profileFields.Phoneno = req.body.phoneno;
    if (req.body.gender) profileFields.Gender = req.body.gender;
    if (req.body.similaraccountsuggestion) profileFields.SimilarAccountSuggestion = req.body.similaraccountsuggestion;
    
    //console.log(profileFields)


    Profile.findOne({ "UserID": req.user.id }).then(profile => {

      var promises = [];
      if (profile) {
        console.log(profile)
        promises.push(Profile.findOneAndUpdate(
          { "UserID": req.user.id },
          { "$set": profileFields },
          { new: true }
        ));

        if (req.body.avatar) {
          console.log("found a user")
          promises.push(User.findOneAndUpdate(
            { "_id": req.user.id },
            { "$set": { "avatar": req.body.avatar } },
            { new: true }
          ));
        }
        // if (req.body.username) {
        //   promises.push(User.findOneAndUpdate(
        //     { "_id": req.user.id },
        //     { "$set": { "name": req.body.username } },
        //     { new: true }
        //   ));
        // }

        Promise.all(promises)
          .then(result => res.json({ "status": "Success" }));
      }
      else {
        new Profile(profileFields).save().then(profile => res.json(profile))
      }
    })
  })

//@route DELETE api/profile
//@desc Delete user and profile
//@access Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ UserID: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() => res.json({ success: true }))
    })
  }
)

//@route POST api/profile/changepassword
//@desc Change user password
//@access Private
router.post(
  '/changepassword',
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

    const { errors, isValid } = validateChangePwd(req.body)
    if (!isValid) {
      return res.status(400).json(errors)
    }

    Profile.findOne({ UserID: req.user.id }).then(profile => {
      if (!profile) {
        return res.status(404).json({ status: "Profile not found" })
      }
      User.findOne({ "_id": req.user.id }).then(userprofile => {
        console.log(userprofile)
        console.log(userprofile.password)
        profile.ChangePassword.oldpwd = userprofile.password
        bcrypt.compare(req.body.currentPwd, userprofile.password)
        .then(isMatch => {
          if(!isMatch) console.log("is not a match")

          if (isMatch) {
            console.log("we are here")

            bcrypt.hash(req.body.newpwd, 10, (err, hash) => {
              if (err) {
                console.error(err)
                return
              }
              console.log("this is actual hash " + hash)
              userprofile.password = hash
              userprofile.save()
              profile.ChangePassword.newpwd = hash
              profile.save()
            })

            //Password is matched
            //payload
            const payload = {
              id: req.user.id,
              name: req.user.name,
              avatar: req.user.avatar
            };
            //sign token
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                })
              })
          }
        })

      })
     
    })
  })
//@route POST api/profile/subscription
//@desc Add subscriptions
//@access Private
router.post(
  '/subscription',
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ UserID: req.user.id }).then(profile => {
      profileFields.Subscription = {}
      if (req.body.feedbackemails) profileFields.Subscription.feedbackemails = req.body.feedbackemails
      if (req.body.reminderemails) profileFields.Subscription.reminderemails = req.body.reminderemails
      if (req.body.productemails) profileFields.Subscription.productemails = req.body.productemails
      if (req.body.newsemails) profileFields.Subscription.newsemails = req.body.newsemails
      if (req.body.shoppingbrandemails) profileFields.Subscription.shoppingbrandemails = req.body.shoppingbrandemails
      if (req.body.shoppingbagemails) profileFields.Subscription.shoppingbagemails = req.body.shoppingbagemails
      if (req.body.smsmessages) profileFields.Subscription.smsmessages = req.body.smsmessages

      profile.Subscription = profileFields.Subscription
      profile.save().then(profile => res.json(profile))

    })
  }
)
// @route   GET api/profile/bookmarks/all
// @desc    Get bookmarked posts
// @access  Private

router.get ('/bookmarks/all', passport.authenticate("jwt",{session:false}),
(req,res) =>{
  const errors = {}
  Profile.findOne({UserID:req.user.id})
  .then(profile => {
    if(!profile.bookmarks || profile.bookmarks.length === 0)
    {
            errors.nobookmarks = "no bookmarked posts"
            return res.status(404).json(errors);
    }
    var bookmarkedposts =[];
    console.log("inside bookmark route" + profile.bookmarks);
    var promises = []
   for(let bookmark of profile.bookmarks) {
      console.log("inside for loop " + bookmark.POSTID)
      var promise= Post.findById(bookmark.POSTID)
      .then( post =>{
      if(!post){
          //console.log("got empty post");
          bookmarkedposts.push({postid: bookmark.POSTID, status: "post has been deleted"});
        }
        else
        {
            //console.log("got post" + JSON.stringify(post));
            bookmarkedposts.push(post);
        }
      })
      promises.push(promise);
      //console.log("after each loop"+ JSON.stringify(bookmarkedposts));
    }

    Promise.all(promises).then(result =>{
    return res.json(bookmarkedposts);
    })
  } )
}
)

module.exports = router;
