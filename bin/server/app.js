'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _koaLogger = require('koa-logger');

var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _koaCompress = require('koa-compress');

var _koaCompress2 = _interopRequireDefault(_koaCompress);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _viewhook = require('./middlewares/viewhook');

var _viewhook2 = _interopRequireDefault(_viewhook);

var _matchRoute = require('./middlewares/matchRoute');

var _matchRoute2 = _interopRequireDefault(_matchRoute);

var _auth = require('./middlewares/auth');

var _auth2 = _interopRequireDefault(_auth);

var _log4js = require('./middlewares/log4js');

var _log4js2 = _interopRequireDefault(_log4js);

var _controllers = require('./controllers');

var _controllers2 = _interopRequireDefault(_controllers);

var _env = require('./env');

var _env2 = _interopRequireDefault(_env);

require('../yxyweb/common/helpers/polyfill');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import routes from '../common/redux/routes'

// import winston from './middlewares/winston'
require('isomorphic-fetch');

new _koa2.default().use((0, _log4js2.default)()).use((0, _auth2.default)()).use((0, _viewhook2.default)({ beautify: _env2.default.HTTP_HTML_BEAUTIFY }))
// .use(matchRoute())
// .use(winston())
// .use(log4js())
.use((0, _koaLogger2.default)()).use((0, _koaCompress2.default)()).use((0, _koaBodyparser2.default)({ enableTypes: ['json'], jsonLimit: '10mb' })).use(_controllers2.default.routes()).use(_controllers2.default.allowedMethods()).use((0, _koaStatic2.default)(_path2.default.join(process.cwd(), 'static', 'public'), { maxage: 365 * 24 * 60 * 60 * 1000 })).use((0, _koaStatic2.default)(_path2.default.join(process.cwd(), 'home'))).use((0, _koaStatic2.default)(_path2.default.join(process.cwd(), 'static'))) // , { maxage: 365 * 24 * 60 * 60 * 1000 }
.listen(_env2.default.HTTP_SERVER_PORT);

console.log(_chalk2.default.blue('listening on port ' + _env2.default.HTTP_SERVER_PORT + ' -- ' + process.env.NODE_ENV));