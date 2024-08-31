function cnBaiduUnionShow(dom,url,id){
	const reg = new RegExp('^(?:[a-z+]+:)?//','i');
	const baseurl = '//bd-china-1.appmobile.cn';
	const newurl = function(url){
		let u = reg.test(url) ? url : (baseurl+url);
		return u;
	};
	const addbaidu = function(dom,url){
		let d = document.createElement('script');
		d.setAttribute('type','text/javascript');
		d.setAttribute('src',url);
		document.getElementById(dom).appendChild(d);
	};
    if(/NewsArticle|GoldBrowser|WukongSearch|wksearch/i.test(navigator.userAgent)&&id){
        if(id=='0'){
            document.getElementById(dom).style.display = 'none';   
        }else if(id.indexOf('/')!=-1){
			addbaidu(dom,newurl(id));
		}else{
            (window.slotchbydup=window.slotchbydup||[]).push({
                id: id,
                container: dom,
                size: '20,6',
                display: 'inlay-fix'
            });
            document.getElementById(dom).className = 'prevPage'; 
        }
    }else{
		addbaidu(dom,newurl(url));
    }
};