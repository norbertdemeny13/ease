/* eslint-disable */
console.log('faszom common');
(function ($) {
  console.log('faszom common insdie');
  "use strict";

  // Lazy load
  var lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
  });

  // Header background
  $('.background-image').each(function(){
    $(this).css('background-image', $(this).attr('data-background'));
  });

  // Sticky nav
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 1) {
      $('.element_to_stick').addClass("sticky");
    } else {
      $('.element_to_stick').removeClass("sticky");
    }
  });
  $(window).scroll();

  // Menu
  $(document).on("click", "a.open_close", function (evt) {
    evt.preventDefault();
    $('.main-menu').toggleClass('show');
    $('.layer').toggleClass('layer-is-visible');
  });

  $(document).on("click", "a.show-submenu", function (evt) {
    evt.preventDefault();
    $(this).next().toggleClass("show_normal");
  });

  // Scroll to top
  var pxShow = 800; // height on which the button will show
  var scrollSpeed = 500; // how slow / fast you want the button to scroll to top.
  $(window).scroll(function(){
   if($(window).scrollTop() >= pxShow){
    $("#toTop").addClass('visible');
   } else {
    $("#toTop").removeClass('visible');
   }
  });
  $('#toTop').on('click', function(){
   $('html, body').animate({scrollTop:0}, scrollSpeed);
   return false;
  });

  // Cart Dropdown Hidden From tablet
  $(window).bind('load resize', function () {
    var width = $(window).width();
    if (width <= 768) {
      $('a.cart_bt').removeAttr("data-toggle", "dropdown")
    } else {
      $('a.cart_bt').attr("data-toggle", "dropdown")
    }
  });

  // Footer collapse
  var $headingFooter = $('footer h3');
  $(window).resize(function() {
      if($(window).width() <= 768) {
        $headingFooter.attr("data-toggle","collapse");
      } else {
        $headingFooter.removeAttr("data-toggle","collapse");
      }
    }).resize();
  $headingFooter.on("click", function () {
    $(this).toggleClass('opened');
  });

  // Scroll to position
    $('a[href^="#"].btn_scroll').on('click', function (e) {
      e.preventDefault();
      var target = this.hash;
      var $target = $(target);
      $('html, body').stop().animate({
        'scrollTop': $target.offset().top
      }, 800, 'swing', function () {
        window.location.hash = target;
      });
    });

  // Like Icon
    $('.btn_hero.wishlist').on('click', function(e){
      e.preventDefault();
    $(this).toggleClass('liked');
  });

  $(document).on('click', '#sign-in', function(evt) {
    evt.preventDefault();
    // Modal Sign In
    $('#sign-in').magnificPopup({
      type: 'inline',
      fixedContentPos: true,
      fixedBgPos: true,
      overflowY: 'auto',
      closeBtnInside: true,
      preloader: false,
      midClick: true,
      removalDelay: 300,
      closeMarkup: '<button title="%title%" type="button" class="mfp-close"></button>',
      mainClass: 'my-mfp-zoom-in'
    });
  });

  // Video modal
  $('.btn_play').magnificPopup({
    type: 'iframe',
    closeMarkup: '<button title="%title%" type="button" class="mfp-close" style="font-size:26px; margin-right:-10px;">&#215;</button>'
  });

  // Modal
  $('.modal_dialog').magnificPopup({
    type: 'inline',
    fixedContentPos: true,
    fixedBgPos: true,
    overflowY: 'auto',
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    closeMarkup: '<button title="%title%" type="button" class="mfp-close"></button>',
    mainClass: 'my-mfp-zoom-in'
  });

  // Modal images
  $('.magnific-gallery').each(function() {
      $(this).magnificPopup({
          delegate: 'a',
          type: 'image',
          preloader: true,
          gallery: {
              enabled: true
          },
          removalDelay: 500, //delay removal by X to allow out-animation
          callbacks: {
              beforeOpen: function() {
                  // just a hack that adds mfp-anim class to markup
                  this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                  this.st.mainClass = this.st.el.attr('data-effect');
              }
          },
          closeOnContentClick: true,
          midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
      });
  });

  // Show hide password login modal and register page
  $('#password, #password1, #password2').hidePassword('focus', {
    toggle: {
      className: 'my-toggle'
    }
  });

  // Forgot Password
  $(document).on('click', "#forgot", function () {
    $("#forgot_pw").fadeToggle("fast");
  });

  // Jquery select
  $('.custom_select select').niceSelect();

  function toggleChevron(e) {
    $(e.target)
      .prev('.card-header')
      .find("i.indicator")
      .toggleClass('icon_minus-06 icon_plus');
  }

  $('.accordion').on('hidden.bs.collapse shown.bs.collapse', toggleChevron);

  function toggleIcon(e) {
    $(e.target)
      .prev('.panel-heading')
      .find(".indicator")
      .toggleClass('icon_minus-06 icon_plus');
  }

  window.initEase = function() {
    // Sign in
    $('#sign-in').magnificPopup({
      type: 'inline',
      fixedContentPos: true,
      fixedBgPos: true,
      overflowY: 'auto',
      closeBtnInside: true,
      preloader: false,
      midClick: true,
      removalDelay: 300,
      closeMarkup: '<button title="%title%" type="button" class="mfp-close"></button>',
      mainClass: 'my-mfp-zoom-in'
    });
    // Lazy load
    var lazyLoadInstance = new LazyLoad({
      elements_selector: ".lazy"
    });

    // Carousel home page
    $('.owl-carousel').owlCarousel({
      items: 1,
      loop: false,
      stagePadding: 50,
      margin: 20,
      dots: false,
      lazyLoad: true,
      navText: ["<i class='arrow_left'></i>","<i class='arrow_right'></i>"],
      nav: false,
      responsive: {
        0: {
          items: 1
        },
        560: {
          items: 1
        },
        768: {
          items: 2
        },
        1230: {
          items: 4,
          nav: true
        }
      },
    });

    // Footer collapse
    $(window).resize(function() {
      if($(window).width() <= 768) {
        $('footer h3').attr("data-toggle","collapse");
      } else {
        $('footer h3').removeAttr("data-toggle","collapse");
      }
    }).resize();

    $('footer h3').on("click", function () {
      $(this).toggleClass('opened');
    });

    // Opacity mask
    $('.opacity-mask').each(function(){
      $(this).css('background-color', $(this).attr('data-opacity-mask'));
    });
  };

})(window.jQuery);
