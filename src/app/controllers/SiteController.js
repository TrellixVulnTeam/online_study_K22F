const Course = require('../models/Course');
const {multipleMongooseToObject} =  require('../../util/mongose');
class SiteController{


    //get  /home
    index(req,res, next){
        Course.find({})
            .then(courses => {
             res.render('home', {
                 courses : multipleMongooseToObject(courses)
                });
            })
            .catch(next)
    }


    //get  /search
    search(req,res){
        res.render('search');
    }
}


module.exports = new SiteController;