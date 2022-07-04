
var mongoose = require('mongoose') ;

var db = mongoose.Schema;
var schema = new db ({
   bookid : {
      type : 'String' ,
      require : 'true'
   },
   bookname : {
      type : 'String' ,
      require : 'true'
   },
   author : {
      type : 'String' ,
      require : 'true'
   },
   isblocked: {
      type:'Boolean',
      require:'true',
      default:false
   }
   
  
});

var booklist = mongoose.model('allbooks',schema);
module.exports = booklist;

