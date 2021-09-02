class NewsController{


    //get  /news
    index(req,res){
        res.render('news');
    }

    //get  /news/:slug
    show(req,res){
        res.send('hihi');
    }
}


module.exports = new NewsController;