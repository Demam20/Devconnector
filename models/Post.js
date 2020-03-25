const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const PostSchema= new Schema ({
  user :{ 
    type: Schema.Types.ObjectId,
    ref: 'users'
    //Doaa ref
  },
  name :{
    type :String,
    required:true
  },
  avatar:{
    type:String,
    required:true
  },
  imagepost :{
    type: String,
    required:true
    //storing image to the app as url
  },
  location:{
    type:String,
    required:false
  },
  description:{
    type:String,
    required:false
  },
  
  likes:[{
    user:{
      type:Schema.Types.ObjectId,
      ref:'users'
      //Doaa ref
    }
  }],
  comments:[{
    user:{
      type:Schema.Types.ObjectId,
      ref:'users'
    },
    name:{
      type:String
    },
    avatar:{
      type:String
    },
    text :{
      type:String,
      required:true
    },
    date:{
      type:Date,
      default:Date.now

    }
  }],
  date:{
    type:Date,
    default: Date.now
  },
  bookmark:{
    type:String,
    required:false
    
  }

});
module.exports=Post = mongoose.model('post',PostSchema);