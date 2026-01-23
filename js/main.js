function viewport() {
  return {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  };
}

function isDevice(){
	return (viewport().width>1100) ? "pc" : "mobile";
}

function setAnimate(){
	var scrollT = $(window).scrollTop();
	var winH = $(window).height();

	$(".show-item").each(function(index, el) {
		var contH = $(this).offset().top;

		if(scrollT > contH-winH*0.8){
			$(this).addClass("show-now");
		}else{
			$(this).removeClass('show-now');
		}
	});
}

//can use css control svg images
function setSVG(){
	$('img.svg').each(function(){   
		var $img = $(this);   
		var imgID = $img.attr('id');   
		var imgClass = $img.attr('class');   
		var imgURL = $img.attr('src');   
	  
		$.get(imgURL, function(data) {   
			// Get the SVG tag, ignore the rest
			var $svg = $(data).find('svg');   
	  
			// Add replaced image's ID to the new SVG   
			if(typeof imgID !== 'undefined') {   
				$svg = $svg.attr('id', imgID);   
			}   
			// Add replaced image's classes to the new SVG   
			if(typeof imgClass !== 'undefined') {   
				$svg = $svg.attr('class', imgClass+' replaced-svg');   
			}   
	  
			// Remove any invalid XML tags as per http://validator.w3.org   
			$svg = $svg.removeAttr('xmlns:a');   
	  
			// Check if the viewport is set, if the viewport is not set the SVG wont't scale.   
			if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {   
				$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))   
			}

			// Replace image with new SVG   
			$img.replaceWith($svg);
		
		}, 'xml');

	});
}

function setScroll(){
    //set header position    
    var win = $(window),
        header = $(".header"),
        body = $("body"),
        headerH = header.height();

    // 直接固定在最上方
    header.css({top: 0, marginTop: 0});
    body.addClass('header-top');
    
    // 只在電腦版移除 nav-open 類
    if(isDevice() === "pc") {
    body.removeClass('nav-open');
    }

    //enter page animate
    $('.top').addClass('top-show');

    setAnimate();
}


function setMenu(now){
	//主選單
	var bnNav = []
    bnNav[0] = { tw : '關於我們', en : '關於我們',      link : 'about.html'}
    bnNav[1] = { tw : '設計案例', en : '設計案例',  link : 'portfolio.html'}
    bnNav[2] = { tw : '設計嚴選', en : '設計嚴選', link : 'collection.html'}
    bnNav[3] = { tw : '服務內容', en : '服務內容',    link : 'service.html'}
    
    // --- 新增這一行 ---
    bnNav[4] = { tw : '裝修學堂', en : '裝修學堂',  link : 'knowledge.html'} 
    // ----------------
    
    bnNav[5] = { tw : '最新消息', en : '最新消息',       link : 'news.html'} // 原本的 index 順延
    bnNav[6] = { tw : '連絡我們', en : '連絡我們',    link : 'contact.html'}


	var htmlNav = "";
	var N = 0;
	for(var key in bnNav){
		var innerNav = '<a href="' + bnNav[key].link + '">\
				        	<span class="en">' + bnNav[key].en + '</span>\
				        	<span class="tw">' + bnNav[key].tw + '</span>\
				        </a>'
		if(N == now){
			htmlNav +='<li class="active">'+innerNav+'</li>';
		}else{
			htmlNav +='<li>'+innerNav+'</li>';
		}
		N++;
	}

	$(".navigation ul").html(htmlNav);


	//footer
	var htmlFooter = '<li><div class="footer-icon icon-phone"><i class="fa fa-volume-control-phone" aria-hidden="true"></i></div><a href="tel:02-2279-1348">02-2279-1348</a></li>'+
					'<li><div class="footer-icon icon-fax"><i class="fa fa-mobile" aria-hidden="true"></i></div><a style="margin-right:16px;" href="tel:0978583679">0978-583-679</a></li>'+
					'<li><div class="footer-icon icon-comment"><i class="fa fa-comment" aria-hidden="true"></i></div> <a href="contact.html">諮詢連結</a></li>'+
					'<li><div class="footer-icon icon-mail"><i class="fa fa-envelope" aria-hidden="true"></i></div><a href="mailto:jimmyjih589@gmail.com">jimmyjih589@gmail.com</a></li>'+
					'<li><div class="footer-icon icon-facebook"><i class="fa fa-facebook" aria-hidden="true"></i></div><a href="https://www.facebook.com/Taipei.22791348/" target="_blank">禾久室內裝修設計</a></li>'+
					'<li><div class="footer-icon icon-line"><img src="images/icon/linea.png" alt=""></div><a href="https://lin.ee/zaU2Efo" target="_blank">@858fjtet</a></li>'

	$(".footer-contact").html(htmlFooter);						
}

 var isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
        // 增強 iOS 偵測功能
        return navigator.userAgent.match(/iPhone|iPod|iPad/i) || 
               (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows() || viewport().width <= 1100);
	}
};

$(function(){
	setSVG();

		// 添加圖片緩存控制 - 在setSVG()之後添加以下代碼
	// 強制圖片更新 - 為所有圖片添加時間戳
	(function() {
		var forceImageReload = true; // 設為false可停用此功能
		
		if(forceImageReload) {
			var timestamp = new Date().getTime();
			
			// 處理普通圖片
			$('img').each(function() {
				var $img = $(this);
				// 跳過已處理的SVG
				if(!$img.hasClass('replaced-svg')) {
					var src = $img.attr('src');
					if(src) {
						// 避免重複添加時間戳
						src = src.split('?')[0];
						// 添加時間戳
						$img.attr('src', src + '?t=' + timestamp);
					}
				}
			});
			
			// 處理背景圖片
			$('.top-images-img').each(function() {
				var $bg = $(this);
				var style = $bg.attr('style');
				if(style && style.includes('background-image')) {
					// 提取URL
					var matches = style.match(/url\(['"]?([^'"]+)['"]?\)/);
					if(matches && matches[1]) {
						var bgUrl = matches[1].split('?')[0];
						// 替換URL
						var newStyle = style.replace(/url\(['"]?[^'"]+['"]?\)/, 
									 'url(' + bgUrl + '?t=' + timestamp + ')');
						$bg.attr('style', newStyle);
					}
				}
			});
			
			console.log('圖片緩存控制已啟用 - 時間戳: ' + timestamp);
		}
	})();
	
	$(".hamburger").click(function(e){
		e.preventDefault();
        
        // 切換aria-expanded狀態
        var expanded = $(this).attr('aria-expanded') === 'true';
        $(this).attr('aria-expanded', !expanded ? 'true' : 'false');
        
        // 切換選單開啟狀態
        $("body").toggleClass('nav-open');
        
        // 阻止事件冒泡
        return false;
	});

		// 在視窗調整大小時重新檢查
    $(window).resize(function() {
        if(isDevice() === "pc") {
            $("body").removeClass('nav-open');
            $(".hamburger").attr('aria-expanded', 'false');
        }
    });



	$(".scroll-down, .scroll-down2").click(function(){
		$("body,html").animate({scrollTop: $(window).height()-110},1000);
	})

	setScroll();

	//右下角我要諮詢按鈕
	// 為 iOS 修改工具列顯示邏輯
	if (isMobile.iOS()) {
		// iOS 裝置特殊處理
		$(".consult-img a").attr("href","#");
		
		$(".consult-img").click(function(){
			$(".consult").toggleClass('consult-show').removeClass('consult-box-show');
			$(".line-box, .phone-box").removeClass('box-show');
			return false;
		});

		$(".consult-icon .icon-line").click(function(){
			$(".line-box").addClass('box-show');
			$(".consult").addClass('consult-box-show');
			return false;
		});
		$(".consult-icon .icon-phone").click(function(){
			$(".phone-box").addClass('box-show');
			$(".consult").addClass('consult-box-show');
			return false;
		});
		$(".consult-title a").click(function(){
			$(".consult").removeClass('consult-box-show');
			$(".line-box, .phone-box").removeClass('box-show');
			return false;
		});
	} else if (isMobile.any()) {
		// 其他行動裝置維持原有行為
		$(".consult-img a").attr("href","tel:0978583679");
	} else {
		// 電腦版
		$(".consult-img a").attr("href","#");

		$(".consult-img").on("mouseenter",function() {
			$(".consult").addClass('consult-show');
		}).click(function(){
			$(".consult").toggleClass('consult-show').removeClass('consult-box-show');
			$(".line-box, .phone-box").removeClass('box-show');
						 return false;
		});

		$(".consult-icon .icon-line").click(function(){
			$(".line-box").addClass('box-show');
			$(".consult").addClass('consult-box-show');

			return false;
			 })

		$(".consult-icon .icon-phone").click(function(){
			$(".phone-box").addClass('box-show');
			$(".consult").addClass('consult-box-show');

			return false;
})

		$(".consult-title a").click(function(){
			$(".consult").removeClass('consult-box-show');
			$(".line-box, .phone-box").removeClass('box-show');
			
			return false;
})
	}

	//表單相關
	if($("#to_mail").length==0){
		if (typeof(Storage) !== "undefined") {
			sessionStorage.setItem('codeerror', '');
		}
	}

	//oncontextmenu="return false"鎖右鍵,onselectstart防止使用滑鼠選取內文
	$('body').attr('oncontextmenu','return false')
			 .attr('onselectstart','return false')
			 .attr('ondragstart','return false')
			 .keydown(function(e){	
			     //取得keyBoardEvent對象
				 e = (e) ? e : ((window.event) ? window.event : "")
				 //取得keyBoardEvent對象的鍵值
			 	 var key = e.keyCode?e.keyCode:e.which;
				 //鎖F12、ctrl、shift按鍵
				 if($("input, textarea").length==0){
				 	 if(key==123||e.ctrlKey||e.shiftKey){
						 return false;
					 }
				 }
})
})

$(window).scroll(function(){
	setScroll();
})

$(window).resize(function(){
	setScroll();
})