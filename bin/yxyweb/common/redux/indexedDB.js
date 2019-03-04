'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.openDB = openDB;
exports.IDB_saveData = IDB_saveData;
exports.IDB_deleteOneData = IDB_deleteOneData;
exports.IDB_deleteSomeData = IDB_deleteSomeData;
exports.IDB_searchData = IDB_searchData;
exports.IDB_getData = IDB_getData;

var dbName = 'off-lineDB',
    // 数据库名
daVer = 1,
    // 数据库版本号
db = '',
    // 用于数据库对象
dbData = []; // 用于临时存放数据的数组

// 连接数据库
function openDB(dbName, daVer, tables) {
    return new Promise(function (resolve, reject) {
        var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
        if (!indexedDB) {
            console.log("你的浏览器不支持IndexedDB");
        }
        var request = indexedDB.open(dbName, daVer);
        request.onsuccess = function (e) {
            db = e.target.result;
            window.__db = db;
            console.log('连接数据库成功');
            // 数据库连接成功后渲染表格
            // vm.getData();
            db.onclose = function (e) {
                console.log('数据库意外关闭');
            };
            db.onversionchange = function (e) {
                console.log('数据库版本变化时触发（发生upgradeneeded事件，或调用indexedDB.deleteDatabase()）');
            };
            resolve(true);
        };
        request.onerror = function () {
            console.log('连接数据库失败');
            resolve('连接数据库失败');
        };
        request.onblocked = function (e) {
            console.log('上一次的数据库连接还未关闭');
        };
        request.onupgradeneeded = function (e) {
            db = e.target.result;
            tables.forEach(function (name) {
                if (!db.objectStoreNames.contains(name)) {
                    if (name == 'offlineLogin' || name == 'metaData' || name == 'billNodata') {
                        var store = db.createObjectStore(name, { keyPath: 'attrKey' });
                    } else {
                        var store = db.createObjectStore(name, { keyPath: 'indexedDB_id', autoIncrement: true });
                        // var idx = store.createIndex('index','username',{unique: false}) 暂不建索引
                    }
                }
            });
        };
    });
}

/**
* 保存数据
* @param {Object} data 要保存到数据库的数据对象
*/
function IDB_saveData(data, dbTableName) {
    return new Promise(function (resolve, reject) {
        var name = dbTableName ? dbTableName : 'save_data';
        var tx = db.transaction(name, 'readwrite');
        var store = tx.objectStore(name);
        var req = store.put(data);
        req.onsuccess = function () {
            console.log('成功保存id为' + this.result + '的数据');
            resolve(true);
        };
        req.onerror = function (e) {
            console.log('保存失败');
            console.log(e.target.result.error);
            cb.utils.alert('缓存数据失败！', 'error');
            reject(e.target.result);
        };
    });
}

/**
* 删除单条数据
*/
function IDB_deleteOneData() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return new Promise(function (resolve) {
        var id = options.id,
            dbTableName = options.dbTableName;

        dbTableName || (dbTableName = 'save_data');
        var tx = db.transaction(dbTableName, 'readwrite');
        var store = tx.objectStore(dbTableName);
        var req = store.delete(id);
        req.onsuccess = function () {
            // 删除数据成功之后重新渲染表格
            // vm.getData();
            resolve('删除成功');
        };
        req.onerror = function () {
            resolve('删除失败');
        };
    });
}

/**
* @param {obj} options 
* @returns {string} '删除成功' '删除失败'
*/
function IDB_deleteSomeData() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return new Promise(function (resolve) {
        var id = options.id,
            dbTableName = options.dbTableName;

        dbTableName || (dbTableName = 'save_data');
        var tx = db.transaction(dbTableName, 'readwrite');
        var store = tx.objectStore(dbTableName);
        if (Array.isArray.call(null, id) && id.length > 0) {
            var _loop = function _loop(i, length) {
                req = store.delete(id[i]);

                req.onsuccess = function () {
                    console.log('\u5220\u9664\u591A\u6761\u6570\u636E\u65F6\u5019\uFF0Cid\u4E3A\uFF1A' + id[i] + '\u6210\u529F');
                };
                req.onerror = function (e) {
                    console.error('\u5220\u9664\u591A\u6761\u6570\u636E\u65F6\u5019\uFF0Cid\u4E3A\uFF1A' + id[i] + '\u6570\u636E\u5220\u9664\u65F6\u5019\u51FA\u9519\uFF1B\u9519\u8BEF\u4E3A\uFF1A' + e);
                };
            };

            for (var i = 0, length = id.length; i < length; i++) {
                var req;

                _loop(i, length);
            }
        }
        tx.oncomplete = function (e) {
            resolve('删除成功');
        };
        tx.onerror = function (e) {
            resolve('删除失败');
            console.error('删除多条数据时候tansaction error: ' + e);
        };
    });
}

/**
* 检索全部数据
* @param {boolean} onlyCheck 只判断数据库里是否有数据
*/
function IDB_searchData() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var onlyCheck = options.onlyCheck,
        dbTableName = options.dbTableName;

    return new Promise(function (resolve, reject) {
        var name = dbTableName ? dbTableName : 'save_data';
        var tx = db.transaction(name, 'readonly');
        var store = tx.objectStore(name);
        var range = IDBKeyRange.lowerBound(1);
        var req = store.openCursor(range, 'next');
        // 每次检索重新清空存放数据数组
        dbData = [];
        req.onsuccess = function () {
            var cursor = this.result;
            if (cursor) {
                if (onlyCheck) {
                    dbData.push(cursor.value);
                    resolve(dbData);
                    return;
                }
                // 把检索到的值push到数组中
                dbData.push(cursor.value);
                cursor.continue();
            } else {
                // 数据检索完成后执行回调函数
                // callback && callback();
                resolve(dbData);
            }
        };
        req.onerror = function (e) {
            reject(e.target.result);
        };
    });
}
/**
* @return {obj} 查询一条值
* @param {String} key 查询主健
* @param {String} dbTableName 数据表名称
*/
function IDB_getData() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return new Promise(function (resolve, reject) {
        var key = options.key,
            dbTableName = options.dbTableName;

        var tx = db.transaction(dbTableName, 'readonly');
        var store = tx.objectStore(dbTableName);
        var req = store.get(key);

        req.onsuccess = function (e) {
            resolve(e.target.result);
        };
        req.onerror = function (e) {
            reject(e.target.result);
        };
    });
}