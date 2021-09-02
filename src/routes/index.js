const meRouter = require('./me');
const newsRouter = require('./news');
const siteRouter = require('./site');
const courseRouter= require('./course');
const courseDetailRouter= require('./courseDetail');


function route(app) {
    app.use('/courseDetail',courseDetailRouter);
    app.use('/course',courseRouter);
    app.use('/me',meRouter);
    app.use('/news', newsRouter);
    app.use('/', siteRouter);
}

module.exports = route;