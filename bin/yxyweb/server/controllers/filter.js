'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (router) {
  router.get('/client/getInitFilterInfo', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
      var query, querystring, filterId, solutionId, viewId, promises, results, i, len, defaultSolution, config;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              query = ctx.query, querystring = ctx.querystring;
              filterId = query.filterId, solutionId = query.solutionId, viewId = query.viewId;
              promises = [];

              promises.push((0, _util.uniformProxy)({
                url: (0, _util.combine)(_env2.default.HTTP_SERVICE_BASEURL, '/filterDesign/getFilterBase?' + querystring),
                method: 'GET'
              }));
              promises.push((0, _util.uniformProxy)({
                url: (0, _util.combine)(_env2.default.HTTP_SERVICE_BASEURL, '/filterDesign/getSolutionList?' + querystring),
                method: 'POST',
                params: { filterId: filterId }
              }));
              results = [];
              i = 0, len = promises.length;

            case 7:
              if (!(i < len)) {
                _context.next = 16;
                break;
              }

              _context.t0 = results;
              _context.next = 11;
              return promises[i];

            case 11:
              _context.t1 = _context.sent;

              _context.t0.push.call(_context.t0, _context.t1);

            case 13:
              i++;
              _context.next = 7;
              break;

            case 16:
              if (results[1].code === 200 && results[1].data && results[1].data.length) {
                defaultSolution = results[1].data.find(function (item) {
                  return item.isDefault;
                });

                if (!solutionId) solutionId = defaultSolution && defaultSolution.id || results[1].data[0].id;
              }
              solutionId = solutionId || 999;

              if (!solutionId) {
                _context.next = 25;
                break;
              }

              config = {
                url: (0, _util.combine)(_env2.default.HTTP_SERVICE_BASEURL, '/filter/' + solutionId + '/solutionFilters?' + querystring + '&solutionid=' + solutionId + (viewId && '&viewid=' + viewId)),
                method: 'GET'
              };
              _context.t2 = results;
              _context.next = 23;
              return (0, _util.uniformProxy)(config);

            case 23:
              _context.t3 = _context.sent;

              _context.t2.push.call(_context.t2, _context.t3);

            case 25:
              ctx.body = { code: 200, data: results };

            case 26:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
};

var _util = require('../../common/helpers/util');

var _env = require('../../../server/env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }