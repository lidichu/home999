function viewport() {
 var e = window, a = 'inner';
 if (!('innerWidth' in window )) {
  a = 'client';
  e = document.documentElement || document.body;
 }
 return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
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
		winScroll = win.scrollTop(),
		winH = win.height(),
		headerH = header.height(),
		moveY = winH/2 - headerH/2,
		nowY = winH/2;

	if(isDevice() == "pc"){
		if(winScroll > moveY){
			nowY = headerH/2;
			body.addClass('header-top');
		}else{
			nowY = winH/2 - winScroll;
			body.removeClass('header-top');
		}
	}else{
		nowY = headerH/2;
		body.removeClass('header-top');
	}

	header.css({top:nowY});
	body.removeClass('nav-open');

	//enter page animate
	$('.top').addClass('top-show');

	setAnimate();
}


function setMenu(now){
	//主選單
	var bnNav = []
		bnNav[0] = { tw : '關於我們', en : 'ABOUT',  	link : 'about.html'}
		bnNav[1] = { tw : '設計案例', en : 'WORKS', link : 'portfolio.html'}
		bnNav[2] = { tw : '設計嚴選', en : 'COLLECTION',link : 'collection.html'}
		bnNav[3] = { tw : '服務內容', en : 'SERVICE',  	link : 'service.html'}
		bnNav[4] = { tw : '最新消息', en : 'NEWS',  	link : '#'}
		bnNav[5] = { tw : '連絡我們', en : 'CONTACT',  	link : 'contact.html'}

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
	var htmlFooter = '<li><div class="footer-icon icon-phone"><i class="fa fa-volume-control-phone" aria-hidden="true"></i></div><a href="tel:+886-2-2279-1348">02-2279-1348</a></li>'+
					'<li><div class="footer-icon icon-fax"><i class="fa fa-mobile" aria-hidden="true"></i></div><a style="margin-right:16px;" href="tel:+886-939934337">0939-934-337</a><a href="tel:+886-978583679">0978-583-679</a></li>'+
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
		return navigator.userAgent.match(/iPhone|iPod|ipad/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
};

$(function(){
	setSVG();
	
	$(".hamburger").click(function(){
		$("body").toggleClass('nav-open');
	})

	$(".scroll-down, .scroll-down2").click(function(){
		$("body,html").animate({scrollTop: $(window).height()-110},1000);
	})

	setScroll();

	//右下角我要諮詢按鈕
	if (isMobile.any()) {
		$(".consult-img a").attr("href","tel:+886-939934337");
	}else{
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
