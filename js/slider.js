$('document').ready(function(){
	var $carousel = $('.carousel');
	var $nav = $('.nav');
/*-----------------------------------------Define array of slide objects*/
	var images = [];
	images[0] = {
		name: 'balloon.jpg',
		caption:''
	};
	images[1] = {
		name: 'dragon.jpg',
		caption:''
	};
	images[2] = {
		name: 'brain.jpg',
		caption:''
	};
	images[3] = {
		name: 'oct.jpg',
		caption:''
	};
	images[4] = {
		name: 'tongue.jpg',
		caption:''
	};
	images[5] = {
		name: 'bow.jpg',
		caption:''
	};
	images[6] = {
		name: 'skull.png',
		caption:''
	};
/*-----------------------------------------Function to load images to carousel and render navigation dots*/
	var addSlides = function(a){
		for (elt in a) {
			var x = parseInt(elt)+1;
			$carousel.append('<div class="slide"><img class="slideImage" src="images/'+a[elt].name+'"></div>')
			$nav.append('<div class="dot'+x.toString()+'"></div>');
			$('.dot1').addClass('fillDot');
		};
	};
	addSlides(images);
	$nav.css('width',(images.length-1)*36);
/*-----------------------------------------------------------------------Function to move to selected slide*/	
	/*-----------------------------------------------Check if arrows or dots clicked*/
	var listener = function(){
		$('.next').click(function(){
			step = 1;
		});
		$('.previous').click(function(){
			step = -1;
		});
		for (elt in images){
			(function(a){
				var y = parseInt(a) + 1;
				var z = '.dot' + y.toString();
				$(z).click(function(){
					step = y-count;
				});
			})(elt);
		};
	};
	/*-----------------------------------------------Move slider and update dots/arrows*/
	var left = 0;
	var count = 1;
	var elt_num = 0;
	var left_elt = 0;
	var right_elt = 6;
	var step = 0;
	var new_div;	
	var move = function(arg){
		if (arg>0 && count===images.length) {
			$carousel.append($('<div class="slide"><img class="slideImage" src="images/'+images[left_elt].name+'"></div>'));
			$('.slide:first-child').remove();
			$carousel.css('left', '-2750px');
			left = -2750;
			count = 6;
			right_elt = left_elt;
			if (left_elt===6) {
				left_elt = 0
			} else {
				left_elt += 1;
			};
		};
		if (arg<0 && count===1) {
			$carousel.prepend($('<div class="slide"><img class="slideImage" src="images/'+images[right_elt].name+'"></div>'));
			$('.slide:last-child').remove();
			$carousel.css('left', '-550px');
			left = -550;
			count = 2;
			left_elt = right_elt;
			if (right_elt===0) {
				right_elt = 6
			} else {
				right_elt -= 1;
			};	
		};
		if ((arg > 0 && count < images.length) || (arg < 0 && count > 1)){
			count += arg;
			left -= 550 * arg;
			$('.dot' + count.toString()).addClass('fillDot');
			$('.dot' + (count-arg).toString()).removeClass('fillDot');
			$carousel.animate({left: left.toString()+'px'})/*.promise().done(function(){	
				if (count===1) {		
					$('.previous').addClass('hidden');
				} else {
					$('.previous').removeClass('hidden');
				};
				if (count===images.length) {		
					$('.next').addClass('hidden');
				} else {
					$('.next').removeClass('hidden');
				};
			});*/	
		};
		step = 0;	
	};
/*--------------------------------Start automatic slider*/
	var slider = setInterval(function(){
		move(1);},2000);
/*--------------------------------Listener loop*/
	var listen = setInterval(function(){
		listener();
		if(step != 0){
			clearInterval(slider);
			move(step);
		};},200);

});
/*-----------------------------------------------Alternative method (avoiding need for extra closure) for checking which dot was clicked*/
	/*images.forEach(function(elt,index,array){
		var y = index + 1;
		var z = '.dot' + y.toString();
		$(z).click(function(){
			move(y-count);
		});
	});*/

/*How to add a new element as hidden and then use an effect to show it
var new_div = $('<div class="slide"><img class="slideImage" src="images/'+images[images.length-1].name+'"></div>').hide();
			$carousel.prepend(new_div);
			new_div.show('normal');*/