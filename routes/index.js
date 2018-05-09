
var express = require('express');
var router = express.Router();
var httpProxy = require('../routes/http-proxy');

// @取code，向微信获取用户信息，使用scope=snsapi_base方式
router.get('/', function(request, response, next) {
    // @渲染视图，并把后面的参数对象传给 index.ejs
    // response.send('hello');
    // res.render('index');
    response.render('index');
});

// router.get('/spatest', function(req, res, next) {
//     res.redirect('/spatest/index?');
// });
// router.get('/spatest/index', function(req, res, next) {

//     // @渲染视图，并把后面的参数对象传给 index.ejs
//     res.render('index', {
//         "version": '3.0'
//     });
//     res.end();

// });


module.exports = router;