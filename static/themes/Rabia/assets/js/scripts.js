var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

(function ($) {

    "use strict";

	
	/* Jquery Mobile Menu */
	$.fn.mobileMenu = function(options){
		
		var defaults = {
				defaultText: '&#xf170; Navigate to...',
				className: 'select-menu',
				subMenuClass: 'sub-menu',
				subMenuDash: '&ndash;'
			},
			settings = $.extend( defaults, options ),
			el = $(this);
		
		this.each(function(){
			var $el = $(this),
				$select_menu;

			// ad class to submenu list
			$el.find('ul').addClass(settings.subMenuClass);

			// Create base menu
			var $select_menu = $('<select />',{
				'class' : settings.className + ' ' + el.get(0).className
			}).insertAfter( $el );

			// Create default option
			$('<option />', {
				"value"		: '#',
				"text"		: settings.defaultText
			}).appendTo( $select_menu );

			// Create select option from menu
			$el.find('a').each(function(){
				var $this 	= $(this),
					optText	= '&nbsp;' + $this.text(),
					optSub	= $this.parents( '.' + settings.subMenuClass ),
					len		= optSub.length,
					dash;
				
				// if menu has sub menu
				if( $this.parents('ul').hasClass( settings.subMenuClass ) ) {
					dash = Array( len+1 ).join( settings.subMenuDash );
					optText = dash + optText;
				}

				// Now build menu and append it
				$('<option />', {
					"value"	: this.href,
					"html"	: optText,
					"selected" : (this.href == window.location.href)
				}).appendTo( $select_menu );

			}); // End el.find('a').each

			// Change event on select element
			$select_menu.change(function(){
				var locations = $(this).val();
				if( locations !== '#' ) {
					window.location.href = $(this).val();
				};
			});

		}); // End this.each

		return this;

	};
	
	
	
	// Apply fixed style for a element on screen. (position:fixed)
	function fix_element($el){
	
		var $this = $(window);
		
		if($($el).height()+165 > $this.height()){
			return;
		}
	
		var $w = $($el).width();
	
		var $left = $($el).offset().left;
		
		if(!$(document).find(".personal-header").length == 0){
		
			if ($this.scrollTop() > 69) {
			
				$($el).css("width",$w).css("left",$left).css("position","fixed").css("top","99px");
			
			}else{
				
				$($el).removeAttr("style");
				
			}
		
		}else{
		
			if ($this.scrollTop() > 20) {
			
				$($el).css("width",$w).css("left",$left).css("position","fixed").css("top","70px");
			
			}else{
				
				$($el).removeAttr("style");
				
			}
		
		}
		
	}
	
	
	
	
	// Apply fixed style for navigation. (position:fixed)
	function fixed_navigate(){
	
		var $this = $(window),
		$el = $('.navigation-content');
	
	
		if($el.height()+165 > $this.height()){
			return;
		}
		
			
		if($(document).find(".personal-header").length == 0){
			
			if ($this.scrollTop() > 70) {
			
				var $w = $el.width();
		
				var $left = $el.offset().left;
			
				$el.css("width",$w).css("left",$left);
			
			   $el.addClass('fixed fixed-not-personal').removeClass("static");
			   
			} else {
			
			   $el.removeClass('fixed fixed-not-personal');
			   
			}
		
		}else{
		
		
			if ($this.scrollTop() > 119) {
			
				var $w = $el.width();
		
				var $left = $el.offset().left;
			
				$el.css("width",$w).css("left",$left);
			
			   $el.addClass('fixed');
			   
			} else {
			
			   $el.removeClass('fixed');
			   
			}

		
		
		}
		
	}
	
	
	
	
	// Getting document Height.
	function getDocHeight() {
		var D = document;
		return Math.max(
			D.body.scrollHeight, D.documentElement.scrollHeight,
			D.body.offsetHeight, D.documentElement.offsetHeight,
			D.body.clientHeight, D.documentElement.clientHeight
		);
	}
	
	
	
	
	// Checking a element if element visible on screen.
	function isScrolledIntoView(elem)
		{
		
			var docViewTop = $(window).scrollTop();
			var docViewBottom = docViewTop + $(window).height();

			var elemTop = $(elem).offset().top;
			var elemBottom = elemTop + $(elem).height();

			return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
			
		}
		
	
	
	
	// Loading data with Ajax. (posts, portfolio items)
	function get_more_item($el,$selector,$type){
	
	
			if($("body").hasClass("page-template-template-home-php") != true && $("body").hasClass("blog") != true && $("body").hasClass("archive") != true && $("body").hasClass("search-results") != true && $("body").hasClass("page-template-template-portfolio-php") != true){
				return;
			}

			// get data.
			var $total = $($el).attr("data-total-count");
			
			if($($el).attr("data-query")){
				var $query = $($el).attr("data-query");
			}else{
				var $query = 'default';
			}
		
			
			if($($el).attr("data-current")){
				var $current = $($el).attr("data-current");
			}else{
				var $current = $($el).find($selector).length;
			}
			
			var $size = $($el).attr("data-size");

			
			if($type == 'portfolio' || $type == 'portfolio_single'){
				var $in_process = window.in_process_portfolio;
			}
			
			if($type == 'post'){
				var $in_process = window.in_process_post;
			}
			
			// If there still have items.
			if($total != $current && $in_process === false){
				
				// Send Ajax.
				$.ajax({
				
					url: ajax_url+'?action=wf_get_load&type='+$type+'&current_count='+$current+'&size='+$size+'&query='+$query,

					beforeSend: function () {
					
						if($type == 'portfolio' || $type == 'portfolio_single'){
							window.in_process_portfolio = true;
						}else{
							window.in_process_post = true;
						}
						
						if($(".navigation-content #circleG").length == 0){
						
							$(".navigation-content").append('<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>');
						
						}
						
					}

				}).success(function (data) {
					
					$(".navigation").find("#circleG").remove();
					
					if($type != 'portfolio_single'){
					
						$($el).append(data);
						
					}else{
						
						var $data = $($.parseHTML(data));

						
						// Check if imagesloaded.
						$("body").append("<div class='rabia-test-drive' style='display:none;width:0;height:0;overflow:hidden;visibility:hidden;'></div>");
						
						// if loaded.
						$(".rabia-test-drive").append(data).imagesLoaded( function() {

							// update current elements.
							$($el).attr("data-current",$(data).find("div").length+$($el).find($selector).length);
							
							$data.imagesLoaded( function() {
								$($el).isotope( 'insert', $data);
							});
							
							$(".rabia-test-drive").remove();
							
							if($type == 'portfolio_single'){
								window.in_process_portfolio = false;
							}
						
						});
						
						
					}

					if($type == 'portfolio' || $type == 'post'){
					
					
						$(".load-animate").each(function(i, el){
							
							setTimeout(function (){
							
								$(el).animate({opacity:1, top: "0px" }, 'normal', function() {
									$(this).removeClass("load-animate");
								});
								
							}, 20 + (i * 110));
							

						});
						
						
					}
					
					if($type == 'portfolio'){
						window.in_process_portfolio = false;
					}else{
						window.in_process_post = false;
					}
					
					$(window).scroll();

				});
				
			}
	
	}
	
	
	
	
	// Skill Filters Menu.
	$(".skills-filters .filters").click(function(){
	
		var $ul = $(this).parent();
		var $btn = $(this);

		var $dw = $btn.outerWidth()+3;
		
		
		if($btn.hasClass("clicked")){
			
			$btn.removeClass("clicked");
			
			$ul.find(".skill-filter").hide();
				
			$ul.width($dw+3);
			
			$btn.find(".b-filter").show();
			
			$btn.find(".b-close").hide();
			
		}else{
		
			$btn.addClass("clicked");
			
			$ul.find(".skill-filter").css("display","inline-block");
				
			$ul.width("auto");
			
			$btn.find(".b-filter").hide();
			
			$btn.find(".b-close").show();
			
		}

		
	});
	
	
	
	
	// Skill Filter (Isotope)
	$(".skills-filters .skill-filter").click(function(){
	
		if(!$(this).hasClass("active")){
		
			$(".skills-filters .skill-filter.active").each(function(){
			
				$(this).removeClass("active");
			
			});
			
			$(this).addClass("active");
			
		}
		
		
		var selector = $(this).attr('data-filter');
		
		$(".isotope-container").isotope({
			filter: selector
		});
		
		if(isScrolledIntoView($(".isotope-container .item:visible").last()) || $(window).scrollTop() + $(window).height() == getDocHeight() || $(window).scrollTop() > $(".isotope-container .item:visible").last().position().top){
			
				get_more_item('.isotope-container','.item','portfolio_single');	

		}
		

	});
	
	
	
	
	// Portfolio item
	$(".item").live("hover",function(){
	
		var $title_h = $(this).find("h3").height();

		var $item_h = $(this).height();
		
		$(this).find(".hover h3").css("paddingTop",($item_h/2)-($title_h/2));
	
	});
	
	
	
	
	// Loading Rules
	/*
		This function check if there is have more posts, make get data with ajax. ie: infinite scroll.
	*/
	function loading_rules(){
	
		// if is home template
		if($("body").hasClass("page-template-template-home-php")){
		
			if($(".isotope-container .item").length > 0){
			
				if(isScrolledIntoView($(".isotope-container .item").last()) || $(window).scrollTop() + $(window).height() == getDocHeight() || $(window).scrollTop() > $(".isotope-container .item").last().position().top){
				
					get_more_item('.isotope-container','.item','portfolio');
					
				}
				
			}
		
		}

		
		// if is home template or blog template. 
		if($("body").hasClass("page-template-template-home-php") || $("body").hasClass("blog") || $("body").hasClass("archive") || $("body").hasClass("search-results")){
		
			if($(document).find(".posts-container .loop-post-body").length > 0){
				if(isScrolledIntoView($(".posts-container .loop-post-body").last()) || $(window).scrollTop() + $(window).height() == getDocHeight() || $(window).scrollTop() > $(".posts-container .loop-post-body").last().position().top){
				
					get_more_item('.posts-container','.loop-post-body','post');
					
				}
			}
			
			if($(document).find(".popular-posts-container .loop-post-body").length > 0){
				if(isScrolledIntoView($(".popular-posts-container .loop-post-body").last()) || $(window).scrollTop() + $(window).height() == getDocHeight() || $(window).scrollTop() > $(".popular-posts-container .loop-post-body").last().position().top){
				
					get_more_item('.popular-posts-container','.loop-post-body','post');
					
				}
			}
		
		}
		
		
		// if is portfolio template.
		if($("body").hasClass("page-template-template-portfolio-php")){
		
			if($(".isotope-container .item").length > 0){
			
				if(isScrolledIntoView($(".isotope-container .item:visible").last()) || $(window).scrollTop() + $(window).height() == getDocHeight() || $(window).scrollTop() > $(".isotope-container .item:visible").last().position().top){
				
					get_more_item('.isotope-container','.item','portfolio_single');				
					
				}
			
			}
		
		}
		
	
	}
	
	
	// Colorbox
	if($(window).width() > 992){
	
		// Colorbox for dynamic content.
		$('.colorbox-url').live('click', function(){
			$.colorbox({href:$(this).attr('href'), open:true, maxWidth:'80%', maxHeight:'80%', fixed:true});
			return false;
		});
			
		$('.default-content a[href$=".gif"],.default-content a[href$=".jpg"],.default-content a[href$=".png"],.default-content a[href$=".bmp"],.post-content a[href$=".gif"],.post-content a[href$=".jpg"],.post-content a[href$=".png"],.post-content a[href$=".bmp"]').live('click', function(){
			$.colorbox({href:$(this).attr('href'), open:true, rel:'gallery', maxWidth:'80%', maxHeight:'80%', fixed:true});
			return false;
		});
		
	}
	
	
	// Navigation Fixed Mode.
	window.in_process_portfolio = false;
	window.in_process_post = false;
	
	
	
	// Functions On Scroll
	$(window).scroll(function () {
		
		
		loading_rules();
		
		
		// portfolio single fixed right
		if($(document).find(".content-single-info").length > 0){
			fix_element(".content-single-info");
		}
		
		// if not is home
		if(!$("body").hasClass("page-template-template-home-php")){
			fix_element(".navigation-content");
		}
		
		// if is home.
		if($("body").hasClass("page-template-template-home-php")){
			fixed_navigate();
		}
		
	});
	
	
	
	// On window resize
	$(window).resize(function(){
	
		// portfolio single fixed right
		if($(document).find(".content-single-info").length > 0){
			fix_element(".content-single-info");
		}
		
		// if not is home
		if(!$("body").hasClass("page-template-template-home-php")){
			fix_element(".navigation-content");
		}
		
		// if is home.
		if($("body").hasClass("page-template-template-home-php")){
			fixed_navigate();
		}
		
		automatic_resize();
		
	});
	
	
	// Fix Automatic Height and width problems
	function automatic_resize(){
	
		// Auto Set min height for container.
		var $globalHeight = $(window).height() - $("#header").outerHeight() - $("#footer").outerHeight() - 70;
		
		var $sidebarHeight = $(".navigation").outerHeight();
		
		
		if($(document).find(".content-single-info").length > 0){
			var $fixed_RightContent = $(".content-single-info").outerHeight();
		}else{
			var $fixed_RightContent = 0;
		}
		
		var $heights = [$sidebarHeight,$globalHeight,$fixed_RightContent];
		var $maximumHeight = Math.max.apply(Math,$heights);
		
		$(".global-section").css("minHeight", $maximumHeight);
		
		window.scrollTo(0, 0);
		
		if($("body").hasClass("page-template-template-home-php")){
			$(".navigation-content").css("width","auto").css("left","auto");
		}
		
	}
	
	
	
	// Functions on document Ready.
	$(document).ready(function(){
	
	
		// Mobile Menu
		$('ul.mobile-menu-ul').mobileMenu({
			defaultText: 'Navigate to...',
			className: 'wf-select-menu',
			subMenuDash: '&nbsp;&nbsp;&nbsp;&ndash;'
		});
	
	
		loading_rules();
		

		
		// portfolio single fixed right
		if($(document).find(".content-single-info").length > 0){
			fix_element(".content-single-info");
		}
		
		
		// if not is home
		if(!$("body").hasClass("page-template-template-home-php")){
			fix_element(".navigation-content");
		}
		
		// if is home.
		if($("body").hasClass("page-template-template-home-php")){
			fixed_navigate();
		}
	
		automatic_resize();
	
		// Bootstrap Tooltip
        $('[data-toggle="tooltip"]').tooltip().filter('[data-trigger*="click"]').on('click', function (e) {
			e.preventDefault();
		});
		
		
		// Colorbox
		if($(window).width() > 992){
			$(".colorbox-url").colorbox({maxWidth:'80%', maxHeight:'80%', fixed:true});
		
			$('.default-content a[href$=".gif"],.default-content a[href$=".jpg"],.default-content a[href$=".png"],.default-content a[href$=".bmp"],.post-content a[href$=".gif"],.post-content a[href$=".jpg"],.post-content a[href$=".png"],.post-content a[href$=".bmp"]').colorbox({rel:'gallery', maxWidth:'80%', maxHeight:'80%', fixed:true});
		}
		
		// Portfolio Isotope
		if($("body").hasClass("page-template-template-portfolio-php")){
		
			var $container = $('.isotope-container');
			
			$container.imagesLoaded( function() {
				$container.isotope({

					resizable: false,
					resizesContainer: false,
					
					itemSelector: '.item'
					
				});
			});
			
		}
		
		// Auto margin for footer.
		if($("body").find(".footer-content").length > 0){
			var $footer_left = $("#footer .footer-content");
			var $extraMargin = 0;
		}else{
			var $footer_left = $("#footer .footer-list");
			var $extraMargin = 10;
		}
		
		if($footer_left.outerHeight() == 79){
			var $footerList = 80;
		}else{
			var $footerList = $footer_left.outerHeight();
		}
		
		var $footerHeight = $footerList+$extraMargin;
		var $socialMargin = ($footerHeight-$(".social-list").outerHeight())/2;
		
		if($socialMargin < 0){
			$footer_left.css("marginTop",Math.abs($socialMargin));
			$("#footer .social-list").css("marginTop",0);
		}else{
			$("#footer .social-list").css("marginTop",$socialMargin);
		}
		
		
		// Loading.
		$("#header,#footer,.global-section").css("visibility","visible");
		$(".loader").css("visibility","hidden");
		
	});
	
	
	
	
	// Google Map Setup.
    function initialize() {
	
        if (typeof LOCATION1 != 'undefined'){
		
            var map;

            var myLatlng = new google.maps.LatLng(LOCATION1, LOCATION2);

            var mapOptions = {
                zoom: ZOOMLEVEL,
                scrollwheel: true,
                mapTypeControl: false,
                navigationControl: false,
                streetViewControl: false,
                panControl: false,
                zoomControl: false,
                center: myLatlng,
				
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
			
			

            var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
            });
			
        }

    }
	
    if (typeof LOCATION1 != 'undefined' && typeof google != 'undefined') {
        google.maps.event.addDomListener(window, 'load', initialize);
    }

	
	
	
	// Ajax Contact Form
	$(".contact-form").submit(function () {
		
		var $this = $(this);
	
		if($this.find('.name').val() != '' && $this.find('.email').val() != '' && $this.find('.message').val() != ''){
			
			// SEND AJAX
			$.ajax({
				url: ajax_url+'?action=wf_ajax_contact_send&name='+$(".name").val()+'&email='+$(".email").val()+'&message='+$(".message").val(),
				
				beforeSend: function () {

					$this.find("#submit").val(LOADING).prop('disabled', true).addClass("disabled");
				
				}
			
			}).success(function () {
				$this.find("#submit").val(THANK).prop('disabled', true).addClass("disabled");
            });
		
		}else{
			$this.find("#submit").val(WARNING);
		}
		
		return false;
		
	});
	
	
	
	// Social Hover
	$(".social-list li").hover(function(){
		
		$(".social-list li").not(this).css("opacity","0.2");
		
	},function(){
	
		$(".social-list li").not(this).css("opacity","0.8");
	
	});	
	
	// Social Hover
	$(".share-list li").hover(function(){
		
		$(".share-list li").not(this).css("opacity","0.2");
		
	},function(){
	
		$(".share-list li").not(this).css("opacity","0.8");
	
	});	
	
	
	// Facebook Share button
	var windowLocation = window.location.href.replace(window.location.hash, '');
	
	$('.share-facebook').click(function () {
		window.open('http://web.archive.org/web/20211106071815/https://www.facebook.com/sharer/sharer.php?u=' + windowLocation, "facebookWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0")
		return false;
	});
		
		
		
	// Twitter Tweet button
	$('.share-twitter').click(function () {
		
		var $pageTitle = $(document).find(".port-title").text()+' â€“';

		window.open('http://web.archive.org/web/20211106071815/http://twitter.com/intent/tweet?text=' + $pageTitle + ' ' + windowLocation, "twitterWindow", "height=420,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=1");

		return false;

	});
	
	
	
	// Google+ Share button
	$('.share-google').click(function () {
	
		window.open('http://web.archive.org/web/20211106071815/https://plus.google.com/share?url=' + windowLocation, "googleWindow", "height=620,width=618,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=1");

		return false;

	});
	
	
	
	// Pin it button
	$('.share-pinterest').click(function () {
	
		var $pageTitle = $(document).find(".port-title").text();
		
		if($("body").hasClass("single-portfolio")){
			
			if($(document).find(".v-slider").find("img").attr("src") != ''){
				var $pageImage = $(document).find(".v-slider").find("img").attr("src");
			}
			
		}else{
			
			if($(document).find(".post-type-content").find("img").attr("src") != ''){
				var $pageImage = $(document).find(".post-type-content").find("img").attr("src");
			}
		
		}
	
		window.open('http://web.archive.org/web/20211106071815/http://pinterest.com/pin/create/bookmarklet/?media='+$pageImage+'&url='+windowLocation+'&is_video=false&description='+$pageTitle+'', "googleWindow", "height=620,width=618,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=1");

		return false;

	});
	
	
}(jQuery));

}
/*
     FILE ARCHIVED ON 07:18:15 Nov 06, 2021 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 16:13:02 Nov 27, 2021.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 540.672
  exclusion.robots: 0.228
  esindex: 0.017
  exclusion.robots.policy: 0.213
  cdx.remote: 0.103
  load_resource: 65.068
  PetaboxLoader3.datanode: 112.008 (4)
  LoadShardBlock: 496.531 (3)
  CDXLines.iter: 19.254 (3)
  PetaboxLoader3.resolve: 41.715
*/