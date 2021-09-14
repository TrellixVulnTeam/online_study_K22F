var md5 = require('md5');

const Course = require('../models/Course');
const CourseDetail = require('../models/CourseDetail');
const User = require('../models/User');

const {multipleMongooseToObject} =  require('../../util/mongose');
const {mongooseToObject} =  require('../../util/mongose');



class CheckCookies{
    check(req,res,next){
       if(!req.signedCookies.UserId){
           next()
       }else {
            User.findOne({_id : req.signedCookies.UserId})
                .then(user =>{
                    user= mongooseToObject(user);
                    res.locals.user=user;
                    next();
                })
                .catch(next)
            
            
            
             
       }
    }

   
}

module.exports = new CheckCookies;