var md5 = require('md5');

const Course = require('../models/Course');
const CourseDetail = require('../models/CourseDetail');
const User = require('../models/User');
const Client = require('../models/Client');

const {multipleMongooseToObject} =  require('../../util/mongose');
const {mongooseToObject} =  require('../../util/mongose');



class CheckCookies{
    check(req,res,next){
       if(!req.signedCookies.UserId){
           next()
       }else {
        Promise.all([User.findOne({_id : req.signedCookies.UserId}),Client.findOne({_id : req.signedCookies.UserId})])
        .then(([user,client]) =>{
           if(user){
               user= mongooseToObject(user);
               res.locals.user=user;
               next();
           }else{
                user= mongooseToObject(client);
                res.locals.user=user;
                next();
           }
        })
        .catch(next)        
       }
    }

   
}

module.exports = new CheckCookies;