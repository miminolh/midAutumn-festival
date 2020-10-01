

let m_currentIndex = 0;
let m_callback;

function Posterinit(posterList, _canvasW, _canvasH, _callback) {
	//	new VConsole();
	var canvas = document.createElement('canvas');
	var context = canvas.getContext("2d");
	canvas.width = _canvasW;
	canvas.height = _canvasH;
	//	document.body.appendChild(canvas);
	posterH5(posterList, context, canvas);
	m_callback = _callback;
}

function posterH5(_config, context, canvas) {
	if(m_currentIndex < _config.length) {
		console.log(_config[m_currentIndex]["type"])
		if(_config[m_currentIndex]["type"] == "img") {
			drawImg(context, _config, canvas)
		}else
		if(_config[m_currentIndex]["type"] == "text") {
			drawTxt(context, _config, canvas);
		}else
		if(_config[m_currentIndex]["type"] === "circleImg"){
			drawCircleImg(context, _config, canvas)
		}
	} else {
		
		convertCanvasToImage(canvas)
	}
}

function drawImg(_context, _config, _canvas) {
	let t_url = _config[m_currentIndex]["url"];
	let t_x = _config[m_currentIndex]["css"]["x"];
	let t_y = _config[m_currentIndex]["css"]["y"];
	let t_w = _config[m_currentIndex]["css"]["width"];
	let t_h = _config[m_currentIndex]["css"]["height"];
	loadImg(t_url, (_res) => {
		_context.drawImage(_res, t_x, t_y, t_w, t_h);
		m_currentIndex++;
		posterH5(_config, _context, _canvas);
	})
}

function drawCircleImg(_context, _config, _canvas) {
	let t_url = _config[m_currentIndex]["url"];
	let t_x = _config[m_currentIndex]["css"]["x"];
	let t_y = _config[m_currentIndex]["css"]["y"];
	let t_w = _config[m_currentIndex]["css"]["width"];
	let t_h = _config[m_currentIndex]["css"]["height"];
	let t_r = _config[m_currentIndex]["css"]["r"];
	loadImg(t_url, (_res) => {
		circleImg(_context,_res,t_x,t_y,t_r);
		m_currentIndex++;
		posterH5(_config, _context, _canvas);
	})

}

function circleImg(ctx, img, x, y, r) {
    ctx.save();
    var d =2 * r;
    var cx = x + r;
    var cy = y + r;
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.clip();
    ctx.drawImage(img, x, y, d, d);
    ctx.restore();
  }

function drawTxt(_context, _config, _canvas) {
	let t_text = _config[m_currentIndex]["text"];
	_context.font = _config[m_currentIndex]["css"]["fontstyle"];
	_context.fillStyle = _config[m_currentIndex]["css"]["color"];
	_context.fillText(t_text, _config[m_currentIndex]["css"]["x"], _config[m_currentIndex]["css"]["y"]);
	m_currentIndex++;
	posterH5(_config, _context, _canvas);
}

function loadImg(_src, _callback) {
	let img = new Image();
	img.setAttribute("crossOrigin", 'Anonymous');
	if(_src.indexOf("data:") > -1) {
		img.src = _src;
		img.onload = ()=>{
			_callback.call(this, img);
		}
	} else {
		getBase64(_src, (res) => {
			img.src = res;
			img.setAttribute("crossOrigin", 'Anonymous');
			img.onload = function() {
				_callback.call(this, img)
			}
		})
	}

}

function convertCanvasToImage(_canvas) {
	let t_image = new Image();
	t_image.src = _canvas.toDataURL("image/png");
	t_image.setAttribute("crossOrigin", 'Anonymous');
	
	m_callback.call(this, t_image.src);
	m_currentIndex = 0;
}

function getBase64(_url, _callback) {
	window.URL = window.URL || window.webkitURL;
	var xhr = new XMLHttpRequest();
	xhr.open("get", _url, true);
	// 至关重要
	xhr.responseType = "blob";
	xhr.onload = function() {
		if(this.status == 200) {
			//得到一个blob对象
			let blob = this.response;
//			console.log("blob", blob)
			// 至关重要
			let oFileReader = new FileReader();
			oFileReader.onloadend = function(e) {
				// 此处拿到的已经是 base64的图片了
				let base64 = e.target.result;
				//				console.log("方式一》》》》》》》》》", base64)
				_callback.call(this, base64)
			};
			oFileReader.readAsDataURL(blob);
			//====为了在页面显示图片，可以删除====
			//			var img = document.createElement("img");
			//			img.onload = function(e) {
			//				window.URL.revokeObjectURL(img.src); // 清除释放
			//			};
			//			let src = window.URL.createObjectURL(blob);
			//			img.src = src
			//document.getElementById("container1").appendChild(img);
			//====为了在页面显示图片，可以删除====
		}
	}
	xhr.send();
}