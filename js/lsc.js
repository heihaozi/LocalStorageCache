var lsc = (function (self) {
    var prefix = 'one_more_lsc_'
    var list = [];
    self.isDebug = false;
    self.init = function () {
        var start = new Date().getTime();
        var keys = Object.keys(localStorage);
        var reg = new RegExp('^' + prefix);
        var temp = [];
        for (var i = 0; i < keys.length; i++) {
            if (reg.test(keys[i])) {
                temp.push(keys[i]);
            }
        }
        list = temp;
        var time = new Date().getTime() - start;
        if (self.isDebug) console.log(`init with ${time} ms, list.length:${list.length}`);
    };
    self.init();
    self.check = function () {
        var start = new Date().getTime();
        if (!list || list.length == 0) {
            return;
        }
        var checkCount = 0;
        while (checkCount < 500) {
            var expireCount = 0;
            for (var i = 0; i < 20; i++) {
                if (list.length == 0) {
                    break;
                }
                var index = Math.floor(Math.random() * list.length);
                var key = list[index];
                var val = localStorage.getItem(list[index]);
                if (!val) {
                    if (self.isDebug) console.log(`get null, key:${key}, expireCount:${expireCount}`);
                    list.splice(index, 1);
                    expireCount++;
                    continue;
                }
                val = JSON.parse(val);
                if (val.expires < new Date().getTime()) {
                    if (self.isDebug) console.log(`key expires, key:${key}, expireCount:${expireCount}`);
                    list.splice(index, 1);
                    localStorage.removeItem(key);
                    expireCount++;
                }
            }
            if (expireCount <= 5 || list.length == 0) {
                break;
            }
            checkCount++;
        }
        var time = new Date().getTime() - start;
        if (self.isDebug) console.log(`check with ${time} ms, checkCount:${checkCount}`);
    }
    window.setInterval(self.check, 1000);

    self.set = function (key, val, expires) {
        key = prefix + key;
        val = JSON.stringify({'val': val, 'expires': new Date().getTime() + expires * 1000});
        localStorage.setItem(key, val);
        list.push(key);
    };
    self.get = function (key) {
        key = prefix + key;
        var val = localStorage.getItem(key);
        if (!val) {
            if (self.isDebug) console.log(`get null, key:${key}`);
            return null;
        }
        val = JSON.parse(val);
        if (val.expires < new Date().getTime()) {
            if (self.isDebug) console.log(`key expires, key:${key}`);
            localStorage.removeItem(key);
            return null;
        }
        return val.val;
    };
    self.getList = function () {
        return list;
    }
    return self;
}(lsc || {}));