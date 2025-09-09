function setFotorama(){
	var maxWidth = $(window).width()- 160;
	var workHeight = $(window).height()-100;
	var workWidth = workHeight * 18 / 12; 
	var isFotorama=$(".fotorama").length;

	var op={
		width: workWidth,
		height: workHeight,
		maxwidth: maxWidth,
		nav:false,
		fit:'scaledown',
		arrows:false,
		stopautoplayontouch: false,
		loop:true,
		transition:'crossfade',
		transitionduration:1000,
		thumbwidth:60,
		thumbheight:40,
		thumbmargin:3
	}

	var eImg = $(".photos-list img");
	var imgUrl = $(".photos-list").data('url');

	if(isDevice()=="pc"){
		if(!isFotorama){
			eImg.each(function(index, el) {
				var imgNum = index+1;
				var imgSrc = "images/portfolio/"+imgUrl+"/"+imgNum+".jpg";
				$(this).attr("src",imgSrc);
			});

			$fotoramaDiv = $('.photos-list').fotorama();
			fotorama = $fotoramaDiv.data('fotorama');
		}
		fotorama.setOptions(op);
	}else{
		if(isFotorama){
			fotorama.destroy();
			$('.photos-list').removeClass('fotorama');
		}
		eImg.each(function(index, el) {
			var imgNum = index+1;
			var imgSrc = "images/portfolio_s/"+imgUrl+"/"+imgNum+".jpg";
			$(this).attr("src",imgSrc);
		});
	}

}

function setShare(){
	// <!--Share-->
	var shareTitle="禾久設計作品-"+$('.case-name').html();
	var shareUrl=$(location).attr('href');
	var imgUrl = $(".photos-list").data("url");
	//取得網站根目錄的路徑
	function getBaseUrl() {
		var re = new RegExp(/^.*\//);
		return re.exec(window.location.href);
	}
	var BaseUrl=getBaseUrl();
	var shareImg=BaseUrl+'images/portfolio/'+imgUrl+'/1.jpg';
	
	var shareHtml="<a href='http://www.facebook.com/share.php?u="+shareUrl+"' target='_blank' class='sh_to_fb'><i class='fa fa-facebook' aria-hidden='true'></i></a>"	
	+"<a href='https://plus.google.com/share?url="+shareUrl+"' target='_blank' class='sh_to_google'><i class='fa fa-google-plus' aria-hidden='true'></i></a>"
	+"<a data-pin-do='buttonPin' href='https://www.pinterest.com/pin/create/button/?url="+shareUrl+"&media="+shareImg+"&description="+shareTitle+"' data-pin-custom='true' target='_blank' class='sh_to_pin'><i class='fa fa-pinterest-p' aria-hidden='true'></i></a>"
	+"<a href='http://twitter.com/intent/tweet?status="+shareTitle+" website:"+shareUrl+"' target='_blank' class='sh_to_twitter'><i class='fa fa-twitter' aria-hidden='true'></i></a>"
	+"<a href='mailto:?subject=好作品分享："+shareTitle+"&body="+shareTitle+":"+shareUrl+"' class='sh_to_mail'><i class='fa fa-envelope' aria-hidden='true'></i></a>"

	$(".case-share").append(shareHtml);
}

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