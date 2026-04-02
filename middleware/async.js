// controllers.js

 async function someAsyncDatabaseCall() {
   var entry = "This is an Async Log Entry";
  console.log(entry);
}






module.exports.getMyData = async (req, res, next) => {
  try {
    const data = await someAsyncDatabaseCall();
   
    res.status(200).json(data);
  } catch (err) {
    // Crucial for async: pass errors to the next middleware
    next(err); 
  }
};
