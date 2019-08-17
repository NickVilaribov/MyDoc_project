$(function() {
  //VARIABLES
  //$('.dropdown-toggle').dropdown()

  //NICE SELECT
  //$('.niceselect').niceSelect();
  //MASKED INPUT
  //$('.phone-masked').mask('+375 (99) 999-99-99', {placeholder: '-'});

  //CAROUSELS

  var smCarousel = $(".sm-carousel");

  var smCarouselSettings = {
    items: 1,
    margin: 20,
    smartSpeed: 700,
    loop: true,
    dots: true,
  }

  $(".main-slider").owlCarousel({
    items: 1,
    smartSpeed: 700,
    margin: 32,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    dotsEach:1,
    animateOut: 'fadeOut',
    loop: true,
    dots:  true,
    nav: false,
    responsive:{
      768:{
        nav: true
      }
    }
  });

  // $(".partners-carousel").owlCarousel({
  //   items: 1,
  //   smartSpeed: 700,
  //   margin: 32,
  //   autoplay: true,
  //   autoplayTimeout: 5000,
  //   autoplayHoverPause: true,
  //   dotsEach:5,
  //   loop: true,
  //   dots:  true,
  //   nav: false,
  //   responsive:{
  //     768:{
  //       items:4
  //     },
  //     992:{
  //       items:6
  //     },
  //   }
  // });

  // RESIZE INIT
  // Set mobile functions on wisndow.width

  var setAdaptive = window.debounce(function(){
    var screenWidth = $(window).width();
    if (screenWidth <= 767) {
      $('.sm-carousel').addClass('owl-carousel').removeClass('row');
      $('.sm-carousel__item').addClass('p-0 mx-w-100p');
      //$('.page-wrapper').removeClass('w-100p');
      smCarousel.owlCarousel(smCarouselSettings);

    }else {
      smCarousel.trigger('destroy.owl.carousel');
      $('.sm-carousel').removeClass('owl-carousel').addClass('row');
      $('.sm-carousel__item').removeClass('p-0 mx-w-100p');
      //$('.page-wrapper').addClass('w-100p')
    }
  });
  setAdaptive(); 

  $(window).resize(function(){
    setAdaptive();
  })

  // -----------------
  
  //FANCYBOX
  $("[data-fancybox]").fancybox({
    infobar : true,
    buttons : true,
    slideShow : false,
    fullScreen : false,
    thumbs : false,
    loop : false,
    margin : [30, 0],
    buttons: [
    //"zoom",
    //"share",
    "slideShow",
    //"fullScreen",
    //"download",
    "thumbs",
    "close"
  ],
  });

  // // Mixitup TABS
  // $('.nav-tabs li').click(function(){
  //   $('.nav-tabs li').removeClass('is-active');
  //   $(this).addClass('is-active');
  // });

  // if(document.querySelector('.tab-content')) {
  //   var mixer = mixitup(document.querySelector('.tab-content'),{
  //     animation: {
  //         enable: true,
  //         duration: 300,
  //     }
  //   });
  // };
  
  // EXPANDER

  $('.expand-opener-btn').click(function(e){
    var item = $(this).closest('.expand-wrapper');
    if(item.hasClass('opened')){
      item.find('.expand-content').slideToggle(function(){
        item.toggleClass('opened');
      });
    }else{
      item.parent().find('.expand-wrapper.active .expand-content').slideToggle(function(){
        $(this).parent().toggleClass('opened');
      });
      item.find('.expand-content').slideToggle(function(){
        item.toggleClass('opened');
      });
    }
    e.preventDefault();
  });

  
  $('.accordion-opener').click(function(e){
    var item = $(this).closest('.accordion-wrapper');
    if(item.hasClass('opened')){
      item.find('.accordion-content').slideToggle(function(){
        item.toggleClass('opened');
      });
    }else{
      item.parent().find('.accordion-wrapper.active .accordion-content').slideToggle(function(){
        $(this).parent().toggleClass('opened');
      });
      item.find('.accordion-content').slideToggle(function(){
        item.toggleClass('opened');
      });
    }
    e.preventDefault();
  });


  //AJAX EMAIL SEND
  // $("#form_1, #form_2").submit(function() {
  //   var th = $(this);
  //   var data = th.serialize();
  //   $.ajax({
  //     type: "POST",
  //     url: "assets/build/mail.php",
  //     data: data,
  //     success: function(msg){
  //       if(msg === "ok"){
  //         th.find('.form__success').addClass('is-active').hide().fadeIn(400);
  //         th.find('span').hide().delay(300).fadeIn(600);
  //           setTimeout(function() {
  //             th.trigger('reset');
  //             th.find('span').fadeOut(400);
  //             setTimeout(function() {
  //               th.find('.form__success').removeClass('is-active').fadeOut();
  //             },400)
  //         }, 3000);
  //         th.trigger("reset");   
  //       }else{
  //         th.find('.form__success').addClass('is-active').hide().fadeIn(400);
  //         th.find('span').hide().delay(300).fadeIn(600);
  //           setTimeout(function() {
  //             th.trigger('reset');
  //             th.find('span').fadeOut(400);
  //             setTimeout(function() {
  //               th.find('.form__success').removeClass('is-active').fadeOut();
  //             },400)
  //             th.trigger("reset");
  //         }, 3000);
  //         th.trigger("reset");  
  //       }
  //     },
  //     error: function(){
  //       th.find('.form__error').addClass('is-active').hide().fadeIn(400);
  //       th.find('span').hide().delay(300).fadeIn(600);
  //         setTimeout(function() {
  //           th.trigger('reset');
  //           th.find('span').fadeOut(400);
  //           setTimeout(function() {
  //             th.find('.form__error').removeClass('is-active').fadeOut();
  //           },400)
  //         }, 3000);
  //     }
  //   });
  //   return false;
  // });





  $(".hamburger").click(function() {
    if ($(".mobile-navigation").is(":visible")) {
      $(".mobile-navigation").fadeOut(300);
      
      $('body').toggleClass('noscroll');
      if(navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {           
          $('body').scrollTop(window.scrollPositionMobile);
      } else {
          $('html, body').scrollTop(window.scrollPositionDesctop);
      }
      $('.hamburger').toggleClass("is-active");
      $(".burger-wrapper").toggleClass("active");
    } else {
      window.scrollPositionMobile = $('body').scrollTop();
      window.scrollPositionDesctop = $('html, body').scrollTop();
      $(".mobile-navigation").fadeIn(300);
      $(".hamburger").toggleClass("is-active");
      $(".burger-wrapper").toggleClass("active");
      setTimeout(function(){
        $('body').toggleClass('noscroll');
      },300)
      
      
      //$('body').css({overflow: "hidden"});
      //$('html').css({overflow: "hidden"});
    };
  });

  $(".mobile-navigation ul a, .mobile-navigation__btn").click(function() {
		$(".mobile-navigation").fadeOut(300);
		$(".hamburger").toggleClass("is-active");
		$('body').toggleClass('noscroll');
	}).append("<span>");



  $(".nav-bar--scroll .hamburger").click(function(){
    $(".mobile-navigation .top-bar").addClass('dn-i');
  });

  $(".mobile-navigation .hamburger").click(function(){
    var topBar = $(".mobile-navigation .top-bar");
    if(topBar.hasClass('dn-i')){
      setTimeout(function(){
        topBar.removeClass("dn-i");
      },300);
    }
  });


  //SCROLL UP FADE-IN FUNCTION
  (function scrolldirection() {
    var scrollPos = 0;
    $(window).scroll(function(){
      var st = $(this).scrollTop();
      if(st < scrollPos && st > 500) {
        $('.nav-bar--scroll').addClass('is-active');
      }
      else {
        $('.nav-bar--scroll').removeClass('is-active');
      }
      scrollPos = st;
    });
  })();
  
  //TABS ACTIVATION
  $('#productTab a').on('click', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

  // $('#productTab .nav-link').first().addClass('active');
  // (function navlinkHasChildren() {
  //   var childrenNavs = $('.product-nav-tabs').children('.nav-item').length;
  //   if(childrenNavs == '0' ){
  //     $('.product-nav-tabs').addClass('d-none');
  //   }
  // })();

  // $('#productTabContent .tab-pane').first().addClass('show active');
  
  // //GOOGLE MAP INIT
  // window.initMap = function () {
  //   var lat = $('.lat').text();
  //   var lng = $('.lng').text();
  //   var coordinates = {lat: parseFloat(lat), lng: parseFloat(lng)};
  //   var markerImage = "assets/build/img/marker.png";
  //   // var markerImage = {
  //   //   url: "assets/build/img/marker.svg", // url
  //   //   scaledSize: new google.maps.Size(34, 46), // scaled size
  //   //   origin: new google.maps.Point(0, 0), // origin
  //   //   anchor: new google.maps.Point(0, 46) // anchor
  //   // };
  //   //markerImage = 'assets/build/img/marker.svg',
  //   zoom = 15,

  //   map = new google.maps.Map(document.getElementById('map'), {
  //       center: coordinates,
  //       zoom: zoom,
  //       disableDefaultUI: false,
  //       scrollwheel: false
  //   }),

  //   marker = new google.maps.Marker({
  //       position: coordinates,
  //       map: map,
  //       icon: markerImage
  //   });
  //   google.maps.event.addDomListener(window, 'resize', function() {
  //     map.setCenter(coordinates);
  //   });

  //   $.getJSON("assets/build/json/map-style/map-style_silver.json", function (data) {
  //     map.setOptions({styles: data});
  //   });
  // };


  //CLICK FUNCTION ON HIDDEN LINKS
	// $('.no-link').click(function(){
 //    window.open($(this).data('link'), '_blank');
 //    return false;
 //  });

  //MODAL OPENING
  // $('.m-open').click(function (evt){
  //   evt.preventDefault();
  //   var point = $(this).data('modal');
  //   $('.modal__overlay').css({'opacity':'1', 'visibility':'visible'});
  //   setTimeout(function(){
  //      $('.'+ point).css({'opacity':'1', 'visibility':'visible'});
  //   },300)
  // });
  // //MODAL CLOSING
  // $('.modal__close, .modal__overlay').click(function (){
  //   var point = $(this).data('modal');
  //   $('.modal__wrapper').css({'opacity':'0', 'visibility':'hidden'});
  //   setTimeout(function(){
  //     $('.modal__overlay').css({'opacity':'0', 'visibility':'hidden'});
  //     $('input').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
  //   }, 300);
  // });
  
  //COOKIES
  $(function() {
    if (!$.cookie('hideModal')) {
      var delay_popup = 5000;
      setTimeout("$('.cookieBlock').fadeIn()", delay_popup);
     }
   });
  });
  $('.cookieBlock .accept').click(function(){
      $('.cookieBlock').fadeOut();
      $.cookie('hideModal', true, {
      expires: 30,
      path: '/'
  });

  //TABS ACTIVATION
  $('#Tabs a').on('click', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })


 
});

// PRELOADER FADEOUT
(function () {
    $('.preloader').delay(400).fadeOut(300);
}());  

$(window).on('load', function() {

  //$('.preloader').delay(400).fadeOut(300);
  
  // BVI INIT
  $.bvi({
    'bvi_target': '.bvi-open',
    "bvi_theme":"white",
    "bvi_font":"arial",
    "bvi_font_size":16,
    "bvi_letter_spacing":"normal",
    "bvi_line_height":"normal",
    "bvi_images":true,
    "bvi_reload":true,
    "bvi_fixed":false,
    "bvi_voice":false,
    "bvi_flash_iframe":false,
    "bvi_hide":false
  });

  // if(document.querySelector('#map')){
  //   initMap();
  // };
});

