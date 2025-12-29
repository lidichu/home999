function setFotorama(){
	var maxWidth = $(window).width() - 60; // 減少側邊間距，讓手機版有更多空間
	var workHeight = $(window).height() - 100;
	var workWidth = workHeight * 18 / 12; 
	var isFotorama = $(".fotorama").length;

	var op = {
		width: workWidth,
		height: workHeight,
		maxwidth: maxWidth,
		nav: "thumbs", // 添加縮圖導航，方便行動裝置用戶
		fit: 'scaledown',
		arrows: true,  // 在行動裝置上顯示箭頭
		stopautoplayontouch: false,
		loop: true,
		transition: 'crossfade',
		transitionduration: 1000,
		thumbwidth: 60,
		thumbheight: 40,
		thumbmargin: 3,
		swipe: true  // 確保可滑動功能開啟
	}

	var eImg = $(".photos-list img");
	var imgUrl = $(".photos-list").data('url');

	// 為所有裝置使用相同的圖片資源，確保圖片能顯示
	if(!isFotorama){
		// 初始化所有圖片，不論裝置類型
		eImg.each(function(index, el) {
			var imgNum = index+1;
			var imgSrc = "images/portfolio/"+imgUrl+"/"+imgNum+".jpg";
			$(this).attr("src", imgSrc);
		});

		$fotoramaDiv = $('.photos-list').fotorama();
		fotorama = $fotoramaDiv.data('fotorama');
	}

	// 根據裝置類型設定不同的選項
	if(isDevice() == "pc"){
		op.nav = false; // PC版無需縮圖導航
		op.arrows = false; // PC版使用自定義箭頭
		fotorama.setOptions(op);
	} else {
		// 行動裝置特定設定
		op.nav = "thumbs";
		op.arrows = true;
		op.thumbwidth = 40; // 縮小行動裝置上縮圖大小
		op.thumbheight = 30;
		fotorama.setOptions(op);
		
		// 修正行動裝置上的圖片控制區域
		$(".photos-prev, .photos-next").css("display", "none");
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
	setShare();
	
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