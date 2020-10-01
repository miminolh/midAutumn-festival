(function (doc, win) {
  var TIMER;
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var baseFontSize = 100; // 根元素基准字体大小
      var designWidth = 750; // 设计稿宽度
      var clientWidth = docEl.clientWidth;
      console.log(docEl.clientWidth, ';;;;;')
      if (!clientWidth) return;
      docEl.style.fontSize = baseFontSize * (clientWidth / designWidth) + 'px';
    };
  // Abort if browser does not support addEventListener
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

//禁止微信内部浏览器调整字体大小
(function () {
  if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
    handleFontSize();
  } else {
    if (document.addEventListener) {
      document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
    } else if (document.attachEvent) {
      document.attachEvent("WeixinJSBridgeReady", handleFontSize);
      document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
    }
  }
  function handleFontSize () {
    // 设置网页字体为默认大小
    WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize': 0 });
    // 重写设置网页字体大小的事件
    WeixinJSBridge.on('menu:setfont', function () {
      WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize': 0 });
    });
  }
})();

$(document).ready(function () {
  Rounding()
  var progress = 1;
  var proInter = setInterval(() => {
    $(".lt_progress").html(progress + '%')
    progress++
    if (progress > 100) {
      // $(".loading").hide()
      // $(".index").show()
      $(".load_text").fadeOut(800, () => {
        $(".index_title").fadeIn(800)
        $(".index_capsule").fadeIn(800)
        $(".index_btn").fadeIn(800)
        $(".logo").fadeIn(800)
      })
      clearInterval(proInter)
    }
  }, 30)
})

//按钮微动效方法
function btnTween (_obj, _call) {
  $(_obj).addClass("dogquan_colse1");
  setTimeout(function () {
    $(_obj).removeClass("dogquan_colse1");
    _call.call(this);
  }, 300)
}

function initplay () {
  createjs.Sound.alternateExtensions = ["mp3"];
  createjs.Sound.on("fileload", this.loadHandler, this);
  createjs.Sound.registerSound("./mp3/bg.mp3", "sound");
}
function loadHandler (event) {
  // 这会引发针对每个已注册的声音。
  var instance = createjs.Sound.play("sound");  // 发挥使用ID。也可以使用完整的源路径或event.src。
  // instance.on("complete", this.handleComplete, this);
  instance.volume = 1;
  instance.loop = -1;
}

//ios适配mp3自动播放
// document.addEventListener('DOMContentLoaded', function () {
//   document.getElementById('myAudio').play();
//   document.addEventListener("WeixinJSBridgeReady", function () {
//     document.getElementById('myAudio').play();
//   }, false);
// });

//为月饼选择, 海报页, 家书页重新设置字体大小
// function setFont() {
//   var html = document.documentElement;
//   var k = 750;
//   html.style.fontSize = html.clientWidth / k * 16 + "px";
//   console.log(html.style.fontSize, html.clientWidth);
// }

//点击菠萝菠萝蜜按钮进行视频的播放
$('.index_btn').on('click', () => {
  MtaH5.clickStat("play")
  btnTween(".index_btn", () => {
    $(".loading").fadeOut(500, () => {
      $("#videoPage").fadeIn(500)
    });
    $("#video")[0].play()
    initplay();
    $("#video").removeAttr("controls")
  })
})

//重新设置video组件的大小
var width = document.documentElement.clientWidth
var height = document.documentElement.clientHeight
var video = document.getElementById("video");
video.width = width;
video.height = 1660 * width / 750
console.log(video.width, video.height)
if (video.height > height) {
  var cha = video.height - height
  if (cha > 100) {
    video.style.top = (parseInt(cha / -2) + 15) + 'px';
  } else {
    video.style.top = parseInt(cha / -2) + 'px';
  }

}

//监听播放时间
var video = document.getElementById("video");
var timeDisplay
var isplay1, isplay2, isplay3, isplay4, isplay5, isplay6

//使用事件监听方式捕捉事件
video.addEventListener("timeupdate", function () {
  //用秒数来显示当前播放进度
  timeDisplay = Math.floor(video.currentTime * 1000);
  if (timeDisplay >= 4650 && !isplay6) {
    $(".logo").fadeOut(800)
  }
  if (timeDisplay >= 8800 && !isplay1) {
    video.pause()

    $('.video_play').fadeIn(1000)
    isplay1 = true
  }
  if (timeDisplay >= 16200 && !isplay2) {
    video.pause()
    $('.video_play').fadeIn(1000)
    isplay2 = true
  }
  if (timeDisplay >= 23600 && !isplay3) {
    video.pause()
    $('.video_play').fadeIn(1000)
    isplay3 = true
  }
  if (timeDisplay >= 30420 && !isplay4) {
    video.pause()
    $('.video_play').fadeIn(1000)
    isplay4 = true
  }
  if (timeDisplay >= 38120 && !isplay5) {
    video.pause()
    $('.video_poster').fadeIn(1000)
    isplay5 = true
  }
}, false)

//监听视频播放结束
video.addEventListener('ended', () => {
  //document.getElementById('myAudio').play();
  $(".video_cake").fadeIn(1000)
});

//圆月帧动画
function Rounding () {
  var round = document.getElementById("Jdove")
  var variable = 1;
  var time = setInterval(() => {
    round.src = "./images/month/tu (" + variable + ").png";
    if (variable == 26) {
      clearInterval(time)
    }
    variable++
  }, 120)
}

//点击继续穿越按钮
$('.video_play').on('click', () => {
  btnTween(".video_play", () => {
    video.play()
    $('.video_play').fadeOut(1000)
  })
})

//点击穿越5岁
$('.video_poster').on('click', () => {
  btnTween(".video_poster", () => {
    video.play()
    $('.video_poster').fadeOut(1000)
  })
})

//点击带盒月饼回家按钮
var height = window.innerHeight
var poor = 1660 * window.innerWidth / 750 - height
$('.video_cake').on('click', () => {
  btnTween(".video_cake", () => {
    $('.video_cake').fadeOut(800)
    $('#videoPage').fadeOut(800)
    if (poor > 100) {
      $('.pageposter1').css('top', '-' + ((poor / 2) + 25) + "px")
      $('.xing').css('top', '-' + ((poor / 2) + 25) + "px")
    } else {
      $('.pageposter1').css('top', '-' + (poor / 2) + "px")
      $('.xing').css('top', '-' + (poor / 2) + "px")
    }
    $('.gameid').fadeIn(1000)
    // setFont()
  })
})
var selectIndex = "";
var selectName = {};
var selectNum = 0;

//点击选好了按钮跳转海报页
$(".select_ok").on("click", function () {
  MtaH5.clickStat("selectok")
  btnTween(".select_ok", () => {
    loading2("海报生成中...", "poster")
    onPoster1();
  })
})

//月饼选择
$(".yuebingdiv > div").on("click", "", function () {
  selectIndex = $(this).data("index");
  //alert($(this).data("index"));
  console.log('curPosterIndex:', selectIndex);
  var selected = $('.select.' + selectIndex)[0];
  console.log(selected)
  if (selected.style.display === 'block') {
    selectName[selectIndex] = null;
    selected.style.display = 'none';
    selectNum--;
    $(".select_ok").hide()
  } else {
    if (selectNum < 4) {
      selected.style.display = 'block';
      selectName[selectIndex] = selectIndex;
      selectNum++;
      if (selectNum === 4) {
        //onPoster1();
        $(".select_ok").show()
      }
    }
  }
});

//飘带帧动画
// var time
// function animation() {
//   var Rope = document.getElementById("hongs");
//   var index = 1;
//   time = setInterval(() => {
//     Rope.src = "./images/hongdai/hongdai (" + index + ").png";
//     if (index == 25) {
//       index = 1;
//     }
//     index++
//   }, 80)
// }

//开始点击的时候获取触点
// var startX = ""
// var endX = ""
// var changeX = ""
// document.addEventListener("touchstart", function (e) {
//   startX = e.touches[0].pageX;
// })

// //结束点击时获得触点
// document.addEventListener("touchend", function (e) {
//   endX = e.changedTouches[0].pageX;
//   //判断触点差值
//   changeX = endX - startX;

//   //右滑
//   if (changeX >= 70 && $(".btn.poster1").css("display") == 'block') {
//     clearInterval(time)
//     Straighten()
//   }
// })

// function Straighten() {
//   var straighten = document.getElementById("hongs")
//   var index = 27;
//   var timeEnd = setInterval(() => {
//     straighten.src = "./images/hongdai/hongdai (" + index + ").png";
//     if (index == 50) {
//       clearInterval(timeEnd)
//       $('.pageposter1').hide();
//       $('.pageposter2').hide();
//       $('.btn.poster1').hide();
//       $(".xing_title").html("亲爱的" + window["my_wxName"] + "，")
//       $('.xing').fadeIn(800);
//       $(".xing_return").fadeIn(800);
//     }
//     index++
//   }, 90)
// }

//跳转海报页
var nameArr = [];

function onPoster1 () {
  console.log(selectName)
  for (const item in selectName) {
    console.log(selectName[item])
    if (selectName[item]) {
      nameArr.push(selectName[item])
    }
  }


  //animation() //加载飘带帧动画
  selectCopy()

  GeneratePoster2(nameArr);
}

//选择文案
var poster1_bg = ""
var poster2_bg = ""
var poster3_bg = ""
var poster_text = ``
var poster_text2 = ""
function selectCopy () {
  if (nameArr.indexOf("chengzhang") > -1 && nameArr.indexOf("changshou") == -1) {
    console.log("包含成长且不包含长寿!!!")
    poster1_bg = "./images/poster1.png"
    poster2_bg = "./images/poster4.png"
    poster3_bg = "./images/poster7.png"
    poster_text = `${window["my_wxName"]}为您定制璀璨未来保盒`
    poster_text2 = "愿每一个宝贝都拥享绚烂明天"
  }

  if (nameArr.indexOf("changshou") > -1 && nameArr.indexOf("chengzhang") == -1) {
    console.log("包含长寿且不包含成长!!!")
    poster1_bg = "./images/poster2.png"
    poster2_bg = "./images/poster5.png"
    poster3_bg = "./images/poster8.png"
    poster_text = `${window["my_wxName"]}为您定制富足福泰保盒`
    poster_text2 = "愿每一份祝福都让岁月惬意绵长"
  }

  if ((nameArr.indexOf("changshou") > -1 && nameArr.indexOf("chengzhang") > -1) || (nameArr.indexOf("changshou") == -1 && nameArr.indexOf("chengzhang") == -1)) {
    console.log("组合中包括长寿且含成长!!!")
    poster1_bg = "./images/poster3.png"
    poster2_bg = "./images/poster6.png"
    poster3_bg = "./images/poster9.png"
    poster_text = `${window["my_wxName"]}为您定制喜乐安康保盒`
    poster_text2 = "愿每一份关爱都化作一重保障"
  }
}

// 点击戳我按钮就进行跳转
$(".pokingMe").on("click", () => {
  $('.pageposter1').hide();
  $('.pageposter2').hide();
  $('.pokingMe').hide();
  $(".xing_title").html("亲爱的" + window["my_wxName"] + "，")
  $('.xing').fadeIn(800);
  $(".xing_return").fadeIn(800);
})

//单击海报页出现保存海报
// $(".poster2").on("click", () => {
//   console.log(111111)
//   $(".pageposter1").fadeOut(800)
//   $(".btn.poster1").fadeOut(800)
//   $(".return").fadeIn(800)
//   $(".pageposter3").fadeIn(800)
// })

//点击返回键
// $(".return").on("click", () => {
//   btnTween(".return", () => {
//     $(".return").fadeOut(800)
//     $(".pageposter3").fadeOut(800)
//     $(".pageposter1").fadeIn(800)
//     $(".btn.poster1").fadeIn(800)
//     // $(".pageposter3").css("zIndex", "0")
//   })
// })

//从信纸页返回
$(".xing_return").on("click", () => {
  console.log("点击了!!!")
  $(".poster1_text").hide()
  $(".poster1_text_1").hide()
  $(".xing_return").fadeOut(800)
  $(".xing").fadeOut(800)
  $(".share").fadeIn(800)
  $(".pageposter1").fadeIn(800)
  $(".pageposter2").fadeIn(800)
})

//生成海报1
function GeneratePoster (res) {
  // console.log("111111111111", _code)
  console.log("进入了生成海报!!!!!")
  let posterList = [{
    "type": "img",
    "url": poster1_bg,
    "css": {
      "width": 750,
      "height": 1660,
      "y": 0,
      "x": 0
    }
  },
  // {
  //   "type": "img",
  //   "url": './images/poster1/poster1_text.png',
  //   "css": {
  //     "width": 57,
  //     "height": 541,
  //     "y": 222,
  //     "x": 661
  //   }
  // },
  {
    "type": "img",
    "url": './images/select/' + res[0] + '.png',
    "css": {
      "width": 130,
      "height": 135,
      "y": 734,
      "x": 347
    }
  },
  {
    "type": "img",
    "url": './images/select/' + res[1] + '.png',
    "css": {
      "width": 130,
      "height": 135,
      "y": 734,
      "x": 500
    }

  },
  {
    "type": "img",
    "url": './images/select/' + res[2] + '.png',
    "css": {
      "width": 130,
      "height": 135,
      "y": 904,
      "x": 347
    }

  },
  {
    "type": "img",
    "url": './images/select/' + res[3] + '.png',
    "css": {
      "width": 130,
      "height": 135,
      "y": 904,
      "x": 500
    }
  }
    //,
    // {
    //   "type": "img",
    //   "url": './images/poster1/logo.png',
    //   "css": {
    //     "width": 148,
    //     "height": 92,
    //     "y": 1506,
    //     "x": 541
    //   }
    // }
  ]

  Posterinit(posterList, 750, 1660, (res) => {
    console.log("生成海报1")
    $('.bg.poster1').attr('src', res);
    $('.bg.poster1').hide()
    removeLoading("poster");
    $('.btn.poster1').fadeIn(800);
    $('.pageposter1').fadeIn(800);
    $('.pageposter2').show();
    $(".select_ok").fadeOut(800)
    $('.pageselect').fadeOut(800)
    $('.bg.poster1').fadeIn(800)
    setTimeout(() => {
      $(".pokingMe").fadeIn(800)
    }, 4000)
    // setTimeout(() => {
    //   GeneratePoster3(nameArr);
    // }, 200)
  })
}

//生成海报2
function GeneratePoster2 (res) {
  console.log("进入了生成海报!!!!!")
  let posterList = [{
    "type": "img",
    "url": poster2_bg,
    "css": {
      "width": 750,
      "height": 1660,
      "y": 0,
      "x": 0
    }
  },
  {
    "type": "img",
    "url": './images/select/' + res[0] + '.png',
    "css": {
      "width": 115,
      "height": 120,
      "y": 580,
      "x": 350
    }
  },
  {
    "type": "img",
    "url": './images/select/' + res[1] + '.png',
    "css": {
      "width": 115,
      "height": 120,
      "y": 580,
      "x": 488
    }

  },
  {
    "type": "img",
    "url": './images/select/' + res[2] + '.png',
    "css": {
      "width": 115,
      "height": 120,
      "y": 745,
      "x": 350
    }

  },
  {
    "type": "img",
    "url": './images/select/' + res[3] + '.png',
    "css": {
      "width": 115,
      "height": 120,
      "y": 745,
      "x": 488
    }
  },
  {
    "type": "circleImg",
    "url": './images/poster2/headimg_bg.png',
    "css": {
      "width": 91,
      "height": 91,
      "y": 1187,
      "x": 59,
      "r": 45
    }
  }, {
    "type": "circleImg",
    "url": window["my_avatar"],
    "css": {
      "width": 91,
      "height": 91,
      "y": 1187,
      "x": 59,
      "r": 45
    }
  },
  {
    "type": "text",
    "text": "" + window["my_wxName"],
    "css": {
      "x": 168,
      "y": 1228,
      "color": "#c19a60",
      "fontstyle": 'bold 26px "黑体"'
    }
  },
  {
    "type": "text",
    "text": poster_text,
    "css": {
      "x": 59,
      "y": 1321,
      "color": "#c19a60",
      "fontstyle": 'bold 26px "黑体"'
    }
  },
  {
    "type": "text",
    "text": poster_text2,
    "css": {
      "x": 59,
      "y": 1360,
      "color": "#c19a60",
      "fontstyle": 'bold 26px "黑体"'
    }
  }
  ]
  Posterinit(posterList, 750, 1660, (res) => {
    console.log("生成海报2")

    $('.bg.poster2').attr('src', res);
    setTimeout(() => {
      GeneratePoster(nameArr);
    }, 200);

  })
}

//生成海报3
// function GeneratePoster3(res) {
//   console.log("进入了生成海报!!!!!")
//   let posterList = [{
//     "type": "img",
//     "url": poster3_bg,
//     "css": {
//       "width": 750,
//       "height": 1660,
//       "y": 0,
//       "x": 0
//     }
//   },
//   {
//     "type": "img",
//     "url": './images/select/' + res[0] + '.png',
//     "css": {
//       "width": 115,
//       "height": 120,
//       "y": 671,
//       "x": 350
//     }
//   },
//   {
//     "type": "img",
//     "url": './images/select/' + res[1] + '.png',
//     "css": {
//       "width": 115,
//       "height": 120,
//       "y": 671,
//       "x": 488
//     }

//   },
//   {
//     "type": "img",
//     "url": './images/select/' + res[2] + '.png',
//     "css": {
//       "width": 115,
//       "height": 120,
//       "y": 818,
//       "x": 350
//     }

//   },
//   {
//     "type": "img",
//     "url": './images/select/' + res[3] + '.png',
//     "css": {
//       "width": 115,
//       "height": 120,
//       "y": 818,
//       "x": 488
//     }
//   },
//   {
//     "type": "circleImg",
//     "url": './images/poster2/headimg_bg.png',
//     "css": {
//       "width": 91,
//       "height": 91,
//       "y": 1223,
//       "x": 59,
//       "r": 45
//     }
//   }, {
//     "type": "circleImg",
//     "url": window["my_avatar"],
//     "css": {
//       "width": 91,
//       "height": 91,
//       "y": 1223,
//       "x": 59,
//       "r": 45
//     }
//   },
//   {
//     "type": "text",
//     "text": "" + window["my_wxName"],
//     "css": {
//       "x": 168,
//       "y": 1268,
//       "color": "#c19a60",
//       "fontstyle": 'bold 26px "黑体"'
//     }
//   },
//   {
//     "type": "text",
//     "text": poster_text,
//     "css": {
//       "x": 59,
//       "y": 1367,
//       "color": "#c19a60",
//       "fontstyle": 'bold 26px "黑体"'
//     }
//   },
//   {
//     "type": "text",
//     "text": poster_text2,
//     "css": {
//       "x": 59,
//       "y": 1405,
//       "color": "#c19a60",
//       "fontstyle": 'bold 26px "黑体"'
//     }
//   }
//   ]
//   Posterinit(posterList, 750, 1660, (res) => {
//     console.log("生成海报3")
//     removeLoading("poster");
//     $('.btn.poster1').fadeIn(800);
//     $('.pageposter1').fadeIn(800);
//     $('.pageposter2').show();
//     $(".select_ok").fadeOut(800)
//     $('.pageselect').fadeOut(800)
//     $('.bg.poster1').fadeIn(800)
//     $('.bg.poster3').attr('src', res);
//   })
// }

//loading弹框
function loading2 (res, name) {
  $('body').loading({
    loadingWidth: 240,
    title: '',
    name: name,
    discription: res,
    direction: 'column',
    type: 'origin',
    // originBg:'#71EA71',
    originDivWidth: 60,
    originDivHeight: 60,
    originWidth: 6,
    originHeight: 6,
    smallLoading: true,
    loadingMaskBg: 'rgba(0,0,0,0.2)'
  });
}