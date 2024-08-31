const wxapi = '//res.wx.qq.com/open/js/jweixin-1.6.0.js';
const soureUrl = window.location.href;
const ajaxMethod = {
	doAjax(url,params){
		return new Promise(resolve => {
		    //随机生成一个函数名
		    const funcName = `__callback__${Math.random().toString(36).slice(2)}__${Date.now()}`;
		    //设置为全局函数
		    window[funcName] = function(resp){
		        resolve(resp);
		    };
		    //创建一个script标签
		    const script = document.createElement('script');
		    //多个参数进行拼接
		    let paramStr = '';
		    for(var arr in params){
		        paramStr += '&' + arr + '=' + params[arr];
		    }
		    //给script中的src属性赋值
		    script.src = url + '?jsonp=' + funcName + paramStr;
		    //插入到body中
		    document.body.appendChild(script);
		    //等script标签加载完之后，清除标签和全局函数
		    script.onload = function() {
		        document.body.removeChild(script);
		        delete window[funcName];
		    }
		});
	},
};
//分享接口调用后，不再返回用户是否分享完成事件，即原先的cancel事件和success事件将统一为success事件
const pageShare = {
    init(opts){
        /*
		const ua = navigator.userAgent;
        const isWX = ua.match(/MicroMessenger\/([\d\.]+)/);
        const isQQ = ua.match(/QQ\/([\d\.]+)/);
        const isQZ = ua.indexOf('Qzone/') !== -1;
        isWX && this.initWX(opts);
        isQQ && this.initQQ(opts);
        isQZ && this.initQZ(opts);
		*/
		this.initWX(opts);
    },
    _require(url,onload){
        const doc = document;
        const head = doc.head || (doc.getElementsByTagName('head')[0] || doc.documentElement);
        const node = doc.createElement('script');
        node.onload = onload;
        node.onerror = function(){};
        node.async = true;
        node.src = url[0];
        head.appendChild(node);
    },
    initWX(data){
        if(!data.WXconfig){
            return;
        }
        this._require([wxapi],function(wx){
            if(!wx.config){
                wx = window.wx;
            }
            const conf = data.WXconfig;
            wx.config({
                debug: false,
                appId: conf.appId,
                timestamp: conf.timestamp,
                nonceStr: conf.nonceStr,
                signature: conf.signature,
                jsApiList: [
                    'updateAppMessageShareData',
                    'updateTimelineShareData',
                    'onMenuShareWeibo',
                    'onMenuShareAppMessage'
                ]
            })
            wx.error((res) => {
                console.log(res);
                //config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            })
            wx.ready(function(){
                const config = {
                    title: data.title, //分享标题
                    desc: data.summary, //分享描述
                    link: data.url, //分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: data.pic, //分享图标
                    type: 'link', //分享类型,music、video或link，不填默认为link
                    dataUrl: '', //如果type是music或video，则要提供数据链接，默认为空
                    success() {
                        //设置成功
                        data.callback && data.callback()
                    }
                }
                wx.updateAppMessageShareData(config); //“分享给朋友”及“分享到QQ”
                wx.updateTimelineShareData(config); //“分享到朋友圈”及“分享到QQ空间”
                wx.onMenuShareWeibo(config); //分享到腾讯微博
                wx.onMenuShareAppMessage(config); //安卓转发给失效问题处理
            })
        })
    }
};
const mintPrompt = {
	reconvert(str){
		str=str.replace(/(\\u)(\w{1,4})/gi,function($0){
			return (String.fromCharCode(parseInt((escape($0).replace(/(%5Cu)(\w{1,4})/g,"$2")),16))); 
		}); 
		str=str.replace(/(&#x)(\w{1,4});/gi,function($0){
			return String.fromCharCode(parseInt(escape($0).replace(/(%26%23x)(\w{1,4})(%3B)/g,"$2"),16)); 
		}); 
		str=str.replace(/(&#)(\d{1,6});/gi,function($0){
			return String.fromCharCode(parseInt(escape($0).replace(/(%26%23)(\d{1,6})(%3B)/g,"$2"))); 
		}); 
		return str;
	},
	share(obj){
	    if(!obj){
			return;
	    }
	    let shareUrl = window.location.href;
		let sharetitle = this.reconvert(obj.title);
	    const url = soureUrl.split('#')[0];
	    const data = {
			'link': url
	    };
	    //与路由路径保持一致传递进来 参数直接拼在后面
	    //默认分享的是本页 如果有地址修改默认地址
	    if(obj.path){
			shareUrl = `${url}#${obj.path}`;
	    }
	    ajaxMethod.doAjax(
			'//heron-app.china.com/a/wx/jssdkInfo',
			data
		).then(res => {
			if(res){
				const datas = res;
				pageShare.init({
					title: sharetitle, //分享标题
					summary: obj.summary, //分享内容
					//pic: obj.pic, //分享图片
					pic: 'https://3g.china.com/img/touch-icon.png',
					url: shareUrl, //分享链接
					WXconfig: {
						appId: datas.appId, //公众号的唯一标识
						timestamp: datas.timestamp, //生成签名的时间戳
						nonceStr: datas.nonceStr, //生成签名的随机串
						signature: datas.signature //签名
					}
				});
			}
		});
	},
};