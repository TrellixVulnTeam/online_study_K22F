const Course = require('../models/Course');
const CourseDetail = require('../models/CourseDetail');
const {multipleMongooseToObject} =  require('../../util/mongose');
const {mongooseToObject} =  require('../../util/mongose');




class CourseController{


    //get  /course
    index(req,res, next){
       var  page = parseInt(req.query.page) ;
        var page = (page) ? parseInt(req.query.page) : 1
       
       if(page <1 ){
           page =1;
       }
       var skip = (page-1) * 9;
       Promise.all([Course.countDocuments({}),Course.find({}).skip(skip).limit(9)])
        .then(([count,courses])=>{
                res.render('course',{
                    courses : multipleMongooseToObject(courses),
                    count,
                    page,
                })
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

    //get  course/search
     search(req, res, next){
         var string =(req.body.search).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') .replace(/đ/g, 'd').replace(/Đ/g, 'D').replace(/y/g,'i');
            Course.find({})
            .then(results => {
                results.map(result => {result.name = result.name.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') .replace(/đ/g, 'd').replace(/Đ/g, 'D').replace(/y/g,'i')});
                results.map(result =>{result.teacher = result.teacher.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') .replace(/đ/g, 'd').replace(/Đ/g, 'D').replace(/y/g,'i')});
                results.map(result =>{result.term = result.term.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') .replace(/đ/g, 'd').replace(/Đ/g, 'D').replace(/y/g,'i')});
                            
                results=results.filter(result => {return result.name.includes(string) || result.teacher.includes(string) || result.term.includes(string);});
            
                var slug=[];
                results.map(result =>{slug.push(result.slug)});
                Promise.all([Course.find({slug:{$in:slug}}),Course.countDocuments({slug:{$in:slug}})])
                .then(([courses, count]) => res.render('search',{
                   courses: multipleMongooseToObject(courses),
                   count
                }))
                .catch(next)
               
            })
            .catch(next)
    }
}


module.exports = new CourseController;