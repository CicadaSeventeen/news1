/**
 * 首页轮播图
 */
function focusInit() {
    if ($(".focus-swiper").length < 1) { return false };
    var swiper = new Swiper('.focus-swiper .swiper-container', {
        loop: true,
        lazy: true,
        spaceBetween: 0,
        pagination: {
            el: '.focus-swiper .swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
    });
};
/**
 * 广告循环显示
 */
function ggloop(obj) {
    if ($(obj).length <= 0) {return false;};
    var elements = [],i = 0;
    obj.find("div[id^='list_']").each(function(index, element) {
        elements.push(element);
        if (index == 2 + i * 3) {
            $(elements).wrapAll('<div class="listWall"></div>');
            elements.length = 0;
            i++;
        }
    });
    var len = obj.find('.listWall').length,
    adlen = obj.find('.sptpAD').length;
    if (len < adlen) {
		for (var j = 0; j < adlen-len; j++) {
			$(obj).find(".sptBox .sptpAD:last-child").remove();
		}
    }
    for(var j = 0; j < len-adlen; j++) {
        $(obj).find(".sptBox").get(0).innerHTML += $(obj).find('.sptpAD').eq(j%5).get(0).outerHTML;
    }
    obj.find('.sptBox .sptpAD').each(function(index, element) { //广告前插入新闻
        $(element).before(obj.find('.listWall').eq(index));
    });
    if ($('#js-defList').length > 0) { //列表页广告初始化前4条广告显示
        // var showadlen = parseInt(12/3);
        var showadlen = 4;
        for (var i = 0; i < showadlen; i++) {
            obj.find('.sptpAD').eq(i).show();
            obj.find('.sptpAD').eq(i).css('height','auto');
            obj.find('.sptpAD').eq(i).css('padding','10px 0');
        };
    };
};
/**
 * 内页广告
 */
function ggloopA(obj) {
    if ($(obj).length <= 0) {
        return false;
    };
    var elements = [],
        i = 0;
    obj.find("div[id^='list']").each(function(index, element) {
        elements.push(element);
        if (index == 1 + i * 2) {
            $(elements).wrapAll('<div class="listWall"></div>');
            elements.length = 0;
            i++;
        }
    });
    var len = obj.find('.listWall').length,
        adlen = obj.find('.sptBox .sptpAD').length; //#3294
    //console.log(adlen-len)
    if (len < adlen) {
        for (var j = 0; j < adlen - len; j++) { //12
            $(obj).find(".sptBox .sptpAD:last-child").remove();
        }
    }
    for (var j = 0; j < len - adlen; j++) { //12
        if (j % 5 !=4) {//#3526 第二个广点通广告，不循环
            $(obj).find(".sptBox").get(0).innerHTML += $(obj).find('.sptpAD').eq(j % 5).get(0).outerHTML;
        }
    }
    obj.find('.sptBox .sptpAD').each(function(index, element) { //广告前插入新闻
        $(element).before(obj.find('.listWall').eq(index));
    });
    //qdSgFn();
};
/**
 * 获取页面总的新闻条数
 */
function getNewsTotalCount(newsinfos, reg) {
    var news_totalcount = 0;
    if (newsinfos == null || newsinfos.length == 0) {
        return news_totalcount;
    }
    //获取总新闻条数
    for (var i = 0; i < newsinfos.length; i++) {
        var id = newsinfos[i].id;
        if (reg.test(id)) {
            news_totalcount++;
        }
    }
    return news_totalcount;
}
/**
 * 控制显示更多时页面新闻信息的隐藏于显示
 */
function setNewsInfoDisplay(newsinfos, news_index, reg, eleId) {
    if (newsinfos != null && newsinfos.length > 0) {
        var index = 0;
        for (var i = 0; i < newsinfos.length; i++) {
            var element = newsinfos[i];
            var id = element.id;
            if (reg.test(id)) {
                index++;
                if (index <= news_index) {
                    element.style.display = "block";
                    //获取该元素下所有的img标签
                    /*var imgList = element.getElementsByTagName("img");
                    if (imgList != null && imgList.length > 0) {
                        for (var j = 0; j < imgList.length; j++) {
                            var imgInfo = imgList[j];
                            if (imgInfo.hasAttribute("data-src") && imgInfo.hasAttribute("src")) {
                                var dataSrc = imgInfo.getAttribute("data-src");
                                imgInfo.setAttribute("src", dataSrc);
                            }
                        }
                    }*/
                } else {
                    element.style.display = "none";
                }
            }
        }
    }
    //更新当前页面显示新闻条数的字段
    if (document.getElementById(eleId + "_news_index")) {
        document.getElementById(eleId + "_news_index").value = news_index;
    } else {
        //document.getElementById(eleId).innerHTML = document.getElementById(eleId).innerHTML + "<input type=\"hidden\" id=\"" + eleId + "_news_index\" value=\"" + news_index + "\" >";
        var node = document.createElement("input"); //创建一个input节点
        node.type = "hidden";
        node.id = eleId + "_news_index";
        node.value = news_index;
        document.getElementById(eleId).appendChild(node);
    }
}
function setListMore() {
	if (document.getElementById("js-defList")) {
        var artiConList = document.getElementById("js-defList");
        var reg = new RegExp("^list_[1-9]+[0-9]*$");
        var news_totalcount = 0; //新闻总条数
        var newsinfos = artiConList.getElementsByTagName("div");
        //每次点击加载更多显示的新闻条数
        var newsShowNum = 17;
        //设置初次显示新闻条数，如果未设置，初次显示每次点击加载的新闻条数，即10条
        var newsInitShowNum = 12;
        //获取总新闻条数
        var news_totalcount = getNewsTotalCount(newsinfos, reg);
        if (news_totalcount <= newsShowNum) {
            $('.js_listMore').hide();
        }
        setNewsInfoDisplay(newsinfos, newsInitShowNum, reg, "js-defList");
        function listMore() {
            var news_index = newsShowNum; //当前应该显示多少条新闻
            if (document.getElementById("js-defList_news_index")) {
                news_index = parseInt(document.getElementById("js-defList_news_index").value) + newsShowNum;
            }
            if (news_totalcount <= news_index) {
                if ($('.js_listMore').length > 0) {
                    $('.js_listMore').show();
                } else {
                    $('.js_listMore').hide();
                }
                news_index = news_totalcount;
            }
            setNewsInfoDisplay(newsinfos, news_index, reg, "js-defList");
            var len = $('.sptBox .listWall').length,
                adlen = $('.sptBox .sptpAD').length;
            if (len < adlen) {
                return false;
            }
            $('.sptBox .sptpAD').each(function(index, element) {
                var showindex = parseInt(document.getElementById("js-defList_news_index").value) / 3;
                if (index <= showindex) {
                    // $(this).show();
                    $(this).css('height', 'auto');
                    $(this).css('padding', '10px 0');
                }
            });
        }
        $(window).scroll(function() {
            var scrollTop = $(this).scrollTop(); //滚动条到顶部的垂直高度
            var scrollHeight = $(document).height(); //文档的高度
            var windowHeight = $(window).height(); //浏览器的高度
            if (scrollTop + windowHeight >= scrollHeight) {
                if (news_totalcount > newsShowNum) {
                    listMore();
                }
            }
        });
    };
}
/**
 * 列表页导航，当前状态
 */
function setActiveNav() {
    if ($("#js-chan-main-nav").length < 1) { return false };
    var elem = document.getElementById('js-chan-main-nav'),
        _a = elem.getElementsByTagName('a'),
        currentURL = '',
        thisURL = '';
    currentURL = window.location.origin + window.location.pathname; //去掉url的参数
    if (currentURL.indexOf('index.html') > -1) { //去掉index.html
        currentURL = currentURL.split('index.html');
        currentURL = currentURL[0];
    }
    currentURL = currentURL.toLowerCase();
    for (var i = 0; i < _a.length; i++) {
        thisURL = _a[i].href.toLowerCase();
        console.log(currentURL+',    '+thisURL)
        if (currentURL === thisURL) {
            _a[i].className = "cur";

        }
    }
};
// 军事-要闻
function showRank() {
   var itemRank1 = $('#rank1'),itemRank2 = $('#rank2');
   if ( itemRank1.length < 1 && itemRank2.length < 1) {return false;}
   $.getScript('https://rank.china.com/rank/cms/mili/day/rank_all.js',function(data, textStatus, jqxhr){
    if ( typeof(day_top) != "object" ){
        return false;
    };
    data = day_top.list;
    var _html1 = '',
        _html2 = '';
    function readNum(num) {
        var hit = num,
            result = '';
        if (hit <= 1000) {
            result = "5000+";
        } else if (hit >= 50000) {
            result = '50万+';
        } else {
            result = hit / 1000;
            result = Math.round(result) + '万+';
        }
        return result;
    };
    for (var i = 0; i < 3; i++) {
        var data_read = readNum(data[i].hit);
        if (data[i].imgurl != '') {
            _html1 += '<div class="item item-default clearfix" id="list_'+(i+1)+'">';
            _html1 += '  <a href="'+ data[i].url +'">';
            _html1 += '    <div class="item-img"><img src="'+ data[i].imgurl +'" alt=""></div>';
            _html1 += '    <h3 class="item-tit">'+ data[i].title +'</h3>';
            _html1 += '    <div class="item-foot item-foot-rank">';
            if (data[i].sourceName != '') {
                _html1 += '      <span class="source">'+ data[i].sourceName +'</span>';
            } else {
                _html1 += '      <span class="source">中华网</span>';
            }
            _html1 += '      <span class="read">'+ data_read +'</span>';
            _html1 += '    </div>';
            _html1 += '  </a>';
            _html1 += '</div>';
        }
    }
    for (var i = 3; i <50; i++) {
        var data_read = readNum(data[i].hit);
        if (data[i].imgurl != '') {
            _html2 += '<div class="item item-default clearfix" id="list_'+(i+1)+'">';
            _html2 += '  <a href="'+ data[i].url +'">';
            _html2 += '    <div class="item-img"><img src="'+ data[i].imgurl +'" alt=""></div>';
            _html2 += '    <h3 class="item-tit">'+ data[i].title +'</h3>';
            _html2 += '    <div class="item-foot item-foot-rank">';
            if (data[i].sourceName != '') {
                _html2 += '      <span class="source">'+ data[i].sourceName +'</span>';
            } else {
                _html2 += '      <span class="source">中华网</span>';
            }
            _html2 += '      <span class="read">'+ data_read +'</span>';
            _html2 += '    </div>';
            _html2 += '  </a>';
            _html2 += '</div>';
        }
    }
    itemRank1.html(_html1);
    itemRank2.append(_html2);
    setTimeout(function(){
        ggloop($(".ggrank"));
        setListMore();
    },500);
  });
};
/* font size changer */
function doZoom(obj_target,size){
    var elem = document.getElementById(obj_target),
        defaultSize = elem.style.fontSize || 17;
    if ( size > 0 ) {
        elem.style.fontSize = (parseInt(defaultSize) + 1) + "px";
    };
    if ( size < 0 ) {
        elem.style.fontSize = (parseInt(defaultSize) - 1) + "px";
    };
};
/**
 * 列表的来源处理$('.defList')
 */
function listItemSouce(){
    if ($('.defList').length < 1) { return false };
    $.each($('.defList .source'),function(i,item){
        if ($(this).html().length == 0) {
            $(this).html('中华网');
        }
    });
}
/**
 * 阅读量展示
 */
function userReading(){
    if(!($('.read').length>0))return false;
    var _html = 'ids[]=',
        _dataStr = '',
        _data = [];
    $('.read[data-comment-id]').each(function(i){
        var _this = $(this).attr('data-comment-id');
        var d = (i==0) ? _this : '&ids[]='+_this;
        _html += d;
        _data[i] = _this;
        /*_dataStr += _this + ',';*/
    });
    /*var reg = /,$/gi;
    _dataStr=_dataStr.replace(reg,'');
    _data = _dataStr.split(',');*/
    $('.read').hide()
    // $.ajax({
    //     url:'//open-data.china.com/openapi/pv-for-3g?'+ _html,
    //     type:'get',
    //     dataType:'jsonp',
    //     jsonpCallback:'a',
    //     cache:true,
    //     success:function(res){
    //         for(var i=0; i<_data.length; i++){
    //             var _d = _data[i];
    //             $('.read[data-comment-id='+ _d +']').each(function(){
    //                 var _res = res.result[_d];
    //                 if(_res)$(this).html(res.result[_d]).show();
    //             })
    //         }
    //     },
    //     error:function(res){ 
    //         console.log('失败');
    //     }
    // });
};
/**
 * 随屏滚动
 */
function mediaFixed(){
    var _w = $(window),
        _enditem = $('.media-item'),
        _moveitem = $('.media-item-special'),
        _enditemtop = _enditem.offset().top - (_w.height() - _enditem.height());
    _moveitem.addClass('fixed');
    _w.scroll(function(){
        var scltop = _w.scrollTop();
        if(_moveitem.length>0){
            if(scltop<_enditemtop){
                _moveitem.addClass('fixed');
            }else{
                _moveitem.removeClass('fixed');
            }
        }
    });
};
// qidian
function qdSgFn(){
    if(typeof QidianAdClient == 'undefined')return false;
    var adsTrack = new AdsTrack(),//曝光方法实例
        myTools = new Tools(),//辅助工具实例
        imptkNodes = [],
        timer = null;
    /**
     * 是否左键和中键
     * @param  {event} 事件 
     * @return {b}
     */
    function isLeftOrMiddleClick(evt){
        evt = evt || window.event;
        if('buttons' in evt && typeof evt.buttons !== 'undefined'){
            return evt.buttons == 1 || evt.buttons == 4;
        }else if('which' in evt && typeof evt.which !== 'undefined'){
            return evt.which == 1 || evt.which == 2;
        }else{
            return evt.button == 1 || evt.button == 4;
        }
    };
    /**
     * 待循环检测的nodes
     * @param  {arr} nodes - 待检查是否可见的数组
     * @param  {arr} original - 待曝光的原始数组node数组进行判读后，待曝光元素加入原始数组
     * 不填写待曝光数组时，函数进行去除已曝光node操作
     * @return 待曝光的新数组
     */
    function checkLoop(nodes,original){
        var newNodes = original || [];
        nodes = '[object Array]' == Object.prototype.toString.call(nodes) ? nodes : nodes.toArray();
        for(var i = 0; i < nodes.length; i++){
            //nodes[i]进入可视范围？ 是：发送展示曝光，否：push到newNodes中，
            //myTools.isView(nodes[i]) ? adsTrack.trackImptk($(nodes[i])) : newNodes.push(nodes[i]);
            adsTrack.trackImptk($(nodes[i]));
        }
        return newNodes;//最终返回newNodes,删除已曝光的node
    };
    /**
     * 自定义事件，鼠标按下、抬起
     * @param  {item} dom - 元素
     * @param  {json} data - 数据
     */
    function userDefinedEvent(dom,data){
        var _data = data;
/*        dom.on({
            'mousedown':function(e){
                if(isLeftOrMiddleClick(e))_data.mouseDownTimestamp = new Date().valueOf();
            },
            'mouseup':function(e){
                if(_data.hasOwnProperty('mouseDownTimestamp') && _data.mouseDownTimestamp != ''){
                    var _this = $(this);
                    _data.mouseUpTimestamp = new Date().valueOf();
                    adsTrack.trackClick(_this);
                    _data.mouseDownTimestamp = '';
                }
            }
        });*/
        dom.on('click',function(e){
            var _this = $(this);
            adsTrack.trackClick(_this);
        });
    };
    function qdSgAd(id,item){
        var itemcount = 0,
            itemarray = [];
        $.each(item,function(i,value){
            if(item[i].length>0){
                itemarray.push(item[i]);
                itemcount++;
            }
        });
        if(itemcount==0)return false;
        var platformId = 463; // 此处使用实际的平台ID替换
        var posId = id; // 此处使用实际的广告位ID替换，如有多个，请自行处理
        var token = 'OnRa6PuK3nI7BEFzAAFpIA'; // 此处请使用实际的TOKEN替换
        var version = '2.4.0'; // 此处是使用实际的版本号替换
        var userAgent = navigator.userAgent;
        var client = new QidianAdClient(platformId, posId, token, version);
        var adRequest = client.generateAdRequest({
            "deviceId": '00493E186FCA67CB5B22426B6DBF1457',
            "network": 6,
            "count": itemcount,
            //"userAgent": userAgent,
            "userAgent":'Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Mobile Safari/537.36'
        });
        client.postAdRequest(adRequest, function(data){
            var mDataAll = data,
                mData = mDataAll.data.groups[0].ads,
                mDataLength = mData.length;
            if(mDataLength>0){
                for(var i=0; i<mDataLength; i++){
                    if(mData[i].nativeAdType=='2'){
                        var html = $('<div class="item item-onlyimg" data-impTrackUrls="'+ mData[i].impTrackUrls +'" data-clickTrackUrls="'+ mData[i].clickTrackUrls +'"><a href="'+ mData[i].link +'" target="_blank"><img src="'+ mData[i].imgs[0].url +'" alt=""><i>广告</i></a></div>');
                    }else{
                        var html = $('<div class="item item-default clearfix" data-impTrackUrls="'+ mData[i].impTrackUrls +'" data-clickTrackUrls="'+ mData[i].clickTrackUrls +'"><a href="'+ mData[i].link +'" target="_blank"><div class="item-img"><img src="'+ mData[i].imgs[0].url +'" alt=""><i>广告</i></div><h3 class="item-tit">'+ decodeURI(mData[i].title) +'</h3><div class="item-foot"><span class="source">'+ decodeURI(mData[i].source) +'</span></div></a></div>');
                    }
                    itemarray[i].append(html);
                    imptkNodes = checkLoop(html,imptkNodes);
                    userDefinedEvent(html,mData[i]);
                }
            }
        });
    };
    function init(){
        $('#wapTj').prepend($('<div id="m_sg_1"></div>'));
        $('#wapTj').append($('<div id="m_sg_2"></div>'));
        qdSgAd(7491,[$('#m_sg_1'),$('#m_sg_2')]);
        //qdSgAd(7491,0,$('#m_sg_1'));
        //qdSgAd(3859,1,$('#m_sg_2'));
        /*window.onscroll = function(){
            clearTimeout(timer);
            timer = setTimeout(function(){
                imptkNodes = checkLoop(imptkNodes);
            },50);
        }*/
    };
    init(); 
}
//cookie
(function(factory){if(typeof define==='function'&&define.amd){define(['jquery'],factory)}else if(typeof exports==='object'){factory(require('jquery'))}else{factory(jQuery)}}(function($){var pluses=/\+/g;function encode(s){return config.raw?s:encodeURIComponent(s)}function decode(s){return config.raw?s:decodeURIComponent(s)}function stringifyCookieValue(value){return encode(config.json?JSON.stringify(value):String(value))}function parseCookieValue(s){if(s.indexOf('"')===0){s=s.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,'\\')}try{s=decodeURIComponent(s.replace(pluses,' '));return config.json?JSON.parse(s):s}catch(e){}}function read(s,converter){var value=config.raw?s:parseCookieValue(s);return $.isFunction(converter)?converter(value):value}var config=$.cookie=function(key,value,options){if(value!==undefined&&!$.isFunction(value)){options=$.extend({},config.defaults,options);if(typeof options.expires==='number'){var days=options.expires,t=options.expires=new Date();t.setTime(+t+days*864e+5)}return(document.cookie=[encode(key),'=',stringifyCookieValue(value),options.expires?'; expires='+options.expires.toUTCString():'',options.path?'; path='+options.path:'',options.domain?'; domain='+options.domain:'',options.secure?'; secure':''].join(''))}var result=key?undefined:{};var cookies=document.cookie?document.cookie.split('; '):[];for(var i=0,l=cookies.length;i<l;i++){var parts=cookies[i].split('=');var name=decode(parts.shift());var cookie=parts.join('=');if(key&&key===name){result=read(cookie,value);break}if(!key&&(cookie=read(cookie))!==undefined){result[name]=cookie}}return result};config.defaults={};$.removeCookie=function(key,options){if($.cookie(key)===undefined){return false}$.cookie(key,'',$.extend({},options,{expires:-1}));return!$.cookie(key)}}));
function ipCity(){
    if(!($('#js-top-media').length>0))return false;
    var _cookieName = 'M_Qd_City',
        _cookieKey = $.cookie(_cookieName),
        _banCityIf = {
            'city': ['\u5317\u4eac']
        };
    function ipBan(s,a){
        var _a = a,
            _s = s,
            _r = true;
        for(var i=0, n=_a.length;i<n;i++){
            if(!(_s.indexOf(_a[i])<0)){
                _r=false;
                break
            }
        }
        return _r;
    };
    function add3gTopMedia(dom,url){
        var _id = dom;
        var d = document.createElement('script');
        d.setAttribute('type','text/javascript');
        d.setAttribute('src',url);
        _id[0].appendChild(d);
    }
    if(_cookieKey){
        if(_cookieKey=='add'){
            add3gTopMedia($('#js-top-media'),'//bd-china-1.appmobile.cn/site/lgf/openjs/y-oyhp/c.js');
            add3gTopMedia($('#js-search-media'),'//bd-china-1.appmobile.cn/site/q/production/lidrd_u/common/u/resource/r.js');
        }else{
			
        }
    }else{
        $.ajax({
            type: 'get',
            url: '//restapi.amap.com/v3/ip?output=json&key=a02c90e4bdbe5332219155481974e294',
            dataType: 'jsonp',
            cache: true,
            success: function(json){
                var _s = JSON.stringify(json),
                    _b = ipBan(_s,_banCityIf.city);
                var _soh = _b ? 'add' : 'subtract';
                $.cookie(_cookieName,_soh,{
                    expires:1,
                    path:'/'
                });
                if(_b){
                    add3gTopMedia($('#js-top-media'),'//bd-china-1.appmobile.cn/site/lgf/openjs/y-oyhp/c.js');
                    add3gTopMedia($('#js-search-media'),'//bd-china-1.appmobile.cn/site/q/production/lidrd_u/common/u/resource/r.js');
                }
            }
        })
    }
};
function toutiaoList(){
    var _item = $('#js-toutiaolist'),
        _count = 0,
        _startDom = 0,
        _status,
        _mediaNumBaidu = 0,
        _isFirst = true,
        _max = 9,
        _reformUrl = reVirtual();
    if(!(_item.length>0))return false;
    var jsname = _item.attr('data-toutiao');
    if(_reformUrl != ''){
        $('.header_bg a').each(function(i){
            var _this=$(this),_url=_this.attr('href');
            if(_url.indexOf('//')<0){
                if(!(_url.indexOf('/')<0)){
                    _this.attr('href',_reformUrl+_url)
                }
            }
        })
    }
    function reVirtual(){
        var _url = window.location.href,
            _condition = ['uctop','ucmil'],
            _newurl = '';
        for(var i=0; i<_condition.length; i++){
            if(!(_url.indexOf(_condition[i]) < 0)){
                _newurl = '/m_' + _condition[i];
                break;
            }
        }
        return _newurl;
    };
    var _bdArray= {
        'domain':'//bd-china-1.appmobile.cn',
        'list':[
            {'url':'/source/vqpr/static/py/resource/rr_z.js'},//mu列表页信息流1
            {'url':'/site/x/common/srt_r/openjs/at/source/tk.js'},//mu列表页信息流2
            {'url':'/production/av_u/openjs/w/resource/udwws.js'},//mu列表页信息流3
            {'url':'/common/b_wvx/common/v/production/exxv.js'}//mu列表页信息流4
        ],
        'article':[
        ]
    };
    var getRandomArr = function(Min,Max){
        var array = new Array();
        var cha=Max-Min;
        for(var i = 0; ; i++){
            if(array.length < cha){
                var randomNub = Min+(Math.floor(Math.random() * cha));
                if(-1 == $.inArray(randomNub, array)){
                    array.push(randomNub);
                }
            }else{
                break;
            }
        }
        return array;
    };
    var toutiaoReadNum = function(num){
        var hit = num,
            result = '';
        if(hit <= 1000){
            result = '5000+';
        }else if (hit >= 50000){
            result = '50万+';
        }else{
            result = hit / 1000;
            result = Math.round(result) + '万+';
        }
        return result;
    };
    var addBaidu = function(dom,url){
        var _id = $('#'+dom.attr('id'));
        var d = document.createElement('script');
        d.setAttribute('type','text/javascript');
        d.setAttribute('src',url);
        _id[0].appendChild(d);
    };
    var adv = function(baiduArr){
        var _baiduArr = baiduArr,
            _baiduNum = _bdArray.list.length;
        for(var i=0,j=_baiduArr.length; i<j; i++){
            var _bNum = _baiduArr[i];
            var _h = _bdArray.list[_bNum%4],
                _u = _bdArray.domain + _h.url;
            addBaidu($('#media-list-bd'+_bNum),_u);
        }
        _status = 1;
    };
    $.getScript('//m2.china.com/json/'+ jsname +'.js',function(){
        if(typeof(data) != 'object'){
            return false;
        };
        var _data = data,
            _datalength = _data.length;
        var rArr1 = getRandomArr(0,10);
        var rArr2 = getRandomArr(10,_datalength);
        var randomArr = rArr1.concat(rArr2);
        function addMore(){
            var _html = '',
                _bdArr = [];
            var addBaiduDom = function(){
                _html += '<div class="medialist media-bd" id="media-list-bd' + _mediaNumBaidu + '"></div>';
                _bdArr.push(_mediaNumBaidu);
                _mediaNumBaidu++;
            };
            if(_count>=_datalength){
                _status = 2;
                $('.js_listMore').html('查看更多请点击');
                return false;
            }
            for(var i=0; i<_max; i++){
                if(_count>=_datalength){
                    _status = 2;
                    $('.js_listMore').html('查看更多请点击');
                }else{
                    var addmeida = _startDom + _count;
                    if(addmeida%3==0 && addmeida!=0){
                        if(_isFirst){
                            addBaiduDom();
                            _isFirst = false;
                        }
                        addBaiduDom();
                    }
                    var _randomCount = randomArr[_count];
                    var _ntitle = _data[_randomCount].title.replace(/(<\/?a.*?>)|(<\/?span.*?>)/g,''),
                        _nurl = _data[_randomCount].wap_redirect_url,
                        _domain = [];
                    if(_reformUrl != ''){
                        _domain = _nurl.split('/');
                        if (_domain[2] == 'm2.china.com'){
                            _domain[2] += _reformUrl;
                            _nurl = _domain.join('/');
                        }
                    }
                    if(_data[_randomCount].old_pic != ''){
                        _html += '<div class="item item-default clearfix"><a href="'+ _nurl +'">';
                        _html += '<div class="item-img"><img src="'+ _data[_randomCount].old_pic +'"></div>';
                    }else{
                        _html += '<div class="item item-nopic clearfix"><a href="'+ _nurl +'">';
                    }
                    _html += '<h3 class="item-tit">'+ _ntitle +'</h3>';
                    _html += '<div class="item-foot">';
                    if(_data[_randomCount].source != ''){
                        _html += '<span class="source">'+ _data[_randomCount].source +'</span>';
                    }else{
                        _html += '<span class="source">中华网</span>';
                    }
                    _html += '</div>';
                    _html += '</a></div>';
                    _count++;
                }
            }
            _item.append(_html);
            if(_bdArr.length>0){
                adv(_bdArr);
            }else{
                _status = 1;
            }
        };
        addMore();
        $(window).on('resize scroll',function(){
            var scrollTop = $(this).scrollTop();
            var scrollHeight = $('#js-toutiaolist').height();
            var windowHeight = $(window).height();
            if(scrollTop + windowHeight >= scrollHeight){
                if(_status == 1){
                    _status = 2;
                    addMore();
                }
            }
        });  
    }); 
};
/**
 * 文章最后插入编辑
 */  
function editorMoveShow(){
    if(!($('.editor_author_moblie').length>0))return false;
	let editorDom = $('.editor_author_moblie'),
		editorTxtDom = $('#artiCon p:last');
	if(editorDom.text()!=''){
		editorDom.hide();
		let editorTxt = editorTxtDom.html();
		editorTxtDom.html(editorTxt+'<span class="editor_author_moblie">（'+editorDom.html()+'）</span>');
		/* 最后是文字p标签插入编辑名
		let editorTxtDom = $('#artiCon>p'),
			editorTxtDomLength = editorTxtDom.length-1;
		for(let i=editorTxtDomLength;i>0;i--){ 
			let thisDom = editorTxtDom.eq(i);
			let editorTxt = thisDom.html();
			if(!(/<img.*>/.test(editorTxt))){
				thisDom.html(editorTxt+'<span class="editor_author_moblie">（'+editorDom.html()+'）</span>');
				return false;
			}
		} */
	}
};

function isVivoBrowser(){
	return /VivoBrowser/.test(navigator.userAgent);
};
				
/**
 * 整体函数调用相关
 */  
function init(){
    // 列表页导航，当前状态
    setActiveNav();
    /* 首页轮播图 */
    focusInit();
    // 军事要闻；
    showRank();
    // 列表页广告循环显示
    ggloop($(".ggloop"));
    // 列表页更多显示
    if($('#rank1').length<1 && $('#rank2').length<1){
        setListMore();
    }
    // lazyload
    $("img.lazy").lazyload({
        effect: "fadeIn",
        placeholder:"/static/img/loading.png"
    });
	//
	editorMoveShow();
    // 终极页展开全文显示
	if($('#artiCon').length>0){
		//if($('.chan_newsVideo').length > 0 || $('.prevPage').length>0){
		if($('#arti .prevPage').length>0){
			//如果页面中有视频或者有分页,则不显示查看全文
		}else{
			var percent, article_height=$('#artiCon').height(), minH=1000;
			percent = Math.round((article_height-minH)/article_height*100);
			if(article_height<=minH){
				//
			}else{
				if(isVivoBrowser()){//vivo
					let vivoRandom = '_' + Math.random().toString(36).slice(2),
					    vivoDom = '<div id="' + vivoRandom + '"></div>',
						imgs = $('#artiCon img');
					$('#artiCon').append(vivoDom);
					(window.slotchbydup=window.slotchbydup || []).push({
						id: '16226928',
						container: vivoRandom
					});
					/* if(imgs.length>0){
						for(let i=0; i<imgs.length; i++){
							if(i==0 || i==2){
								let dom = $('<div id="arit_content_'+ i +'"></div>');
								imgs.eq(i).after(dom);
								var d = document.createElement('script');
								d.setAttribute('type','text/javascript');
								d.setAttribute('src','//bd-china-1.appmobile.cn/production/b/source/wv-exyef/y.js');
								dom[0].appendChild(d);
							}
						}
					} */
				}else{
					let readingHtml = '<div class="c_reading_0509 readshow" id="js_continue_read_btn"><strong>点击查看全文(剩余<em>'+ percent +'</em>%)</strong></div>';
					$('#artiCon').addClass('m_cut');
					$('#artiCon').append(readingHtml);
					$('#js_continue_read_btn').on('click',function(){
						$('#artiCon').removeClass('m_cut').addClass('re_cut');
						$(this).removeClass('readshow');
					});
				}
			}
		}
	};
    //列表的来源
    listItemSouce();
    //内页的来源处理
    listItemSouce();
    //阅读量     
    userReading();
    // cibn视频
    function videoNews_Callback(data) {
        if (document.getElementById('vArtiCon') != null) {
            document.getElementById('vArtiCon').innerHTML = data;
        }
    };
    //ipCity();
    //m2
    toutiaoList();
};
$(function(){
    init();
});