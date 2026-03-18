const mongoose = require('mongoose');
mongoose.connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true });
const Schema = new mongoose.Schema;






const profileSchema = new Schema({
  email: String,
  password: String
});

const User = mongoose.model('profile', profileSchema);
