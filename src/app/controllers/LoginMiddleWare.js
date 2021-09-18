var md5 = require('md5');

const Course = require('../models/Course');
const CourseDetail = require('../models/CourseDetail');
const User = require('../models/User');
const Client = require('../models/Client')

const {multipleMongooseToObject} =  require('../../util/mongose');
const {mongooseToObject} =  require('../../util/mongose');



class LoginMiddleWare{
    login(req,res,next){
        if(!req.signedCookies.UserId){
            res.render('login')
        }
        else{
                User.findOne({_id :req.signedCookies.UserId})
                 .then( user => {
                     if(!user){
                         res.render('login')
                     }
                     else {
                         next();
                     }
                 })
                 .catch(next)
            }
        // }else{
        //     User.findOne({_id : req.signedCookies.UserId})
        //         .then( user => res.send('hi'))
        //         .catch(res.render('login'))
        // }
       
  
    }

    loginClient(req,res,next){
        if(!req.signedCookies.UserId){
            var alert=  req.query.alert;
            res.render('loginClient',{alert})
        }else {
            Client.findOne({_id : req.signedCookies.UserId})
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
                    var errorUser = 'Tài khoản không tồn tại, nếu muốn truy cập hãy liên hệ với adimn.'
                    res.render('login',{
                        errorUser,
                    });
                    return;
                }
                if(user.password != passwordLogin){
                    var errorPassword = 'Bạn đã nhập sai mật khẩu. Vui lòng nhập lại. Nếu quên hãy liên hệ lại admin để lấy lại mật khẩu.'
                    res.render('login',{
                        errorPassword,
                        usernameLogin,
                    });
                    return;
                } 
                res.cookie('UserId',user.id,{
                     signed: true,
                     expires: new Date(Date.now() + 31 * 24 * 3600000)
                });
                res.redirect('back')
                next();
              
                })  
            .catch(next)
                   
    }

    postloginclient(req,res,next){
        var usernameLogin= req.body.name;
        var passwordLogin = req.body.password;
        

         Client.findOne({user : usernameLogin})
            .then(user => {
                if(!user){
                    var errorUser = 'Tài khoản không tồn tại, hãy click vào đăng kí ở bên trên'
                    res.render('login',{
                        errorUser,
                    });
                    return;
                }
                if(user.password != passwordLogin){
                    var errorPassword = 'Bạn đã nhập sai mật khẩu. Vui lòng nhập lại. Nếu quên hãy liên hệ lại admin để lấy lại mật khẩu.'
                    res.render('login',{
                        errorPassword,
                        usernameLogin,
                    });
                    return;
                } 
                res.cookie('UserId',user.id,{
                     signed: true,
                     expires: new Date(Date.now() + 31 * 24 * 3600000)
                });
                res.redirect('back')
                next();
                })  
            .catch(next)

        }

}

module.exports = new LoginMiddleWare;