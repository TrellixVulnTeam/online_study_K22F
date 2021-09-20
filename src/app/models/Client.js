const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');



const Client = new Schema({
    name: {type: String, require:true},
    user: {type: String, require:true},
    password: {type: String, require:true},
    avatar: {type: String, require:true},
    store : { type : Array , "default" : [] }
  }, {
    timestamps: true,
  });

  //add plugin
  mongoose.plugin(slug);
  Client.plugin(mongooseDelete,{
    deletedAt: true,
    overrideMethods: 'all'});

  module.exports = mongoose.model('Client', Client);