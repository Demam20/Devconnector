const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const passport = require('passport')

//loading profile model
const Profile = require('../../models/Profile')
//loading user model
const User = require('../../models/User')
//loading validation
//const validateProfileInput = require('../../validation/profile')

//@GET api/profile
//@desc Get current user's profile
//@access Private
router.get(
  "/",
  passport.authenticate("jwt", {session: false}),
  (req,res) => {
    const errors = {}

    Profile.findOne({UserID: req.user.id})
  
    .then(profile => {
      if(!profile) {
        errors.noprofile = "There is no profile for this user"
        return res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch(err=> res.status(404).json(err))

  }
)

//@route GET api/profile/all
//@desc Get all profiles
//@access Public
router.get(
  "/all",
  (req,res) => {
    const errors = {}

    Profile.find()
    .then(profiles => {
      if(!profiles) {
        errors.noprofile = "There are no profiles"
        return res.status(404).json(errors)
      }
      res.json(profiles)
    })
    .catch(err=> res.status(404).json(err))
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

    const profileFields = {}
    profileFields.UserID = req.user.id;


    profileFields.Email = req.user.email;
    profileFields.Username = (req.body.username) ? req.body.username : req.user.name;
    profileFields.Avatar = (req.body.avatar) ? req.body.avatar : req.user.avatar
    if (req.body.name) profileFields.Name = req.body.name;
    if (req.body.website) profileFields.Website = req.body.website;
    if (req.body.bio) profileFields.Bio = req.body.bio;
    if (req.body.phoneno) profileFields.Phoneno = req.body.phoneno;
    if (req.body.gender) profileFields.Gender = req.body.gender;
    if (req.body.similaraccountsuggestion) profileFields.SimilarAccountSuggestion = req.body.similaraccountsuggestion;

    profileFields.Subscription = {}
    if (req.body.feedbackemails) profileFields.Subscription.feedbackemails = req.body.feedbackemails
    if (req.body.reminderemails) profileFields.Subscription.reminderemails = req.body.reminderemails
    if (req.body.productemails) profileFields.Subscription.productemails = req.body.productemails
    if (req.body.newsemails) profileFields.Subscription.newsemails = req.body.newsemails
    if (req.body.shoppingbrandemails) profileFields.Subscription.shoppingbrandemails = req.body.shoppingbrandemails
    if (req.body.shoppingbagemails) profileFields.Subscription.shoppingbagemails = req.body.shoppingbagemails
    if (req.body.smsmessages) profileFields.Subscription.smsmessages = req.body.smsmessages
    //console.log(profileFields)


    Profile.findOne({ "UserID": req.user.id }).then(profile => {

      var promises = [];
      if (profile) {
        console.log("found a matching profile")
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
        if (req.body.username) {
          promises.push(User.findOneAndUpdate(
            { "_id": req.user.id },
            { "$set": { "name": req.body.username } },
            { new: true }
          ));
        }

        Promise.all(promises)
          .then(result => res.json({"status": "Success"}));
      }
      else {
        new Profile(profileFields).save().then(profile => res.json(profile))
      }
    })
  })

module.exports = router;