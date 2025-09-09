
function showImages(){
	var eImg = $(".top-images-img"),
		eText = $(".slogan"),
		Num = eImg.length,
		Now = 0,
		fadeTime = 2000,
		duration = 8000;

	eImg.eq(Now).css({opacity:0, zIndex: 2}).fadeTo(1000,1).addClass('top-images-show')
		.siblings().css({opacity:0, zIndex: 1});

	eText.eq(Now).addClass("slogan-show");	

	function showAuto(){
		Now = (Now < Num-1) ? Now+1 : 0;
		eText.eq(Now).addClass("slogan-show").siblings().removeClass('slogan-show');
		eImg.eq(Now).addClass('top-images-show')
					.fadeTo(fadeTime,1,function(){
						eImg.eq(Now).siblings().removeClass('top-images-show').css({opacity:0});
					})
					.css({zIndex: 2})
			.siblings().css({zIndex:1});

		setTimeout(showAuto,duration);	
	}
	setTimeout(showAuto,duration);
}


$(window).load(function(){
	showImages();
})