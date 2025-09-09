// 網頁自動下滑
$(window).load(function(){
	$("body,html").animate({scrollTop: $(".main-cont").position().top},800)
})

//var map;
function initMap() {
	var Num = 1;
	var myLatLng = {lat: 25.057085815419142, lng: 121.48708837835167};
	var mapCenter = (isDevice() == "pc") ? {lat: 25.057085815419142, lng: 121.48708837835167} : {lat: 25.057085815419142, lng: 121.48708837835167};
	var mapUrl = 'https://goo.gl/maps/JqL5S1EYCqCZSHQw6';
	var zoom = (isDevice() == "pc") ? 17 : 16;

	function setMap(){
	
		var mapOptions = {
			zoom: zoom,
			center: mapCenter,
			mapTypeControl:false, //地圖類型控制項,
			streetViewControl:false,//街景服務控制項
			scrollwheel: false,
			styles: [				
					{"elementType": "labels.icon", "stylers": [{"visibility": "off"}]},
					{"featureType": "transit", "elementType": "labels.icon", "stylers": [{"visibility": "on"}]},
					{"featureType": "landscape.man_made", "stylers": [{"color": "#f6f6f6"}]}
			]
		}
		var map = new google.maps.Map(document.getElementById("map"),mapOptions);
		var marker = new google.maps.Marker({
			position: myLatLng,
			map: map,
			title:'禾久設計',
			icon: 'images/label.png',
			url: mapUrl
		});
		
		marker.addListener('click', function() {
			var mapurl=this.url;
			window.open(mapurl,'_blank'); 
		});
	}

	setMap();
}


function setConsult(){
	$("#button").click(function(){
    	$(".form-text, .captcha-input").removeClass('error');
        var scrollT=0;
        var headerH = $(".header").outerHeight()+50;
        if($("#username").val()==""){
            $("#username").attr("placeholder","您的姓名尚未填寫!!").parent('.form-text').addClass('error');
            scrollT=$("#username").offset().top-headerH;
            $("body,html").stop().animate({scrollTop:scrollT},800);
        }else if($("#phone").val()=="" && $("#email").val()==""){
        	$("#phone").attr("placeholder","您的電子信箱或連絡電話尚未填寫!!").parent('.form-text').addClass('error');
        	$("#email").attr("placeholder","您的電子信箱或連絡電話尚未填寫!!").parent('.form-text').addClass('error');
             scrollT=$("#email").offset().top-headerH;
            $("body,html").stop().animate({scrollTop:scrollT},800);
        }else if($("#message").val()==""){
        	$("#message").attr("placeholder","您的諮詢內容尚未填寫!!").parent('.form-text').addClass('error');
            scrollT=$("#message").offset().top-headerH;
            $("body,html").stop().animate({scrollTop:scrollT},800);
        }else if($("#captcha").val()==""){
        	$("#captcha").attr("placeholder","您的驗證碼尚未填寫!!").parent('.captcha-input').addClass('error');
        }else{
            document.to_mail.submit();
        }
    })

	//點到的時候
	$("#username, #message, #captcha").focus(function() {
		$(this).parent().removeClass('error');
	})
	//點其他地方的時候
	$("#username, #message, #captcha").blur(function() {
		if($(this).val()!="") {  
			$(this).parent().removeClass('error');
		}else{
			$(this).parent().addClass('error');
		}
	})

	//點到的時候
	$("#phone, #email").focus(function() {
		$("#phone, #email").parent().removeClass('error');
		$("#phone, #email").attr("placeholder","");
	})

	//點其他地方的時候
	$("#phone, #email").blur(function() {
		if($('#phone').val()!=""||$('#email').val()!="") {
			$("#phone, #email").parent().removeClass('error');
		}else{
			$("#phone").attr("placeholder","您的電子信箱或連絡電話尚未填寫!!").parent().addClass('error');
        	$("#email").attr("placeholder","您的電子信箱或連絡電話尚未填寫!!").parent().addClass('error');
		}
	})

    if (typeof(Storage) !== "undefined") {
        var err = sessionStorage.getItem("codeerror");
        if(err == "error"){
            $("#captcha").val("");
            $("#captcha").attr("placeholder","驗證碼錯誤!!").parent().addClass('error');
        }
    }
}

$(function(){
	setConsult();
})