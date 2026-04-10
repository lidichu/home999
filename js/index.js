$(window).load(function(){
	showImages();
});

function showImages(){
	var eImg = $(".top-images-img"),
		eText = $(".slogan"),
		Num = eImg.length,
		Now = 0,
		fadeTime = 2000,
		duration = 8000;
	var timer; // 宣告計時器變數

	eImg.eq(Now).css({opacity:0, zIndex: 2}).fadeTo(1000,1).addClass('top-images-show')
		.siblings().css({opacity:0, zIndex: 1});

	eText.eq(Now).addClass("slogan-show");	

	// 把切換圖片的動作獨立成一個功能
	function switchImg() {
		eImg.stop(true, true); // 停止當前的動畫，避免連續點擊造成錯亂
		eText.eq(Now).addClass("slogan-show").siblings().removeClass('slogan-show');
		eImg.eq(Now).addClass('top-images-show')
					.fadeTo(fadeTime,1,function(){
						eImg.eq(Now).siblings().removeClass('top-images-show').css({opacity:0});
					})
					.css({zIndex: 2})
			.siblings().css({zIndex:1});
	}

	function showAuto(){
		Now = (Now < Num-1) ? Now+1 : 0;
		switchImg();
		timer = setTimeout(showAuto, duration);	
	}
	
	// 啟動自動輪播
	timer = setTimeout(showAuto, duration);

	// 右箭頭點擊事件 (下一張)
	$(".slider-next").click(function(){
		clearTimeout(timer); // 暫停自動輪播
		Now = (Now < Num-1) ? Now+1 : 0;
		switchImg();
		timer = setTimeout(showAuto, duration); // 重新啟動計時
	});

	// 左箭頭點擊事件 (上一張)
	$(".slider-prev").click(function(){
		clearTimeout(timer); // 暫停自動輪播
		Now = (Now > 0) ? Now-1 : Num-1; 
		switchImg();
		timer = setTimeout(showAuto, duration); // 重新啟動計時
	});
}