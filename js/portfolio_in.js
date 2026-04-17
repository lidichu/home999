function setFotorama(){
	var winW = $(window).width();
	var winH = $(window).height();
	var isFotorama = $(".fotorama").length;

	// Fotorama 的共用基本設定
	var op = {
		fit: 'scaledown', // 確保圖片按比例縮小，完整顯示不裁切
		loop: true,
		transition: 'crossfade',
		transitionduration: 1000,
		swipe: true,
		stopautoplayontouch: false
	};

	// 根據不同裝置，給予不同的尺寸設定
	if(isDevice() == "pc"){
		// 【電腦版】維持您原本的「滿版固定高度」設計
		var workHeight = winH - 100;
		var workWidth = workHeight * 18 / 12; 
		var maxWidth = winW - 60;
		
		op.width = workWidth;
		op.height = workHeight;
		op.maxwidth = maxWidth;
		op.nav = "thumbs"; 
		op.arrows = false; 
		
		// 👉 順便設定電腦版的縮圖大小 (比手機版稍微大一點更好點擊)
		op.thumbwidth = 80; 
		op.thumbheight = 60;
		op.thumbmargin = 7;
	} else {
		// 【手機/平板版】寬度滿版，並使用「比例」來撐開高度
		op.width = '100%';
		op.ratio = 16/11; // 這裡設定圖片比例，您可依實際照片調整(例如 4/3 或 3/2)
		op.maxwidth = '100%';
		op.nav = "thumbs";
		op.arrows = true;
		op.thumbwidth = 40; 
		op.thumbheight = 30;
		op.thumbmargin = 3;
	}

	var eImg = $(".photos-list img");
	var imgUrl = $(".photos-list").data('url');

	// 初始化或更新 Fotorama
	if(!isFotorama){
		eImg.each(function(index, el) {
			var imgNum = index+1;
			var imgSrc = "images/portfolio/"+imgUrl+"/"+imgNum+".jpg";
			$(this).attr("src", imgSrc);
		});

		$fotoramaDiv = $('.photos-list').fotorama(op);
		fotorama = $fotoramaDiv.data('fotorama');
	} else {
		// 螢幕翻轉或縮放時，重新載入設定
		fotorama.setOptions(op);
	}

	// 隱藏自訂的箭頭，讓手機版使用 Fotorama 內建箭頭
	if(isDevice() != "pc") {
		$(".photos-prev, .photos-next").css("display", "none");
	} else {
		$(".photos-prev, .photos-next").css("display", "block");
	}
}

function setShare(){
	// <!--Share-->
	var shareTitle = "禾久設計作品-" + $('.case-name').html();
	var shareUrl = $(location).attr('href');
	var imgUrl = $(".photos-list").data("url");
	
	//取得網站根目錄的路徑
	function getBaseUrl() {
		var re = new RegExp(/^.*\//);
		return re.exec(window.location.href);
	}
	var BaseUrl = getBaseUrl();
	var shareImg = BaseUrl + 'images/portfolio/' + imgUrl + '/1.jpg';
	
	var shareHtml = "<a href='http://www.facebook.com/share.php?u=" + shareUrl + "' target='_blank' class='sh_to_fb'><i class='fa fa-facebook' aria-hidden='true'></i></a>"	
	+ "<a href='https://plus.google.com/share?url=" + shareUrl + "' target='_blank' class='sh_to_google'><i class='fa fa-google-plus' aria-hidden='true'></i></a>"
	+ "<a data-pin-do='buttonPin' href='https://www.pinterest.com/pin/create/button/?url=" + shareUrl + "&media=" + shareImg + "&description=" + shareTitle + "' data-pin-custom='true' target='_blank' class='sh_to_pin'><i class='fa fa-pinterest-p' aria-hidden='true'></i></a>"
	+ "<a href='http://twitter.com/intent/tweet?status=" + shareTitle + " website:" + shareUrl + "' target='_blank' class='sh_to_twitter'><i class='fa fa-twitter' aria-hidden='true'></i></a>"
	+ "<a href='mailto:?subject=好作品分享：" + shareTitle + "&body=" + shareTitle + ":" + shareUrl + "' class='sh_to_mail'><i class='fa fa-envelope' aria-hidden='true'></i></a>"

	$(".case-share").append(shareHtml);
}

// 確保 DOM 已經完全載入
$(document).ready(function(){
	
	// 在文檔載入完成後立即嘗試初始化一次
	setTimeout(function() {
		setFotorama();
	}, 100);
	
	$(".photos-prev").click(function(){
		if(typeof fotorama !== 'undefined') {
			fotorama.show("<");
		}
	});

	$(".photos-next").click(function(){
		if(typeof fotorama !== 'undefined') {
			fotorama.show(">");
		}
	});
});

// 使用 window.load 確保所有資源加載完成
$(window).on('load', function(){
	// 再次執行確保圖片已載入完成
	setFotorama();
});

// 視窗大小調整時重新設定
$(window).resize(function(){
	setFotorama();
});


$(window).load(function(){
	setShare();

	//photos
	setFotorama();

	$(".photos-prev").click(function(){
		fotorama.show("<");
	})

	$(".photos-next").click(function(){
		fotorama.show(">");
	})
})

$(window).resize(function(){
	setFotorama();
})