const Course = require('../models/Course');
const CourseDetail = require('../models/CourseDetail');
const {multipleMongooseToObject} =  require('../../util/mongose');
const {mongooseToObject} =  require('../../util/mongose');



class CourseController{


    //get  /course
    index(req,res, next){
        Course.find({})
            .then(courses => {
             res.render('course', {
                 courses : multipleMongooseToObject(courses)
                });
            })
            .catch(next)
    }


    //get /course/create
    create(req,res, next){
       res.render('courseCreate');
    }

      //post /course/store
    store(req,res, next){
        const course = new Course(req.body);
        course.save()
         .then(() => res.redirect('/course'))
         .catch(next);
     }

    //get /course/:id/edit
       edit(req,res,next){
        Course.findById(req.params.id)
           .then(course => res.render('edit',{
               course: mongooseToObject(course)
           }))
           .catch(next)
    
     }  
     //put /course/:id
     update(req, res , next) {
            Course.updateOne({_id: req.params.id}, req.body)
             .then(() => res.redirect('/me/stored/course'))
             .catch(next);
     }


     //delete  course/:id
     destroy(req, res, next) {
        Course.delete({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
     }

      //delete  course/:id/forceDelete
      forceDestroy(req, res, next) {
        Course.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
     }

     //patch  course/:id/store
     restore(req, res, next) {
        Course.restore({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
     }

    //post  course/hanlde-form-actions
     handleFormActions(req, res, next){
            switch(req.body.action) {
                case 'delete':
                    Course.delete({_id: {$in: req.body.courseIds }})
                    .then(() => res.redirect('back'))
                    .catch(next)
                     break;
                default:
                    res.json({message:'action is invalid'})
            }
     }

     //post  course/trash/hanlde-form-actions
     trashHandleFormActions(req, res, next){
        switch(req.body.action) {
            case 'restore':
                Course.restore({_id: {$in: req.body.courseIds }})
                .then(() => res.redirect('back'))
                .catch(next)
                 break;
            case 'deleteForce':
                Course.deleteMany({_id: {$in: req.body.courseIds }})
                .then(() => res.redirect('back'))
                .catch(next)
                 break;
            default:
                res.json({message:'action is invalid'})
        }
 }
}


module.exports = new CourseController;