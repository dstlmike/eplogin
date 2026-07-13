
const mongoose = require('mongoose');
const imggSchema = new mongoose.Schema({
  name: String,

  phone: String,
    address: String,
  addresss: Array,
  today: {
imgg: {
    img: {
      date: String,
      time: String,
      data: Buffer,
        contentType: String,
        description: String
    },
  img1: {
    date: String,
    time: String,
        data: Buffer,
        contentType: String,
        description: String
  },
  img2: {
    date: String,
        data: Buffer,
        contentType: String,
        description: String
  },
  img3: {
    date: String,
        data: Buffer,
        contentType: String,
        description: String
  },
  img4: {
    date: String,
        data: Buffer,
        contentType: String,
        description: String
  },
  img5: {
    date: String,
        data: Buffer,
        contentType: String,
        description: String
  },
  img6: {
    date: String,
        data: Buffer,
        contentType: String,
        description: String
  },
  img7: {
    date: String,
        data: Buffer,
        contentType: String,
        description: String
  },
  img8: {
    date: String,
        data: Buffer,
        contentType: String,
        description: String
  },
  img9: {
    date: String,
        data: Buffer,
        contentType: String,
        description: String
  }
  }
  }
});
module.exports = mongoose.model('Image', imggSchema);
