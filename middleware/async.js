// controllers.js

var someAsyncDatabaseCall = async function() {
  console.log("This is an Async Log Entry");
}






exports.getMyData = async (req, res, next) => {
  try {
    const data = await someAsyncDatabaseCall();
   
    res.status(200).json(data);
  } catch (err) {
    // Crucial for async: pass errors to the next middleware
    next(err); 
  }
};
