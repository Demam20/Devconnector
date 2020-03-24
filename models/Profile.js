const mongoose = require('mongoose')
const Schema = mongoose.Schema

const profileSchema = new Schema({
  UserID: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },

  Avatar: {
    type: String
  },
  Username: {
    type: String
  },
  Email: {
    type: String
  },
  Name: {
    type: String,
    required: true
  },
  
  Website: {
    type: String
  },
  Bio: {
    type: String

  },
  
  Phoneno: {
    type: Number
  },
  Gender: {
    type: String
  },
  SimilarAccountSuggestion: {
    type: Boolean,
    default: true
  },
  // ChangePassword: {
  //   oldpwd: {
  //     type: Schema.Types.ObjectId,
  //     ref: 'users',
  //     required: true
  //   },
  //   newpwd: {
  //     type: String,
  //     required: true
  //   }
    
  // },
  Subscription: {
    feedbackemails: {
      type: Boolean,
      default: true
    },
    reminderemails: {
      type: Boolean,
      default: true
    },
    productemails: {
      type: Boolean,
      default: true
    },
    newsemails: {
      type: Boolean,
      default: true
    },
    shoppingbrandemails: {
      type: Boolean,
      default: true
    },
    shoppingbagemails: {
      type: Boolean,
      default: true
    },
    smsmessages: {
      type: Boolean,
      default: true
    }
  }
})

module.exports = Profile = mongoose.model('profile',profileSchema)