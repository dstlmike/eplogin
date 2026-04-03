// controllers.js
var express = require('express');
var app = express.Router();
//var getMyData = express.Router();


var getMyData = app.get('/aasync', async(req, res) => {
 var entry = "This is an Async Log Entry";
   
 res = {
  body: entry
 };

//async function someAsyncDatabaseCall() {
 //  var entry = "This is an Async Log Entry";
   
 // var data = entry;
  console.log(entry);
 
 // return entry;
})





module.exports = getMyData; //= async (req, res) => {
 // try {
//res.body =  await someAsyncDatabaseCall(entry);
   
  //  res.redirect('/data')
 // } catch (err) {
    // Crucial for async: pass errors to the next middleware
   // console.log(err); //console.log('Error');
 // }
//}


