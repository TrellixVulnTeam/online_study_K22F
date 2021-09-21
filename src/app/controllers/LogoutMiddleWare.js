var md5 = require('md5');

const Course = require('../models/Course');
const CourseDetail = require('../models/CourseDetail');
const User = require('../models/User');
const Client = require('../models/Client')

const {multipleMongooseToObject} =  require('../../util/mongose');
const {mongooseToObject} =  require('../../util/mongose');

class LogoutMiddleWare{
    logout(req,res,next){
            // res.send('hello')
            res.cookie('UserId','none');
            res.redirect('back')
    }
}

module.exports = new LogoutMiddleWare;


