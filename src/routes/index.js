const meRouter = require('./me');
const newsRouter = require('./news');
const siteRouter = require('./site');
const courseRouter= require('./course');
const courseDetailRouter= require('./courseDetail');
const checkCookies = require('../app/controllers/CheckCookies');
const loginMiddleWare = require('../app/controllers/LoginMiddleWare');
const logoutMiddleWare = require('../app/controllers/LogoutMiddleWare');
const registerMiddleWare = require('../app/controllers/RegisterMiddleWare')

// const multer  = require('multer')
// const upload = multer({ dest: 'src/public/uploads/' })


function route(app) {
    app.use('/courseDetail',checkCookies.check,courseDetailRouter);
    app.use('/course',checkCookies.check,courseRouter);
    app.use('/me',checkCookies.check,meRouter);
    app.use('/news',checkCookies.check, newsRouter);

    app.get('/logout',logoutMiddleWare.logout);

    app.get('/login',loginMiddleWare.login);
    app.post('/login',loginMiddleWare.postlogin);

    app.get('/loginClient',loginMiddleWare.loginClient);
    app.post('/loginClient',loginMiddleWare.postloginclient);

    app.get('/register',registerMiddleWare.register);
    app.post('/register',registerMiddleWare.postregister);
    // app.post('/register', upload.single('avatar'),registerMiddleWare.postregister);

    app.use('/',checkCookies.check,siteRouter);
}

module.exports = route;