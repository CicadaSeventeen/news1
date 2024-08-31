!function(i){
	var e = {};
	function r(t){
		var n;
		return (e[t] || (n = e[t] = {
			i: t,
			l: !1,
			exports: {}
		}, i[t].call(n.exports, n, n.exports, r), n.l = !0, n)).exports
	}
	r(r.s = 3)
}
([function(t, n, i){
	var p = i(2),
		m = (p.__slotChinaMap = p.__slotChinaMap || {}, p.__slotChinaMap),
		w = p.counter || {},
		g = (w.slotTotalCount = w.slotTotalCount || 1, w.slotCountIndex = w.slotCountIndex || {}, !1);
	t.exports = {
		u: '',
		h: 'china_union_callback',
		d: 'pos.china.com',
		v: 'https:',
		b: '__chinaadblockplus_',
		an: function(t, n, i) {
			n = n && n.stack ? n.stack : n;
			(i = i || {}).stack = encodeURIComponent(n)
		},
		ae: function(t, n, i){
			i = i || window;
			return i[t] || (i[t] = n)
		},
		ar: function(d){
			//this.ae(this.b, this.me),
			this.ae(this.b, this.Ht(this, this.me))
			d.ur()
		},
		be: function(t, n){
			return t.nodeName && t.nodeName.toUpperCase() === n.toUpperCase()
		},
		ye: function(t, n){
			try {
				var i = document.createElement('script');
				i.type = 'text/javascript', t.src ? i.src = t.src : i.text = t.text || t.textContent || t.innerHTML || '', n.insertBefore(i, n.firstChild)
			} catch {}
		},
		te: function(t, n) {
			if (!t) return !1;
			let url = n.clickUrl || '',
				target = n.target || 'target',
				title = n.content || '',
				html = '';
			html = url==='' ? title : '<a href="'+ url +'" target="'+ target +'">'+ title +'</a>';
			t.innerHTML = html;
			return !0
		},
		ie: function(t, n) {
			if (!t) return !1;
			let url = n.clickUrl || '',
				target = n.target || 'target',
				title = n.content || '',
				imgurl = n.imgPath || '',
				html = '';
			html = url==='' ? '<img alt="'+ title +'" src="'+ imgurl +'">' : '<a href="'+ url +'" target="'+ target +'"><img alt="'+ title +'" src="'+ imgurl +'"></a>';
			t.innerHTML = html;
			return !0
		},
		xn: function(t){
			return m[t]
		},
		xe: function(t, n){
			if (!t) return !1;
			t.innerHTML = n;
			for (var i = t.childNodes, e = [], r = 0; i[r]; r++) !this.be(i[r], 'script') || i[r]
				.type && 'text/javascript' !== i[r].type.toLowerCase() || e.push(i[r]);
			e.reverse();
			for (var o = 0, a = e.length; o < a; o++) this.ye(e[o].parentNode.removeChild(e[o]), t);
			return !0
		},
		Ct: function(t){
			var n = {
				'&quot;': '"',
				'&gt;': '>',
				'&lt;': '<',
				'&amp;': '&'
			};
			return t.replace(/&(lt|gt|nbsp|amp|quot);/g, function(t){
				return n[t]
			})
		},
		me: function(t){
			let n = t.code || '0';
			if('0' !== n){
				if(t){
					let i = t.placement,
						e = i.pdb_deliv,
						b = i.container.pId,
						a = e.deliv_des._html || {};
					b = this.xn(b);
					if(0 === parseInt(e.deliv_id, 10)) return this.Gr(n);
					e = this.Wt(b),
					'rich' === a.type ? (
						//document.write(this.Ct(a.content))
						this.xe(e, this.Ct(a.content))
					) : (
						'text' === a.type ? this.te(e, a) : this.ie(e, a)
					)
				}
			}
		},
		Wt: function(t){
			var n;
			return t.Vt || (n = t.containerId, t.Vt = this.g(n) || this.zt(n, 'div', function(t){
				var n, i = p.__slotChinaMap;
				for(n in i)
					if(i.hasOwnProperty(n) && i[n] && i[n].Vt === t) return !1;
				return !0
			})), t.Vt
		},
		g: function(t, n){
			return t ? document.getElementById(t) : null
		},
		jt: function(t, n){
			if (!t) return null;
			if (document.getElementsByClassName) i = document.getElementsByClassName(t);
			else
				for (var i = [], e = document.getElementsByTagName(n), r = 0, o = e.length; r <
					o; r++) {
					var a = e[r],
						u = a.getAttribute("class") || a.getAttribute("className");
					u && 0 <= u.indexOf(t) && i.push(a)
				}
			return i
		},
		zt: function(t, n, i){
			if (!t) return null;
			if (1 === t.nodeType) return t;
			var e = this.jt(t, n);
			if (i instanceof Function)
				for (var r = 0, o = e.length; r < o; r++)
					if (i(e[r])) return e[r];
			return e[0]
		},
		Re: function(t, n){
			var i = _[t] && _[t].paramsList;
			if (i)
				for (var e = 0; e < i.length; e++)
					if (i[e].key === n) return this.Ht(_[t], i[e].value)()
		},
		Vn: function(t, n){
			let i,d=n;
			d ? (n=document.createElement('script')) && (n.type='text/javascript', n['async'] = !0, n.src = t,
			(i = document.getElementById(d.containerId)) ? i.appendChild(n, i) : document.write('<script charset="utf-8" src="'+ t +'"><\/script>'))
			 : document.write('<script charset="utf-8" src="'+ t +'"><\/script>')
		},
		Sn: function(t){
			m[t.id] = t
		},
		In: function(t){
			var n = ('' + t.slotId).replace(/\s+/g, ''),
				i = (w.slotCountIndex[n] = w.slotCountIndex[n] || 0, {});
			return i.index = w.slotCountIndex[n], i.count = w.slotTotalCount,
				i.slotId = n,
				w.slotCountIndex[n] = w.slotCountIndex[n] + 1,
				n !== 0 && (w.slotTotalCount = w.slotTotalCount + 1),
				i.width = 0, i.height = 0, i
		},
		Mn: function(t){
			var n,
				i = t,
				e = t.id,
				c = this.b,
				r = '';
			r = this.v + '//' + this.d + '/pcfm/' + '?di=' + e + '&dcb=' + c,
			this.Vn(r, i)
		},
		On: function(){
			var t, n, i = m;
			for(t in i) t && i[t] && i.hasOwnProperty(t) && ((n = i[t]).status >= 2 || this.Mn(n))
		},
		Ht: function(t, n) {
			var i = Array.prototype.slice.apply(arguments),
				e = i.shift(),
				r = 'function' == typeof this ? this : i.shift();
			return function() {
				var t = Array.prototype.slice.apply(arguments);
				return r.apply(e, t.concat(i))
			}
		}
	}
},function(t, n, i){
	let d = i(0);
	t.exports = {
		ur: function(){
			this.delieveryChObjArray = this.delieveryChObjArray || [],
			window.slotchbydup = window.slotchbydup || [],
			window.slotchbydup && window.slotchbydup instanceof Array && (this.delieveryChObjArray = this.delieveryChObjArray.concat(window.slotchbydup),window.slotchbydup = []),
			this.Ao(),
			0 < this.delieveryChObjArray.length && this.On()
		},
		On: function(){
			for(var t = 0, n = this.delieveryChObjArray.length; t < n; t++){
				var i, e, r, o = this.delieveryChObjArray[t];
				o.hasOwnProperty('id') ? ( r = d.In({
						slotId: o.id,
					}),
					r.id = o.id,
					r.containerId = o.container || r.containerId,
					d.Sn(r)
				) : ''
			}
			this.delieveryChObjArray = [], d.On()
		},
		Ao: function() {
			window.slotchbydup = this, window.slotchbydup.load = !0
		},
		push: function(t) {
	 		this.delieveryChObjArray = this.delieveryChObjArray && [], this.delieveryChObjArray.push(t), this.On()
		}
	}
},function(t, n){
	var i = 'chinazx_delivery_global_counter',
		e = (window._CSF_ && !window._chinazx_union && (e.destroy = function(){
			try {
				window.top[i] = {}
			} catch (t) {
				window[i] = {}
			}
		}, window._chinazx_union = e), window._chinazx_union = window._chinazx_union || {});
	try {
		e.counter = window.top[i] = window.top[i] || {}
	} catch (o) {
		e.counter = window[i] = window[i] || {}
	}
	var r = '';
	e.domainInfo, e.domainInfo = {
		dup: r,
		pos: ''
	}, t.exports = e
},function(t, n, i){
	let s, d
	try{
		s = i(0), d = i(1), s.ar(d)
	}catch(h){
		
	}
}]);