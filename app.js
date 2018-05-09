
var express = require('express');
var session = require('express-session');
var compression = require('compression');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var api = require('./routes/api-filter'); // @自定义的中间件
var routes = require('./routes/index'); // @路由模块
var auth = require('./routes/auth-filter'); // @路由模块
var localMockData = require('./routes/local-mock-data'); // @本地假数据

var app = express();

// @view engine setup，设置模板引擎
// @如果没有设置 view engine，您需要指明视图文件的后缀，否则就会遗漏它。
// app.get('/', function (req, res) {
//   res.render('index', { title: 'Hey', message: 'Hello there!'});
// });
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// @在app.js中使用的中间件都是应用级中间件
// @使用app.use()或者app.MEHTOD()
// @有三种方式
// 1. 未挂载路径的中间件
// 2. 挂载了路径的中间件
// 		2.1 使用的app.use()的方式
// 		2.2 使用的app.MRTHOD()的方式

app.use(compression());

// @uncomment after placing your favicon in /public
// @意思是，将项目需要的网站 favicon 放在 public 的直接路径下即可
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// @logger
app.use(logger('dev'));

// @body-parser是一个HTTP请求体解析中间件，否则，默认只能解析GET请求
app.use(bodyParser.json()); // @解析 application/json
app.use(bodyParser.urlencoded({ extended: false })); // @解析 application/x-www-form-urlencoded

// @cookie
app.use(cookieParser());

// @session
app.use(session({
	secret: 'bugu_bus_secret',
	name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
	cookie: { maxAge: 3600 * 1000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
	resave: true,
	saveUninitialized: true,
	rolling: true
}));

// @处理静态资源，语法 express.static(静态目录, [options])，唯一内置中间件
// @设置浏览器缓存，缓存参数
// @这个缓存不好处理，最好等到服务器上线再开启
const expressStaticOptions = {
	dotfiles: 'ignore',
	etag: false,
	extensions: ['css', 'png', 'gif', 'jpg', 'js'],
	// index: true,
	maxAge: '1800000', // @半小时
	redirect: true,
	setHeaders: function (res, path, stat) {
		// res.set('x-timestamp', Date.now());
		// res.setHeader("Cache-Control","Expires");
		// res.setHeader("Cache-Control","no-cache");
		// res.setHeader("Cache-Control", "public, max-age=1800000");
	}
};

app.use(express.static(path.join(__dirname, 'public/spatest')));
// app.use(express.static(path.join(__dirname, 'public/dist/spatest')));

// @过滤掉前缀是api的服务接口
// @挂载至 '/spatest/api' 路劲上的中间件，任何指向 '/spatest/api' 的请求都会执行它，api本质是一个函数
// app.use('/spatest/api', api); // @中间件，截取发起HTTP通信后的请求URL，并进行了代理任务。

// app.use('/spatest/auth', auth); // @用户登录路由

app.use('/', routes); // @基本路由

app.use('/guizhoubus/wechat', localMockData); // @Mock数据的路由

// @下面是错误处理中间件，使用四个参数，(err, req, res, next)
// @虽然下面这个没有使用err参数，但是使用了Error对象来处理了
// @catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

module.exports = app;

// @使用 app.set() 设置端口号变量，默认为3335端口
app.set('port', process.env.PORT || '3335');

// @监听端口，使用 app.get() 获取设置值端口号变量值
app.listen(app.get('port'), function () {
	console.log('川梦大法师报告：项目已启动，端口是 ' + app.get('port'));
});
