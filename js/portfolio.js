function setSelect(){
	var scrollT = $(window).scrollTop();
	var winH = $(window).height()-110;

	if(scrollT>=winH){
		$(".list-select").addClass('show-select');
	}else{
		$(".list-select").removeClass('show-select');
	}
}

$(window).scroll(function(){
	setSelect();
})

$(window).load(function(){
	setSelect();

	var eBtn = $(".work-sort li");
	var eList = $(".list"),
		eItem = $(".list-item"),
		listNum = eItem.length,
		listHtml = eList.html();

	//新成屋
	var eNew = $(".case-new"),
		newNum = eNew.length,
		newHtml= "";

	for(var i=0; i<newNum; i++){
		newHtml+="<div class='list-item show-item case-new'>"+eNew.eq(i).html()+"</div>";
	}

	//中古屋
	var ePre = $(".case-preowned"),
		preNum = ePre.length,
		preHtml= "";

	for(var i=0; i<preNum; i++){
		preHtml+="<div class='list-item show-item case-preowned'>"+ePre.eq(i).html()+"</div>";
	}

	//老屋翻新
	var eOld = $(".case-old"),
		oldNum = eOld.length,
		oldHtml = "";

	for(var i=0; i<oldNum; i++){
		oldHtml+="<div class='list-item show-item case-preowned'>"+eOld.eq(i).html()+"</div>";
	}

	//按鈕設定

	eBtn.click(function(){
		var index = $(this).index();		
		var sort = $(this).data("sort");
		var innerHtml = "";

		innerHtml = (sort == "case-new") ? newHtml : (sort == "case-preowned") ? preHtml : (sort == "case-old") ? oldHtml : listHtml;

		$(".list-item").hide("normal",function(){
			eList.html(innerHtml);		
			$("body,html").stop().animate({scrollTop: eList.offset().top-110},1000);	
		})
	})

	$(".top-button").click(function(){
		$("body,html").stop().animate({scrollTop: 0},1000);
		return false;
	})

	function resetList(){
		var nowListNum = $(".list-item").length
		if(nowListNum != listNum){
			eList.html(listHtml);
		}
	}

	$(window).resize(function(){
		resetList();
	})

})