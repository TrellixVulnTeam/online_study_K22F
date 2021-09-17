var md5 = require('md5');

const Course = require('../models/Course');
const CourseDetail = require('../models/CourseDetail');
const User = require('../models/User');
const Client = require('../models/Client');

const {multipleMongooseToObject} =  require('../../util/mongose');
const {mongooseToObject} =  require('../../util/mongose');



class RegisterMiddleWare{
        register(req,res,next){
               res.render('register')
        }

        postregister(req,res,next){
                var name =req.body.name;
                var username = req.body.user;
                var password = req.body.password;
                var rePassword=req.body.rePassword;
                Client.findOne({user:username})
                        .then(user=>{
                                if(user){
                                        var errorUser='Tài khoản đã tồn tại trong hệ thống. Hãy thử lại tên đăng nhập khác !!!'
                                        res.render('register',{
                                                errorUser,
                                                name,
                                        });

                                }
                                else {
                                       if(rePassword != password) {
                                               var errorPassword='Mật khẩu đăng nhập lại không khớp. Vui lòng nhập lại !!!'
                                               res.render('register',{
                                                errorPassword,
                                                name,
                                                username,
                                                password
                                                });
                                       }
                                       else{
                                                req.body.avatar= '/'+req.file.path.split('\\').slice(2).join('/');
                                                const client = new Client(req.body);
                                                var alert = 'xin chúc mừng bạn đã đăng kí tài khoản thành công !!! Hãy nhanh chóng đăng nhập và khám phá nhá !!!'
                                                client.save()      
                                                .then(() => res.render('loginClient',{
                                                        alert,
                                                }))
                                                .catch(next);
                                       }
                                }
                        })
                        .catch(next)
             
         }
}

module.exports = new RegisterMiddleWare;