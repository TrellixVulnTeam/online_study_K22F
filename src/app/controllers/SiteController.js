const Course = require('../models/Course');
const {multipleMongooseToObject} =  require('../../util/mongose');
const { renderSync } = require('node-sass');
class SiteController{


    //get  /home
    index(req,res, next){
    //    res.send('hello')
        Course.find({}).skip(0).limit(8)
            .then(courses => {
                    res.render('home', {
                        courses : multipleMongooseToObject(courses),
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