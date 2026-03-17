
const mongoose = require('mongoose');
const imggSchema = new mongoose.Schema({
    address: String,
addresss: Array,
    img: {
        data: Buffer,
        contentType: String,
        description: String
    }
});
module.exports = mongoose.model('Image', imggSchema);
