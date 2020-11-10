$(document).ready(function () {
  $('.tab-nav').click(function () {
    $(this).parent().find('.tab-nav').removeClass('active');
    $(this).addClass('active');
    $(this).parent().parent().find('.tab-body').removeClass('active');
    $(this).parent().parent().find('.tab-body').eq($(this).parent().find('.tab-nav').index($(this))).addClass('active');
    $(window).scrollTop($(window).scrollTop() + 1);
    window.scrollY += 1;
  });

  (function DragRange() {
    function JigetAttributeDrag(drago) {
      aww = drago.parentNode.getBoundingClientRect().left;
      var MouseCoords = { getX: function (e) { return (e.pageX ? (e.pageX - aww) : (e.clientX ? (drago.parentNode.scrollLeft - aww) : aww)); } };
      window.onmousemove = function (e) {
        e.preventDefault && e.preventDefault();
        if (!e) e = window.event;
        dragoleft = ((MouseCoords.getX(e) - drago.parentNode.offsetLeft) < 0 ? '0' : ((MouseCoords.getX(e) - drago.parentNode.offsetLeft) > drago.parentNode.clientWidth ? drago.parentNode.clientWidth : (MouseCoords.getX(e) - drago.parentNode.offsetLeft)));
        drago.style.left = dragoleft + 'px';
        inputsW = drago.parentNode.clientWidth;
        inputminBase = inputmaxBase = drago.parentNode.parentNode.querySelector('.filter-range-inputs .filter-range-input-max').getAttribute('data-predel');
        blueline = drago.parentNode.querySelector('.filter-range-line-active');
        siblin = (drago.classList.contains('filter-range-dot-left') ? drago.nextElementSibling : drago.previousElementSibling);
        if (drago.offsetLeft >= siblin.offsetLeft) {
          drago.parentNode.parentNode.querySelector('.filter-range-inputs .filter-range-input-max').value = Math.ceil(inputmaxBase / inputsW * dragoleft);
          blueline.style.right = (inputsW - dragoleft) + 'px';
          blueline.style.left = siblin.style.left;
        }
        else {
          drago.parentNode.parentNode.querySelector('.filter-range-inputs .filter-range-input-min').value = Math.ceil(inputminBase / inputsW * dragoleft);
          blueline.style.left = dragoleft + 'px';
          blueline.style.right = (inputsW - siblin.offsetLeft) + "px";
        }
      };
      drago.onmouseup = window.onmouseup = function (e) { drago = window.onmouseup = window.onmousemove = null; };
    }
    for (var i = document.getElementsByClassName('filter-range').length - 1; i >= 0; i--) {
      var min = document.getElementsByClassName('filter-range')[i].getElementsByClassName('filter-range-input-min')[0];
      var max = document.getElementsByClassName('filter-range')[i].getElementsByClassName('filter-range-input-max')[0];
      lineL = Math.round((min.value - min.getAttribute('data-predel')) / (max.getAttribute('data-predel') - min.getAttribute('data-predel')) * 100000) / 1000;
      lineR = Math.round((max.getAttribute('data-predel') - max.value) / (max.getAttribute('data-predel') - min.getAttribute('data-predel')) * 100000) / 1000;
      document.getElementsByClassName('filter-range')[i].getElementsByClassName('filter-range-line-active')[0].style.left = document.getElementsByClassName('filter-range')[i].getElementsByClassName('filter-range-dot-left')[0].style.left = lineL + '%';
      document.getElementsByClassName('filter-range')[i].getElementsByClassName('filter-range-line-active')[0].style.right = lineR + '%';
      document.getElementsByClassName('filter-range')[i].getElementsByClassName('filter-range-dot-right')[0].style.left = (100 - lineR) + '%';
    }
    for (var i = document.getElementsByClassName('filter-range-dot').length - 1; i >= 0; i--)document.getElementsByClassName('filter-range-dot')[i].onmousedown = function (e) { e.preventDefault && e.preventDefault(); JigetAttributeDrag(this); };
  })();

  $('.filter-scroll').each(function () {
    if (this.getElementsByClassName('filter-scroll-area')[0].clientHeight < this.getElementsByClassName('filter-scroll-area')[0].scrollHeight) {
      var sct = this.getElementsByClassName('filter-scroll-area')[0].scrollTop;
      var sw = this.getElementsByClassName('filter-scroll-area')[0].scrollHeight;
      var ph = this.getElementsByClassName('filter-scroll-area')[0].clientHeight;
      this.querySelector('.scrollbar').style.height = (ph / (sw / 100)) + '%';
      this.querySelector('.scrollbarbg').style.height = '100%';
      this.querySelector('.scrollbar').style.top = (Math.round(sct / (sw - ph) * (100 - (ph / (sw / 100))) * 1000) / 1000) + '%';
      this.getElementsByClassName('filter-scroll-area')[0].onscroll = function () {
        sct = this.parentNode.getElementsByClassName('filter-scroll-area')[0].scrollTop;
        sw = this.parentNode.getElementsByClassName('filter-scroll-area')[0].scrollHeight;
        ph = this.parentNode.getElementsByClassName('filter-scroll-area')[0].clientHeight;
        this.parentNode.querySelector('.scrollbar').style.height = (ph / (sw / 100)) + '%';
        this.parentNode.querySelector('.scrollbarbg').style.height = '100%';
        this.parentNode.querySelector('.scrollbar').style.top = (Math.round(sct / (sw - ph) * (100 - (ph / (sw / 100))) * 1000) / 1000) + '%';
      }
    }
  });

  $('form[data-ajax=ajax]').on('submit', function (e) {
    e.preventDefault || e.preventDefault();
    $.post('/ajax/', $(this).serialize(), function (response) {
      alertMess(response.mess);
    });
    return false;
  });


  setTimeout(function () {
    $('#preloader').css('opacity', 0);
    setTimeout(function () {
      $('#preloader').remove();
    }, 200);
  }, 200);
  function alertMess(mess) {
    $('body').append('<div style="position: fixed;left: 0;top: 0;right: 0;bottom: 0;z-index: 10;"><div style="position: absolute;left: 0;top: 0;right: 0;bottom: 0;background-color: #000;opacity: 0.5;" onclick="this.parentNode.parentNode.removeChild(this.parentNode);"></div><div id="modler" style="width: 500px;max-width:100%;position: absolute;left: 50%;top: 50%;transform:translate(-50%,-50%);background-color: #fff;border: solid 1px #ccc;box-shadow: 0 0 40px -6px #555;text-align: center;"><div onclick="this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);" style="position: absolute;right: 0;top: 0;z-index: 2;font-size: 4em;width: 1em;height: 1em;line-height: 33px;color: #333;transform: rotate(45deg);cursor: pointer;">+</div><br><br><br><br><p style="text-align: center;left: 0;right: 0;font-size: 24px;font-family: \'Bebas Neue\';">' + mess + '</p><br><br><br><br></div></div>');
  }
  $('.product-dop-image').click(function () {
    $('.product-dop-image').removeClass('active');
    $(this).addClass('active');
    $('#product-main-image').attr('src', $(this).attr('data-image'));
  });
  $('#overlay').click(function () {
    $('#modal-zayavka').hide();
  });
  $('#zayavka-exit').click(function () {
    $('#modal-zayavka').hide();
  });
  $('a[data-modal=modal-zayavka]').click(function () {
    $('#modal-zayavka').show();
  });
  $('#showmenu').click(function (e) {
    e.preventDefault || e.preventDefault();
    $('#headermenu').toggle();
    $('#showmenu').toggleClass('active');
    return false;
  });
  $('#menuoverlay').click(function () {
    $('#headermenu').hide();
    $('#showmenu').removeClass('active');
  });
  $('.single-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    focusOnSelect: true,
    draggable: true,
    infinite: true
  });


  if (typeof (".slider-sale") !== 'undefined' !== null) {
    $('.slider-sale').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 2000,
      dots: true,
    });
  }
  if (typeof (".main-slider") !== 'undefined' !== null) {
    $('.main-slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 2000,
      dots: true,
      prevArrow: false,
      nextArrow: false,
      responsive: [
        {
          breakpoint: 770,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
          }
        },
      ]
    });
    var slider = $('.main-slider');
    var total = slider.slick("getSlick").slideCount;
    var currentSlide = $('.main-slider').slick('slickCurrentSlide');
    var slide = currentSlide + 1;
    if (total > 1) {
      $(".sl-count__current").text('' + '0' + slide);
      $('.sl-count__total').text('' + '0' + total);
    }
    $(".main-slider").on('afterChange', function (event, slick, currentSlide, nextSlide) {
      var currentSl = currentSlide + 1;
      $(".sl-count__current").text('' + '0' + currentSl);
    });
  }

  if (typeof (".sing-up") !== 'undefined' !== null) {
    var modal = document.getElementById('modal');
    var link = document.querySelectorAll('.sing-up');
    var span = document.getElementsByClassName('close')[0];
    console.log(link);
    $('.sing-up').each(function () {
      $(this).click(function () {
        // console.log($(this));
        modal.style.display = "block";
      });
    });

    span.onclick = function () {
      modal.style.display = 'none';
    }

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }
  $('.double-slider').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: true,
    prevArrow: '<button class="slick-btn slick-next prev-arrow" aria-label="Next" type="button" style=""><img src="img/arrow-right.png" alt=""></button>',
    nextArrow: '<button class="slick-btn slick-arrow slick-prev" aria-label="Next" type="button" style=""><img src="img/arrow-left.png" alt=""></button>',
    focusOnSelect: true,
    focusOnSelect: true,
    draggable: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
          dots: true,
          infinite: true
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          arrows: false,
          dots: true,
        }
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          arrows: false,
          dots: true,
        }
      }
      
    ]
  });
  $('.triple-slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,

    arrows: true,
    prevArrow: '<button class="slick-btn-left slick-next prev-arrow" aria-label="Next" type="button" style=""><img src="img/arrow-right.png" alt=""></button>',
    nextArrow: '<button class="slick-btn-left slick-arrow slick-prev" aria-label="Next" type="button" style=""><img src="img/arrow-left.png" alt=""></button>',
    focusOnSelect: true,
    draggable: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          arrows: false,
          dots: true,
        }
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
        }
      }
    ]
  });
  $('.four-slider').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    prevArrow: '<button class="slick-btn slick-next prev-arrow" aria-label="Next" type="button" style=""><img src="img/arrow-left.png" alt=""></button>',
    nextArrow: '<button class="slick-btn slick-arrow slick-prev" aria-label="Next" type="button" style=""><img src="img/arrow-right.png" alt=""></button>',
    focusOnSelect: false,
    draggable: true,
    autoplay: false,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          dots: true,
          arrows: false
        }
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
          arrows: false
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
          arrows: false
        }
      }
    ]
  });
  $('.five-slider').slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: true,
    focusOnSelect: false,
    draggable: true,
    autoplay: true,
    autoplaySpeed: 2000
  });

  $('#sidebar > li.with_child').click(function (e) {
    $(this).find('ul').stop().slideToggle(200);
    $(this).toggleClass('active');
  });

  $('#closesidebar,#sidebaroverlay').click(function () {
    $('body').removeClass('sidemenuactive');
  });
  $('#showsidebar').click(function () {
    $('body').addClass('sidemenuactive');
  });
  /* КОРЗИНА */
  function ADJS_CartAddMess(name, img) {
    $('body').append('<div style="position: fixed;left: 0;top: 0;right: 0;bottom: 0;z-index: 10;"><div style="position: absolute;left: 0;top: 0;right: 0;bottom: 0;background-color: #000;opacity: 0.5;" onclick="this.parentNode.parentNode.removeChild(this.parentNode);"></div><div id="modler" style="width: 480px;max-width:100%;height: 400px;position: absolute;left: 50%;top: 50%;transform:translate(-50%,-50%);background-color: #fff;border: solid 1px #ccc;box-shadow: 0 0 40px -6px #555;text-align: center;"><div onclick="this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);" style="position: absolute;right: 10px;top: 10px;z-index: 2;font-size: 60px;width: 35px;height: 35px;line-height: 33px;color: #333;transform: rotate(45deg);cursor: pointer;font-family: Arial;">+</div><p style="text-align: center;font-size: 22px;font-family: \'Bebas Neue\';display: block;height: 65px;padding: 15px 40px 0;margin:0;">Добавлено: ' + name + '</p><img src="' + img + '" style="margin-top: 20px;max-height: 220px;"><a href="/cart/" style="background-color: #ff7000;color: #fff;padding: 6px 5px 7px;border-radius: 5px;display: inline-block;font-family: \'Bebas Neue\';width: 37%;cursor: pointer;text-align: center;text-decoration: none;left: 10%;font-size: 18px;position: absolute;bottom: 30px;">ПЕРЕЙТИ В КОРЗИНУ</a><span style="background-color: #999;color: #fff;padding: 6px 5px 7px;border-radius: 5px;display: inline-block;font-family: \'Bebas Neue\';width: 37%;cursor: pointer;text-align: center;text-decoration: none;font-size: 18px;position: absolute;bottom: 30px;left: 53%;" onclick="this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);">ВЫБРАТЬ ЕЩЕ</span></div></div>');

  }
  function ADJS_CartUpdate() {
    $.post('/ajax/', { "ajaxtype": "cart", "method": "update" }, function (data) {
      if (data.status != 'ok') {
        alertMess('Ошибка');
        return false;
      }
      $('.JSAD_CartArea').html(data.html);
    });
  }
  function ADJS_CartAdd(id, quantity, mess) {
    $.post('/ajax/', { "ajaxtype": "cart", "method": "add", "id": id, "quantity": quantity }, function (data) {
      if (data.status != 'ok') {
        alertMess('Ошибка');
        return false;
      }
      try {
        $('.JSAD_CartInput[data-id=' + id + ']').val(data.cart['items'][id]['IN_CART']);
        $('.ADJS_CartSum').html(data.cart['sum']);
      }
      catch (e) {
        console.log('Что то не так: ' + e);
      }
      if (mess === true) {
        ADJS_CartAddMess(
          $('.ADJS_ToCartButton[data-id=' + id + ']').attr('data-name'),
          $('.ADJS_ToCartButton[data-id=' + id + ']').attr('data-img')
        );
      }
    });
  }
  function ADJS_CartSet(id, quantity) {
    $.post('/ajax/', { "ajaxtype": "cart", "method": "set", "id": id, "quantity": quantity }, function (data) {
      if (data.status != 'ok') {
        alertMess('Ошибка');
        return false;
      }
      $('.JSAD_CartInput[data-id=' + id + ']').val(data.cart['items'][id]['IN_CART']);
      $('.ADJS_CartSum').html(data.cart['sum']);
    });
  }
  function ADJS_CartRemove(id, quantity) {
    $.post('/ajax/', { "ajaxtype": "cart", "method": "remove", "id": id, "quantity": quantity }, function (data) {
      if (data.status != 'ok') {
        alertMess('Ошибка');
        return false;
      }
      $('.JSAD_CartInput[data-id=' + id + ']').val(data.cart['items'][id]['IN_CART']);
      $('.ADJS_CartSum').html(data.cart['sum']);
    });
  }
  function ADJS_CartDelete(id) {
    $.post('/ajax/', { "ajaxtype": "cart", "method": "delete", "id": id }, function (data) {
      if (data.status != 'ok') {
        alertMess('Ошибка');
        return false;
      }
      ADJS_CartUpdate();
    });
  }
  $(document).on('click', '.JSAD_CartAdd', function (e) {
    var id = $(this).attr('data-id'),
      max = parseInt($(this).attr('data-max')),
      step = parseInt($(this).attr('data-step')),
      val = parseInt($('.JSAD_CartInput[data-id=' + $(this).attr('data-id') + ']').val());
    if (max >= val + step)
      ADJS_CartAdd(id, step);
    else
      ADJS_CartSet(id, (Math.floor(max / step) * step));
  });
  $(document).on('click', '.JSAD_CartRemove', function (e) {
    var id = $(this).attr('data-id'),
      min = parseInt($(this).attr('data-min')),
      step = parseInt($(this).attr('data-step')),
      val = parseInt($('.JSAD_CartInput[data-id=' + $(this).attr('data-id') + ']').val());
    if (min > val - step)
      ADJS_CartSet(id, min);
    else
      ADJS_CartRemove(id, step);
  });
  $(document).on('click', '.JSAD_CartDelete', function (e) {
    ADJS_CartDelete($(this).attr('data-id'));
  });
  $(document).on('change', '.JSAD_CartInput', function (e) {
    $(this).val(Math.ceil($(this).val() / parseInt($(this).attr('data-step'))) * parseInt($(this).attr('data-step')));
    var id = $(this).attr('data-id'),
      min = parseInt($(this).attr('data-min')),
      max = parseInt($(this).attr('data-max')),
      step = parseInt($(this).attr('data-step')),
      val = parseInt($(this).val());
    if (max < val + step)
      ADJS_CartSet(id, (Math.floor(max / step) * step));
    else
      if (min >= val - step)
        ADJS_CartSet(id, min);
      else
        ADJS_CartSet(id, val);
  });
  $(document).on('click', '.ADJS_ToCartPlus', function (e) {
    var id = $(this).attr('data-id');
    var input = $('.ADJS_ToCartInput[data-id=' + id + ']');
    var max = parseInt(input.attr('data-max')),
      step = parseInt(input.attr('data-step')),
      val = parseInt(input.val());
    if (max >= val + step)
      input.val(val + step);
    else
      input.val((Math.floor(max / step) * step));
  });

  $(document).on('click', '.ADJS_ToCartMinus', function (e) {
    var id = $(this).attr('data-id');
    var input = $('.ADJS_ToCartInput[data-id=' + id + ']');
    var min = parseInt(input.attr('data-min')),
      step = parseInt(input.attr('data-step')),
      val = parseInt(input.val());
    if (min < val - step)
      input.val(val - step);
    else
      input.val(min);
  });

  $(document).on('change', '.ADJS_ToCartInput', function (e) {
    var id = $(this).attr('data-id'),
      min = parseInt($(this).attr('data-min')),
      max = parseInt($(this).attr('data-max')),
      step = parseInt($(this).attr('data-step')),
      val = Math.ceil(parseInt($(this).val()) / step) * step;
    if (max < val + step)
      $(this).val((Math.floor(max / step) * step));
    else if (min > val - step)
      $(this).val(min);
    else
      $(this).val(val);
  });

  $(document).on('click', '.ADJS_ToCartButton', function (e) {
    var id = $(this).attr('data-id');
    var val = $('.ADJS_ToCartInput[data-id=' + id + ']').val();
    ADJS_CartAdd(id, val, true);
  });
  /* КОРЗИНА */

  $('select[name=change_offer]').each(function () {
    var price, mincart, step, instock, offer, product, option;
    offer = $(this).val();
    option = $(this).find('[value=' + offer + ']');
    price = option.attr('data-price');
    mincart = option.attr('data-mincart');
    step = option.attr('data-step');
    instock = option.attr('data-instock');
    product = option.attr('data-product');
    $('[data-adtype=PRODUCT_' + product + '_PRICE]').html(price);
    $('[data-adtype=PRODUCT_' + product + '_ADDBTN]').attr('data-id', offer);
    $('[data-adtype=PRODUCT_' + product + '_INPUT]').attr('data-id', offer);
    $('[data-adtype=PRODUCT_' + product + '_INPUT]').attr('data-max', instock);
    $('[data-adtype=PRODUCT_' + product + '_INPUT]').attr('data-min', mincart);
    $('[data-adtype=PRODUCT_' + product + '_INPUT]').attr('data-step', step);
    $('[data-adtype=PRODUCT_' + product + '_INPUT]').val(mincart);
  });
  $('select[name=change_offer]').change(function () {
    var price, mincart, step, instock, offer, product, option;
    offer = $(this).val();
    option = $(this).find('[value=' + offer + ']');
    price = option.attr('data-price');
    mincart = option.attr('data-mincart');
    step = option.attr('data-step');
    instock = option.attr('data-instock');
    product = option.attr('data-product');
    $('[data-adtype=PRODUCT_' + product + '_PRICE]').html(price);
    $('[data-adtype=PRODUCT_' + product + '_ADDBTN]').attr('data-id', offer);
    $('[data-adtype=PRODUCT_' + product + '_INPUT]').attr('data-id', offer);
    $('[data-adtype=PRODUCT_' + product + '_INPUT]').attr('data-max', instock);
    $('[data-adtype=PRODUCT_' + product + '_INPUT]').attr('data-min', mincart);
    $('[data-adtype=PRODUCT_' + product + '_INPUT]').attr('data-step', step);
    $('[data-adtype=PRODUCT_' + product + '_INPUT]').val(mincart);
  });
  var menuToggle = document.querySelector('#menu-togle');
  var mobileNavContainer = document.querySelector('#mobile-nav');
  if (typeof menuToggle !== 'undefined' && menuToggle !== null) {

    menuToggle.onclick = function () {
      menuToggle.classList.toggle('menu-icon-active');
      mobileNavContainer.classList.toggle('mobile-nav--active');
    }
  }
});