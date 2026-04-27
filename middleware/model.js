
const mongoose = require('mongoose');
const imggSchema = new mongoose.Schema({
  name: String,

  phone: String,
    address: String,
addresss: Array,
    img: {
        data: Buffer,
        contentType: String,
        description: String
    },
  img1: {
        data: Buffer,
        contentType: String,
        description: String
  }
});
module.exports = mongoose.model('Image', imggSchema);
