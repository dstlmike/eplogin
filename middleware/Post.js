const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  slug: { type: String, slug: 'title', unique: true } // Creates the URL field
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
