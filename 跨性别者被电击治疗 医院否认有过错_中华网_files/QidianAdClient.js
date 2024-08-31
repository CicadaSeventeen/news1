/**
 * @author zhangmuzhao
 * @email zhangmuzhao@sogou-inc.com
 * @copyright (C) http://xxx.com/xxx
 * @date 2019/1/28 3:16 PM
 * @desc 奇点广告客户端
 */
var QidianAdClient = function(paramPlatformId,
    paramPosId,
    paramToken,
    paramVersion) {
  var _url = "https://e.sogou.com/ads";
  var _platformId;
  var _posId;
  var _version;
  var _token;

  _platformId = paramPlatformId;
  _posId = paramPosId;
  _version = paramVersion;
  _token = paramToken;

  var _md5 = function(str){
    var hexcase = 1; /* hex output format. 0 - lowercase; 1 - uppercase        */
    var chrsz = 8; /* bits per input character. 8 - ASCII; 16 - Unicode      */

    function hex_md5(s) {
      return binl2hex(core_md5(str2binl(s), s.length * chrsz));
    }

    function core_md5(x, len) {
      x[len >> 5] |= 0x80 << len % 32;
      x[(len + 64 >>> 9 << 4) + 14] = len;

      var a = 1732584193;
      var b = -271733879;
      var c = -1732584194;
      var d = 271733878;

      for (var i = 0; i < x.length; i += 16) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;

        a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
        d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

        a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
        a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

        a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
        c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

        a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
        d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
      }
      return Array(a, b, c, d);
    }

    function md5_cmn(q, a, b, x, s, t) {
      return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
    }
    function md5_ff(a, b, c, d, x, s, t) {
      return md5_cmn(b & c | ~b & d, a, b, x, s, t);
    }
    function md5_gg(a, b, c, d, x, s, t) {
      return md5_cmn(b & d | c & ~d, a, b, x, s, t);
    }
    function md5_hh(a, b, c, d, x, s, t) {
      return md5_cmn(b ^ c ^ d, a, b, x, s, t);
    }
    function md5_ii(a, b, c, d, x, s, t) {
      return md5_cmn(c ^ (b | ~d), a, b, x, s, t);
    }

    function safe_add(x, y) {
      var lsw = (x & 0xFFFF) + (y & 0xFFFF);
      var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return msw << 16 | lsw & 0xFFFF;
    }

    function bit_rol(num, cnt) {
      return num << cnt | num >>> 32 - cnt;
    }

    function str2binl(str) {
      var bin = Array();
      var mask = (1 << chrsz) - 1;
      for (var i = 0; i < str.length * chrsz; i += chrsz) bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << i % 32;
      return bin;
    }

    function binl2hex(binarray) {
      var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
      var str = "";
      for (var i = 0; i < binarray.length * 4; i++) {
        str += hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 + 4 & 0xF) + hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 & 0xF);
      }
      return str;
    }

    return hex_md5(str);
  }

  var _numberFormat = function(num, length) {
    for(var len = (num + "").length; len < length; len = num.length) {
      num = "0" + num;
    }
    return num;
  }

  var _generateRequestId = function() {
    return _numberFormat(_platformId, 5) + _numberFormat(_posId, 7) + Date.now();
  }

  var _generateAuth = function(requestId) {
    return _md5(requestId + _token);
  }

  /**
   * 生成广告请求
   * @param adRequestParams 广告请求参数
   * @returns {{requestId: *, auth: (string|*), version: *, device: {deviceId: (string|string|boolean|string[]|ConstrainDOMStringParameters), network: number, deviceType: number}, imps: *[]}}
   */
  this.generateAdRequest = function(adRequestParams) {
    var requestId = _generateRequestId();
    var deviceId = "";
    /** if (adRequestParams.os != undefined) {
                if (adRequestParams.os.toLowerCase() == "android") {
                    deviceId = adRequestParams.imei.toUpperCase();
                } else if (adRequestParams.os.toLowerCase() == "ios") {
                    deviceId = adRequestParams.idfa.toUpperCase();
                }
            }**/
    return {
      "requestId": requestId,
      "auth": _generateAuth(requestId),
      "version": _version,
      "device": {
        "deviceId": adRequestParams.deviceId,
        "network": adRequestParams.network,
        "deviceType": 4,
        "userAgent": adRequestParams.userAgent
      },
      "imps": [{
        "id": 1,
        "count": adRequestParams.count,
      }],
    }
  }

  /**
   * 发送广告请求
   * @param adRequest 广告请求
   * @param successCallback 成功的回调
   */
  this.postAdRequest = function(adRequest, successCallback) {
    $.ajax({
      type: 'post',
      data: JSON.stringify(adRequest),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      url: _url,
      success: function(data) {
        successCallback && successCallback(data);
      },
      error: function(data) {
        console.log("Get ads failed!");
      }
    })
  }
};

(function (window, undefined){
    'use strict';

    //-----AdsTrack constructor-----
    function AdsTrack() {

    }
    AdsTrack.prototype = {
        constructor: AdsTrack,
        //a 是数组？
        isArray: function (a) {
            return "[object Array]" == Object.prototype.toString.call(a);
        },
        //利用image src 发送曝光
        log: function (url) {
            var img = new Image(),
                key = 'mediav_sio_log_' + Math.floor(Math.random() * 2147483648).toString(36);
            window[key] = img;
            img.onload = img.onerror = img.onabort = function () {
                img.onload = img.onerror = img.onabort = null;
                window[key] = null;
                img = null;
            };
            img.src = url;
        },
        /**
         * @function
         * @description 曝光监测
         * @param {object} container - 包含data-imptk的dom
         * */
        //展示曝光
        trackImptk: function(container){
            var imptk = null;
            try {
                imptk = JSON.parse(container.attr('data-impTrackUrls'));
            } catch (e) {
                imptk = container && container.attr('data-impTrackUrls') || [];
            }
            if (imptk) {
                imptk = this.isArray(imptk) ? imptk : imptk.split(',');
                for (var i = 0; i < imptk.length; i++) {
                    this.log(imptk[i]);
                    console.log('展示曝光：'+imptk);
                }
            }
        },
        /**
         * @function
         * @description 点击监测发送
         * @param {object} container - 包含data-clktk的dom
         * */
        trackClick: function(container){
            var clktk = null;
            try {
                clktk = JSON.parse(container.attr('data-clickTrackUrls'));
            } catch (e) {
                clktk = container && container.attr('data-clickTrackUrls') || [];
            }
            if (clktk) {
                clktk = this.isArray(clktk) ? clktk : clktk.split(',');
                for (var i = 0; i < clktk.length; i++) {
                    this.log(clktk[i]);
                    console.log('点击曝光：'+clktk);
                }
            }
        }
    };

    window.AdsTrack = AdsTrack;
    
    //-----Tools -----
    function Tools() {

    }
    Tools.prototype = {
        constructor: Tools,
        //通过类名选择器选择dom reference
        getByClass: function (className, context) {
            context = context || document;
            if (context.getElementsByClassName) {
                return context.getElementsByClassName(className);
            } else {
                context = context || document;
                var classes = className.split(" "),
                    classesToCheck = [],
                    elements = context.getElementsByTagName('*'),
                    current,
                    returnElements = [],
                    match;
                for (var k = 0, kl = classes.length; k < kl; k += 1) {
                    classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
                }
                for (var l = 0, ll = elements.length; l < ll; l += 1) {
                    current = elements[l];
                    match = false;
                    for (var m = 0, ml = classesToCheck.length; m < ml; m += 1) {
                        match = classesToCheck[m].test(current.className);
                        if (!match) {
                            break;
                        }
                    }
                    if (match) {
                        returnElements.push(current);
                    }
                }
                return returnElements;
            }
        },
        //伪数组转数组
        toArray: function makeArray(c) {
            try {
                return Array.prototype.slice.call(c);
            } catch (e) {
                var ret = [],
                    i = 0,
                    len = c.length;
                for (; i < len; i++) {

                    ret[i] = (c[i]);

                }
                return ret;
            }

        },
        //获取页面顶部被卷起来的高度
        scrollTop: function () {
            return Math.max(
                //chrome
                document.body.scrollTop,
                //firefox/IE
                document.documentElement.scrollTop);
        },
        //获取页面浏览器视口的高度
        windowHeight: function () {
            //document.compatMode有两个取值。BackCompat：标准兼容模式关闭。CSS1Compat：标准兼容模式开启。
            return (document.compatMode == "CSS1Compat") ?
                document.documentElement.clientHeight :
                document.body.clientHeight;
        },
        //获取ele到document顶部的距离
        getElementTop: function (elem) {

            if (typeof jQuery !== 'undefined') {
                return $(elem).offset().top;
            }

            var elemTop = elem.offsetTop;//获得elem元素距相对定位的父元素的top

            elem = elem.offsetParent;//将elem换成起相对定位的父元素

            while (elem != null) {//只要还有相对定位的父元素

                //获得父元素 距他父元素的top值,累加到结果中

                elemTop += elem.offsetTop;

                //再次将elem换成他相对定位的父元素上;

                elem = elem.offsetParent;

            }

            return elemTop;

        },
        //目标node是否出现在可视范围内
        isView: function (node) {
            var $this = this;
            if (!node) {
                return false
            }
            var nodeTop = this.getElementTop(node);
            var bottomTop = nodeTop + node.offsetHeight;
            if ($this.scrollTop() < nodeTop && nodeTop < ($this.scrollTop() + $this.windowHeight())) {
                return true;
            } else if ($this.scrollTop() < bottomTop && bottomTop < ($this.scrollTop() + $this.windowHeight())) {
                return true;
            } else {
                return false;
            }
        }
    };
    
    window.Tools = Tools;

})(window);