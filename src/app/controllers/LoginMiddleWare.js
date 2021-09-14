var md5 = require('md5');

const Course = require('../models/Course');
const CourseDetail = require('../models/CourseDetail');
const User = require('../models/User');

const {multipleMongooseToObject} =  require('../../util/mongose');
const {mongooseToObject} =  require('../../util/mongose');



class LoginMiddleWare{
    login(req,res,next){
       if(!req.signedCookies.UserId){
           res.render('login')
       }else {
            User.findOne({_id : req.signedCookies.UserId})
                .then(user =>{
                    next();
                })
                .catch(next)
            
            
            
             
       }
    }

    postlogin(req,res,next){
        var usernameLogin= req.body.name;
        var passwordLogin = md5(req.body.password);
        

         User.findOne({user : usernameLogin})
            .then(user => {
                if(!user){
                    var errorUser = 'Bạn không phải là admin, nếu muốn truy cập hãy liên hệ với adimn.'
                    res.render('login',{
                        errorUser,
                    });
                    return;
                }
                if(user.password != passwordLogin){
                    var errorPassword = 'Bạn đã nhập sai mật khẩu. Vui lòng nhập lại. Nếu quên hãy liên hệ lại admin để lấy lại mật khẩu.'
                    res.render('login',{
                        errorPassword,
                    });
                    return;
                } 
                res.cookie('UserId',user.id,{
                    signed: true,
                });
                next();
                })  
            .catch(next)
                   
    }
}

module.exports = new LoginMiddleWare;