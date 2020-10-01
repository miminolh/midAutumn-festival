var chomoo = new Object,
	shareModel = {
		imgUrl: "http://res.qiaomukeji.com/logo.jpg",
		lineLink: location.href,
		descContent: "",
		shareTitle: ""
	},
	authMode = {
		DEBUG: "debug",
		BASE: "base",
		USERINFO: "userinfo"
	};
! function() {
	function e(e, o) {
		e.indexOf("#") != -1 && (e = e.substr(0, e.indexOf("#")));
		var a = "";
		if(e.indexOf("?") == -1) return e;
		a = e.substr(e.indexOf("?") + 1);
		var t = "",
			n = "";
		if(a.indexOf("&") != -1) {
			t = a.split("&");
			for(i in t) t[i].split("=")[0] != o && (n = n + t[i].split("=")[0] + "=" + t[i].split("=")[1] + "&");
			return e.substr(0, e.indexOf("?")) + "?" + n.substr(0, n.length - 1)
		}
		return t = a.split("="), t[0] == o ? e.substr(0, e.indexOf("?")) : e
	}

	function o() {
		sessionStorage.setItem("oauthCheck", "qiaomu");
		var o = "snsapi_" + c.authMode,
			a = encodeURIComponent(e(window.location.href, "code")),
			t = "";
		t = c.isComponent ? "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + c.appid + "&redirect_uri=" + a + "&response_type=code&scope=" + o + "&state=mrlong&component_appid=" + c.component_appid + "#wechat_redirect" : "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + c.appid + "&redirect_uri=" + a + "&response_type=code&scope=" + o + "&state=mrlong#wechat_redirect", console.log(t), location.href = t
	}

	function a(e) {
		localStorage.setItem("weixinUserInfo_" + c.projectid + "_" + c.appid, JSON.stringify(e))
	}

	function t() {
		return c.isAuthStorage && localStorage.getItem("weixinUserInfo_" + c.projectid + "_" + c.appid) ? JSON.parse(localStorage.getItem("weixinUserInfo_" + c.projectid + "_" + c.appid)) : null
	}

	function n(e) {
		(e.flag || 0 == c.isQiYe) && a(e), e.data && (c.userInfo = e.data), c.authMode != authMode.DEBUG && s.browse(), "function" == typeof r.userReadyCallback && r.userReadyCallback()
	}
	var r = {
			userReadyCallback: function() {},
			wxJsReadyCallback: function() {},
			shareCallback: {
				AllShareSuccess: function() {},
				WeiboShareSuccess: function() {},
				QQShareSuccess: function() {},
				QZoneShareSuccess: function() {},
				TimelineShareSuccess: function() {},
				AppMessageShareSuccess: function() {}
			}
		},
		c = {
			projectid: "",
			authMode: authMode.USERINFO,
			appid: "wxe893bfa0b4fdf4cc",
			isComponent: !1,
			component_appid: "wx1964feb2d0297952",
			isQiYe: !1,
			isAuthStorage: !0,
			userInfo: {},
			userReady: function(e) {
				r.userReadyCallback = e
			},
			wxJsReady: function(e) {
				r.wxJsReadyCallback = e
			},
			init: function() {
				if(this.projectid || alert("未设置项目ID"), "debug" != this.authMode) {
					var e = t();
					if(e && e.flag) setTimeout(function() {
						n(e)
					}, 1);
					else {
						var a = chomooCommon.getUrlParam("code");
						if(console.log(a), !a) return void o();
						if(null == sessionStorage.getItem("oauthCheck") || "qiaomu" != sessionStorage.getItem("oauthCheck")) return void o();
						var i = {
							code: chomooCommon.getUrlParam("code"),
							projectid: this.projectid,
							appid: this.appid,
							componentappid: this.component_appid
						};
						this.isComponent ? chomooRequest.doAjax(i, "component/getWxUserInfo", n) : this.isQiYe ? chomooRequest.doAjax(i, "qiyewx/getWxUserInfo", n) : chomooRequest.doAjax(i, "weixin/getWxUserInfo", n)
					}
				} else s.browse();
				if(wx) {
					var r = location.href,
						c = this.appid,
						p = this.component_appid,
						i = {
							path: r,
							appid: c,
							componentappid: p
						};
					this.isComponent ? chomooRequest.doAjax(i, "component/wxJsConfig", d.init) : this.isQiYe ? chomooRequest.doAjax(i, "qiyewx/wxJsConfig", d.init) : chomooRequest.doAjax(i, "weixin/wxJsConfig", d.init)
				} else console.log("wx is undefined")
			},
			setShare: function(e, o) {
				d.SetOnMenuShareTimeline(e), d.SetOnMenuShareAppMessage(e), d.SetOnMenuShareQZone(e), d.SetOnMenuShareQQ(e), d.SetOnMenuShareWeibo(e), r.shareCallback.AllShareSuccess = o
			},
			setShareMessage: function(e, o) {
				d.SetOnMenuShareAppMessage(e), r.shareCallback.AppMessageShareSuccess = o
			},
			setShareTimeline: function(e, o) {
				d.SetOnMenuShareTimeline(e), r.shareCallback.TimelineShareSuccess = o
			},
			upload: {
				mp4: function(e, o) {
					e.projectid = e.projectid || c.projectid, e.foldername = e.foldername || "video", chomooRequest.doFormData(e, "Upload/UploadFile", o)
				},
				img_base64: function(e, o) {
					e.projectid = e.projectid || c.projectid, e.foldername = e.foldername || "base64", e.filetype = e.filetype || "jpg", chomooRequest.doAjax(e, "Upload/uploadImg_base64", o)
				},
				mediaID: function(e, o) {
					e.projectid = e.projectid || c.projectid, e.appid = e.appid || c.appid, e.foldername = e.foldername || "weixin", e.mediatype = e.mediatype || "jpg", chomooRequest.doAjax(e, "Upload/upload_mediaID", o)
				}
			},
			download: {
				imgToOSS: function(e, o) {
					e.projectid = e.projectid || c.projectid, e.filetype = e.filetype || "jpg", chomooRequest.doAjax(e, "Upload/downloadImgToOSS", o)
				}
			},
			face: {
				detect: function(e, o) {
					e.projectid = c.projectid, chomooRequest.doAjax(e, "youtu/detect", o)
				}
			},
			func: {
				submitScore: function(e, o) {
					e.projectid = c.projectid, chomooRequest.doAjax(e, "gameplaydata/insert", o)
				},
				getRanking: function(e, o) {
					e.projectid = c.projectid, chomooRequest.doAjax(e, "gameplaydata/query", o)
				},
				getMyRanking: function(e, o) {
					e.projectid = c.projectid, chomooRequest.doAjax(e, "gameplaydata/querymyranking", o)
				},
				submitCustomTable: function(e, o, a, t) {
					var n = {
						projectid: c.projectid,
						openid: c.userInfo.openid,
						id: a,
						type: t,
						values_string: JSON.stringify(e)
					};
					chomooRequest.doAjax(n, "market/insertCustomTable", o)
				},
				getCustomDataSingle: function(e, o) {
					var a = {
						projectid: c.projectid,
						id: e
					};
					chomooRequest.doAjax(a, "gameplaydata/getCustomData_Single", o)
				},
				getCustomTableData: function(e, o) {
					e.projectid = c.projectid, chomooRequest.doAjax(e, "market/getCustomTableData", o)
				},
				buttonClicks: function(e, o) {
					var a = {
						projectid: c.projectid,
						openid: c.userInfo.openid,
						remark: e
					};
					chomooRequest.doAjax(a, "gamedata/ButtonClicks", o)
				},
				getButtonClicks: function(e, o) {
					var a = {
						projectid: c.projectid,
						btnname: e
					};
					chomooRequest.doAjax(a, "gamedata/getButtonClicks", o)
				},
				getButtonClickSummary: function(e) {
					var o = {
						projectid: c.projectid
					};
					chomooRequest.doAjax(o, "gamedata/ButtonClickSummary", e)
				},
				imageToBase64: function(e, o) {
					var a = {
						projectid: c.projectid,
						path: e
					};
					chomooRequest.doAjax(a, "app/ImageToBase64", o)
				},
				wxDownLoad: function(e, o) {
					var a = {
						appid: c.appid,
						mediaid: e,
						projectid: c.projectid
					};
					chomooRequest.doAjax(a, "media/download", o)
				},
				wxDownLoads: function(e, o) {
					var a = {
						appid: c.appid,
						mediaid: e,
						projectid: c.projectid
					};
					chomooRequest.doAjax(a, "media/downloads", o)
				},
				createQRcode: function(e, o) {
					e.projectid = c.projectid, chomooRequest.doAjax(e, "common/createQRcode", o)
				},
				getWxUserInfo: function(e, o) {
					var a = {
						projectid: c.projectid,
						appid: c.appid,
						openid: e
					};
					c.isComponent && (a.component_appid = c.component_appid), chomooRequest.doAjax(a, "weixin/getWeixinUserInfo", o)
				},
				getWeixinUser: function(e, o) {
					var a = {
						projectid: c.projectid,
						appid: c.appid,
						openids: e
					};
					chomooRequest.doAjax(a, "wxUser/query", o)
				},
				uploadImgToBase64: function(e, o) {
					e.projectid = c.projectid, chomooRequest.doAjax(e, "Common/uploadImg_base64", o)
				}
			}
		},
		s = {
			browse: function() {
				if("mapai" != c.projectid && "SPDBank" != c.projectid && "TOYOTAfanpai" != c.projectid) {
					var e = chomooCommon.getUrlParam("r") || "",
						o = {
							projectid: c.projectid,
							openid: c.userInfo.openid,
							remark: e
						};
					chomooRequest.doAjax(o, "gamedata/browse", null)
				}
			},
			share: function(e) {
				var o = {
					projectid: c.projectid,
					openid: c.userInfo.openid,
					remark: e
				};
				chomooRequest.doAjax(o, "gamedata/share", null)
			}
		},
		d = {
			init: function(e) {
				if(wx) {
					var o = e.data;
					wx.config({
						debug: !1,
						appId: o.appid,
						timestamp: o.timestamp,
						nonceStr: o.noncestr,
						signature: o.signature,
						jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone", "startRecord", "stopRecord", "onVoiceRecordEnd", "playVoice", "pauseVoice", "stopVoice", "onVoicePlayEnd", "uploadVoice", "downloadVoice", "chooseImage", "previewImage", "uploadImage", "downloadImage","getLocalImgData", "translateVoice", "getNetworkType", "openLocation", "getLocation", "hideOptionMenu", "showOptionMenu", "hideMenuItems", "showMenuItems", "hideAllNonBaseMenuItem", "showAllNonBaseMenuItem", "closeWindow", "scanQRCode", "chooseWXPay", "openProductSpecificView", "addCard", "chooseCard", "openCard"]
					}), wx.ready(function() {
						"function" == typeof r.wxJsReadyCallback && r.wxJsReadyCallback()
					}), wx.error(function(e) {
						console.log("error:" + JSON.stringify(e))
					})
				} else console.log("未引用jweixin.js")
			},
			createShareModel: function(o, a) {
				o.lineLink.indexOf("code") > 0 && (o.lineLink = e(o.lineLink, "code"));
				var t = {
					title: o.shareTitle,
					desc: o.descContent,
					link: o.lineLink,
					imgUrl: o.imgUrl,
					success: function() {
						d.shareSuccess(a)
					},
					cancel: function() {
						d.shareCancel(a)
					}
				};
				return t
			},
			SetOnMenuShareTimeline: function(e) {
				var o = this.createShareModel(e, "timeline");
				wx.onMenuShareTimeline(o)
			},
			SetOnMenuShareAppMessage: function(e) {
				var o = this.createShareModel(e, "friend");
				wx.onMenuShareAppMessage(o)
			},
			SetOnMenuShareQZone: function(e) {
				var o = this.createShareModel(e, "qzone");
				wx.onMenuShareQZone(o)
			},
			SetOnMenuShareQQ: function(e) {
				var o = this.createShareModel(e, "qq");
				wx.onMenuShareQQ(o)
			},
			SetOnMenuShareWeibo: function(e) {
				var o = this.createShareModel(e, "weibo");
				wx.onMenuShareWeibo(o)
			},
			shareSuccess: function(e) {
				console.log("share success " + e), "function" == typeof r.shareCallback.AllShareSuccess && r.shareCallback.AllShareSuccess(), "friend" == e && "function" == typeof r.shareCallback.AppMessageShareSuccess && r.shareCallback.AppMessageShareSuccess(), "timeline" == e && "function" == typeof r.shareCallback.TimelineShareSuccess && r.shareCallback.TimelineShareSuccess(), MtaH5 && ("friend" == e ? MtaH5.clickShare("wechat_friend") : "timeline" == e ? MtaH5.clickShare("wechat_moments") : "qzone" == e ? MtaH5.clickShare("qzone") : "qq" == e && MtaH5.clickShare("qq")), s.share(e)
			},
			shareCancel: function(e) {
				console.log("share cancel " + e)
			}
		};
	chomoo = c
}();
var chomooCommon;
! function() {
	var e = {
		reslist: [],
		getPageResList: function() {
			var e = $("img");
			return $.each(e, function(e, o) {
				var a = $(o).attr("src");
				a && null != a && "" != a || (a = $(o).css("background-image"), a = a.replace("url(", ""), a = a.replace(")", ""), a = a.replace('"', "")), this.reslist.push(a)
			}), this.reslist
		},
		getUrlParam: function(e) {
			var o = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"),
				a = window.location.search.substr(1).match(o);
			return null != a ? unescape(a[2]) : null
		},
		getTimestamp: function() {
			return Date.parse(new Date)
		}
	};
	chomooCommon = e
}();
var chomooRequest;
! function() {
	function e(e, o) {
		var a = "conststr=" + i + "&timestamp=" + e + "&url=" + o,
			t = $.sha1(a);
		return t
	}

	function o(o) {
		o = n.path + "/" + a + "/" + t + "/" + o;
		var i = chomooCommon.getTimestamp(),
			r = e(i, o);
		return o = o + "?timestamp=" + i + "&signature=" + r
	}
	var a = "api",
		t = "v1",
		n = {
			path: "//api.qiaomukeji.com",
			doAjax: function(e, a, t) {
				chomoo.isComponent && (e.component_appid = chomoo.component_appid), a = o(a), $.post(a, e, t)
			},
			doFormData: function(e, a, t) {
				var n = new XMLHttpRequest;
				a = o(a);
				var i = new FormData;
				$.each(e, function(e, o) {
					i.append(e, o)
				}), n.addEventListener("load", t, !1), n.open("POST", a), n.send(i)
			},
			doJava: function(e, o, a) {
				var t = "param=" + JSON.stringify(o);
				$.ajax({
					url: e,
					data: t,
					type: "post",
					cache: !1,
					dataType: "json",
					success: function(e) {
						"function" == typeof a && a.call(this, e)
					}
				})
			}
		},
		i = "www.bjweifeng.cn";
	chomooRequest = n
}(),
function(e) {
	var o = function(e, o) {
			return e << o | e >>> 32 - o
		},
		a = function(e) {
			var o, a, t = "";
			for(o = 7; o >= 0; o--) a = e >>> 4 * o & 15, t += a.toString(16);
			return t
		},
		t = function(e) {
			e = e.replace(/\x0d\x0a/g, "\n");
			for(var o = "", a = 0; a < e.length; a++) {
				var t = e.charCodeAt(a);
				t < 128 ? o += String.fromCharCode(t) : t > 127 && t < 2048 ? (o += String.fromCharCode(t >> 6 | 192), o += String.fromCharCode(63 & t | 128)) : (o += String.fromCharCode(t >> 12 | 224), o += String.fromCharCode(t >> 6 & 63 | 128), o += String.fromCharCode(63 & t | 128))
			}
			return o
		};
	e.extend({
		sha1: function(e) {
			var n, i, r, c, s, d, p, u, l, h = new Array(80),
				m = 1732584193,
				f = 4023233417,
				g = 2562383102,
				S = 271733878,
				j = 3285377520;
			e = t(e);
			var x = e.length,
				C = new Array;
			for(i = 0; i < x - 3; i += 4) r = e.charCodeAt(i) << 24 | e.charCodeAt(i + 1) << 16 | e.charCodeAt(i + 2) << 8 | e.charCodeAt(i + 3), C.push(r);
			switch(x % 4) {
				case 0:
					i = 2147483648;
					break;
				case 1:
					i = e.charCodeAt(x - 1) << 24 | 8388608;
					break;
				case 2:
					i = e.charCodeAt(x - 2) << 24 | e.charCodeAt(x - 1) << 16 | 32768;
					break;
				case 3:
					i = e.charCodeAt(x - 3) << 24 | e.charCodeAt(x - 2) << 16 | e.charCodeAt(x - 1) << 8 | 128
			}
			for(C.push(i); C.length % 16 != 14;) C.push(0);
			for(C.push(x >>> 29), C.push(x << 3 & 4294967295), n = 0; n < C.length; n += 16) {
				for(i = 0; i < 16; i++) h[i] = C[n + i];
				for(i = 16; i <= 79; i++) h[i] = o(h[i - 3] ^ h[i - 8] ^ h[i - 14] ^ h[i - 16], 1);
				for(c = m, s = f, d = g, p = S, u = j, i = 0; i <= 19; i++) l = o(c, 5) + (s & d | ~s & p) + u + h[i] + 1518500249 & 4294967295, u = p, p = d, d = o(s, 30), s = c, c = l;
				for(i = 20; i <= 39; i++) l = o(c, 5) + (s ^ d ^ p) + u + h[i] + 1859775393 & 4294967295, u = p, p = d, d = o(s, 30), s = c, c = l;
				for(i = 40; i <= 59; i++) l = o(c, 5) + (s & d | s & p | d & p) + u + h[i] + 2400959708 & 4294967295, u = p, p = d, d = o(s, 30), s = c, c = l;
				for(i = 60; i <= 79; i++) l = o(c, 5) + (s ^ d ^ p) + u + h[i] + 3395469782 & 4294967295, u = p, p = d, d = o(s, 30), s = c, c = l;
				m = m + c & 4294967295, f = f + s & 4294967295, g = g + d & 4294967295, S = S + p & 4294967295, j = j + u & 4294967295
			}
			var l = a(m) + a(f) + a(g) + a(S) + a(j);
			return l.toLowerCase()
		}
	})
}(jQuery);