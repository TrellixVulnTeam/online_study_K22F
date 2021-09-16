const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');



const Course = new Schema({
    name: {type: String, require:true},
    teacher: {type: String, require:true},
    image: {type: String, require:true},
    term: {type: String, require:true},
    _term: {type: String, require:true},
    slug: {type: String, slug:'name' , unique:true},    
  }, {
    timestamps: true,
  });

  //add plugin
  mongoose.plugin(slug);
  Course.plugin(mongooseDelete,{
    deletedAt: true,
    overrideMethods: 'all'});

  module.exports = mongoose.model('Course', Course);