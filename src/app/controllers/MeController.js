const Course = require('../models/Course');
const {multipleMongooseToObject} =  require('../../util/mongose');
class MeController{
    //get  /me/stored/course
   
    storedCourse(req,res, next){

        Promise.all([ Course.find(),Course.countDocumentsDeleted()])
                .then(([courses, deletedCount]) => res.render('me/stored-course',{
                    courses:multipleMongooseToObject(courses),
                    deletedCount,
                }))
                .catch(next)
    }



    //get  /me/trash/course
    trashCourse(req,res, next) {
        Course.findDeleted()
        .then(courses =>  res.render('me/trash-course',{
           courses:multipleMongooseToObject(courses)
        }))
       .catch(next)
    }
}


module.exports = new MeController;