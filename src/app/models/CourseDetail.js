const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDeleteDetail = require('mongoose-delete');



const CourseDetail = new Schema({
    _slug: {type: String, slug:'name'},
    name: {type: String, require:true},
    lesson: {type: String, require:true},
    videoId: {type: String, require:true},
    term: {type: String, require:true},
  },{
    timestamps: true,
  });

  
  mongoose.plugin(slug);
  
  CourseDetail.plugin(mongooseDeleteDetail,{
    deletedAt: true,
    overrideMethods: 'all'});

  module.exports = mongoose.model('coursedetail', CourseDetail);