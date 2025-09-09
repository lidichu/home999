
$(function(){
	$(".page-sort a").click(function() {
		var pageId= $(this).data("id");
		var headerH = $(".header").outerHeight();
		var contT = $("#"+pageId).offset().top-headerH;

		$("body,html").stop().animate({scrollTop: contT},1000);

		return false;
	});
})