// controllers.js

 async function someAsyncDatabaseCall(data) {
   var entry = "This is an Async Log Entry";
  console.log(entry);
 // return entry;
}





module.exports.getMyData = async (req, res, next) => {
 // try {
    const data = await someAsyncDatabaseCall();
   
    res.redirect('/data')
 // } catch (err) {
    // Crucial for async: pass errors to the next middleware
   // console.log(err); //console.log('Error');
 // }
}


