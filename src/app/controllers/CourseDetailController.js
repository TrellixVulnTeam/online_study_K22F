const Course = require('../models/Course');
const CourseDetail = require('../models/CourseDetail');
const {multipleMongooseToObject} =  require('../../util/mongose');
const {mongooseToObject}  =  require('../../util/mongose');

class CourseDetailController{
   //POST /:term/:slug/trash/handle-form-actions
   trashHandleFormActions(req, res, next){
      switch(req.body.action) {
         case 'restore':
            CourseDetail.restore({_id: {$in: req.body.courseIds }})
             .then(() => res.redirect('back'))
             .catch(next)
              break;
         case 'deleteForce':
            CourseDetail.deleteMany({_id: {$in: req.body.courseIds }})
             .then(() => res.redirect('back'))
             .catch(next)
              break;
         default:
             res.json({message:'action is invalid'})
     }
   }
   //post /:term/:slug/handle-form-actions
   handleFormActions(req,res,next){
      switch(req.body.action) {
         case 'delete':
            CourseDetail.delete({_id: {$in: req.body.courseIds }})
             .then(() => res.redirect('back'))
             .catch(next)
              break;
         default:
             res.json({message:'action is invalid'})
     }
   }


    //delete  course/:id/forceDelete
    deleteForce(req, res, next) {
      CourseDetail.deleteOne({_id: req.params.id})
          .then(() => res.redirect('back'))
          .catch(next)
   }

    //patch  '/:term/:slug/:id/restore
    restore(req, res, next) {
      CourseDetail.restore({_id: req.params.id})
          .then(() => res.redirect('back'))
          .catch(next)
   }

   //get /:term/:slug/me/trash/courseDetail
   trash(req, res , next) {
      var pathArray = req.url.split('/');
      var [a,b,c,...rest]=pathArray;
      b.toString();
      c.toString();
      var newPath='/'+b+'/'+c;
      var slug=c;
      CourseDetail.findDeleted({_slug:slug})
      .then(courses =>  res.render('me/trash-course-detail',{
         courses:multipleMongooseToObject(courses),
         path:newPath,
      }))
     .catch(next)
   }

    //delete     /:term/:slug/:id
    destroy(req, res , next) {
      CourseDetail.delete({_id: req.params.id})
       .then(() => res.redirect('back'))
       .catch(next);
   }

   //put     /:term/:slug/:id
   update(req, res , next) {
      CourseDetail.updateOne({_id: req.params.id}, req.body)
       .then(() => res.redirect(`/courseDetail/${req.body.term}/${req.body._slug}/storeCourseDetail`))
       .catch(next);
   }


   //post /courseDetail/:term//:slug/store
   store(req,res, next){
      const courseDetail = new CourseDetail(req.body);
      courseDetail.save()
       .then(() => res.redirect(`/courseDetail/${req.body.term}/${req.body._slug}`))
       .catch(next);
   }

   //get /courseDetail/:term//:slug/edit
   edit(req,res, next){
      CourseDetail.findById(req.params.id)
         .then(course => res.render('editDetail',{
            course: mongooseToObject(course)
         }))
         .catch(next)
   }

   //get /courseDetail/:term//:slug/createDetail
   createDetail(req,res, next){
      var pathArray = req.url.split('/');
      var [a,b,c,...rest]=pathArray;
      b.toString();
      c.toString();
      Promise.all([CourseDetail.findWithDeleted({_slug: req.params.slug}),Course.find({slug : c})])
      .then(([courses,course]) => {
            res.render('courseDetailCreate', {
                  course:multipleMongooseToObject(course),
                  courses : multipleMongooseToObject(courses)
               })
            
      })
      // .catch(next)
      // CourseDetail.findWithDeleted({_slug: req.params.slug})
      // .then(courses =>res.render('courseDetailCreate', {
      //  courses : multipleMongooseToObject(courses)
      // }))
      // .catch(next)
   }

    //get /courseDetail/:term//:slug/createDetail
    storeCourseDetail(req,res, next){
       var pathArray = req.url.split('/');
       var [a,b,c,...rest]=pathArray;
       b.toString();
       c.toString();
       var newPath='/'+b+'/'+c;
       Promise.all([CourseDetail.find({_slug:req.params.slug}),CourseDetail.countDocumentsDeleted()])
         .then(([courses,deletedDetail]) => {
            res.render('me/stored-course-detail',{
                  courses:multipleMongooseToObject(courses),
                  path:newPath,
                  deletedDetail,
         })})
         .catch(next);
      // CourseDetail.find({_slug:req.params.slug})
      //  .then(courses => res.render('me/stored-course-detail',{
      //    courses:multipleMongooseToObject(courses),
      //    path:newPath,
      //  }))
      // .catch(next);
   }


    //get  /courseDetail/:term/:slug
    show(req,res, next){
      var pathArray = req.url.split('/');
      var [a,b,c,...rest]=pathArray;
      b.toString();
      Promise.all([ CourseDetail.find({_slug: req.params.slug}),Course.find({_term: b})])
      .then(([courses, courses1]) => res.render('courseDetail', {
         courses : multipleMongooseToObject(courses),
         courses1 : multipleMongooseToObject(courses1),
         query: req.url
      }))
      .catch(next)
   }

     
   //get  /courseDetail/:term
   term(req,res,next) {
      Promise.all([ Course.find({_term:req.params.term}),Course.countDocuments({_term:req.params.term})])
      .then(([courses, count]) => res.render('courseTerm',{
         courses: multipleMongooseToObject(courses),
         count
      }))
      .catch(next)


   }

    
}


module.exports = new CourseDetailController;