var md5 = require('md5');

const Course = require('../models/Course');
const CourseDetail = require('../models/CourseDetail');
const User = require('../models/User');
const Client = require('../models/Client');



const {multipleMongooseToObject} =  require('../../util/mongose');
const {mongooseToObject} =  require('../../util/mongose');



class ClientController{
    store(req,res,next){
        var idCourse=req.params.id;
        Client.update(
            {_id: req.signedCookies.UserId}, 
            {$push: {store:req.params.id}},{new: true, upsert: true }).exec()
            .then(res.redirect('back'))
    }

    delete(req,res,next){
        var idCourse=req.params.id;
        Client.findByIdAndUpdate(
            {_id: req.signedCookies.UserId},
            {$pull:{ store:req.params.id}}, { safe: true, upsert: true },
            )
            .then(res.redirect('back'))
    }

    findCourse(req,res,next){
        if(req.signedCookies.UserId){
            Client.findOne({_id: req.signedCookies.UserId})
            .then(client => {return client.store})
            .then(store =>{
                return Course.find({_id:{$in:store}})
            })
            .then(ClientCourseList => {  
                var ClientCourseList= multipleMongooseToObject(ClientCourseList)
               
                res.locals.ClientCourseList = ClientCourseList;
               
                next();
            })
            .catch(next)
        }
        else {
            next();
        }
       
            

    }

   

}

module.exports = new ClientController;