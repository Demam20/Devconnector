const mongoose = require('mongoose')
const Schema = mongoose.Schema

const profileSchema = new Schema({
  Avatar: {
    type: Schema.Types.ObjectId,
    ref: 'users'

  },
  Name: {
    type: String,
    required: true
  },
  Username: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  Website: {
    type: String
  },
  Bio: {
    type: String

  },
  Email: {
    type: Schema.Types.ObjectId,
    ref: 'users'
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
  ChangePassword: {
    oldpwd: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    newpwd: {
      type: String,
      required: true
    }
    
  },
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