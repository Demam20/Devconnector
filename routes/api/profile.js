const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Profile Model
const Profile = require("../../models/Profile");


// Load User Model
const User = require("../../models/User");
// Load Validation
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
   "/",
    passport.authenticate("jwt", {session: false}), 
    (req,res) => {
      const errors = {};

      Profile.findOne({ user: req.user.id })
        .populate("user", ["name", "avatar"])
        .then(profile => {
          if (!profile) {
            errors.noprofile = "There is no profile for this user";
            return res.status(404).json(errors);
          }
          res.json(profile);
        })
        .catch(err => res.status(404).json(err));
      }
    );
// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};

  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }

    res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: "There are no profiles" }));
});
// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get("/handel/:handel", (req, res) => {
  const errors= {};
  profile.findOne({ handel: req.params.handel })
  .populate("user",["name","avatar"])
  .then(profile => {
    if(!profile){
      errors.noprofile = "there is no profile for this user";
      return res.status(404).json(errors);
    }
    res.json(profile);

  })
  .catch(err => res.status(404).json(err));
   } ); 

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
});
// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }


    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;

  //skills- split into array
    if (typeof req.body.skills !=="undefined") {
   profileFields.skills = req.body.skills.split(",");
     }

  //social
  profileFields.social ={};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    profile.finOne({user:req.user.id}).then(profile => {
      if(profile){
        // upadate
        profile.findOneUpdate(
          {user:req.user.id},
          {$set:profileFields},
          {new:true}
        ).then(profile => res.jason(profile));

      } else {
        //creat
        //check if handel exists
        profile.findOne({handel:profileFields.handle}).then(profile => {
          if (profile){
            errors.handel = "that handel already exists";
            return res.status(400).json(errors);
          }
          // save profile
          new profile(profileFields).save().then(profile => res.jason(profile));
        });
      }
    });
  }
);  
// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req,res) => {
    const { errors,isValid } =  validateExperienceInput(req.body);
    // check validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      // add to exp array
      profile.experience.unshift(newExp);

      profile.save().then(profile => res.json(profile));
    });
  }
);
// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add to exp array
      profile.education.unshift(newEdu);

      profile.save().then(profile => res.json(profile));
    });
  }
);
  
 // @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        if (removeIndex === -1) {
          errors.experiencenotfound = "Experience not found";
          // Return any errors with 404 status
          return res.status(404).json(errors);
        }
        // Splice out of array
        profile.experience.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        if (removeIndex === -1) {
          errors.educationnotfound = "Education not found";
          // Return any errors with 404 status
          return res.status(404).json(errors);
        }

        // Splice out of array
        profile.education.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);



    



  

    

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);






module.exports = router;




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

