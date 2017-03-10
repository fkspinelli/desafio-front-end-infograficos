$(document).ready(function(){
	$slideshow = $(".slide ul");
	$.ajax({ 
	    type: 'GET', 
	    url: './json/slide.json',
	    dataType: 'json',
	    async: false,
	    success: function (data) { 
	        console.log(data[0].imagens[0]);
	        for(i=0; i<data[0].imagens.length; i++){
	        	$slideshow.append('<li style="background-image: url(img/slide/'+data[0].imagens[i]+');"></li>');
	        	$('.slide .itens p').append('<span></span>');
	        }
	    }
	});

	$('.slide .itens span:first-child').addClass('active');
	$(document).on('click', '.slide .itens span', function(){
		$slideshow.find('li').removeClass('active');
		$(".slide ul li:eq("+$(this).index()+")").addClass('active');
		$('.slide .itens span').removeClass('active');
		$(this).addClass('active');
		verifyItem();
	});

	$slideactive = $slideshow.find("li").first().addClass('active').show();
	verifyItem();
	$(".slide .navigator .next").click(function(){
		$slideactive = $slideshow.find("li.active").next();
		if($slideactive.length > 0) {
			$slideshow.find("li").removeClass('active');
			$slideactive.addClass('active');
		}else{
			$(".slide .navigator .next").addClass('disabled');
		}
		verifyItem();
	});
	$(".slide .navigator .prev").click(function(){
		$slideactive = $slideshow.find("li.active").prev();
		if($slideactive.length > 0) {
			$slideshow.find("li").removeClass('active');
			$slideactive.addClass('active');
		}else{
			$(".slide .navigator .prev").addClass('disabled');
		}
		verifyItem();
	});
	function verifyItem(){
		if($slideshow.find("li.active").next().length == 0){
			$(".slide .navigator .next").addClass('disabled');
		}else{
			$(".slide .navigator .next").removeClass('disabled');
		}
		if($slideshow.find("li.active").prev().length == 0){
			$(".slide .navigator .prev").addClass('disabled');
		}else{
			$(".slide .navigator .prev").removeClass('disabled');
		}
		$('.slide .itens span').removeClass('active');
		$('.slide .itens span:eq('+$slideshow.find("li.active").index()+')').addClass('active');
	}
});