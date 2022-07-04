
var mongoose = require('mongoose') ;

var db = mongoose.Schema;
var schema = new db ({
   studentid : {
      type : 'String' ,
      require : 'true'
   },
   name : {
      type : 'String' ,
      require : 'true'
   },
   email : {
      type : 'String' ,
      require : 'true'
   },
   contact : {
      type : 'String' ,
      require : 'true'
   },
   password : {
      type : 'String' ,
      require : 'true'
   },
   role : {
    type : 'String' ,
    require : 'true'
    },
   isblocked: {
      type:'Boolean',
      require:'true',
      default:false
   }
});

var users = mongoose.model('UserDetail',schema);
module.exports = users ;

