$('.main-slider').each(function () {

  const $mainSlider = $(this);
  const $slider = $mainSlider.find('.slider');

  $slider.slick({
    dots: $mainSlider.data('dots'),
    arrows: $mainSlider.data('arrows'),
    infinite: $mainSlider.data('infinite'),
    autoplay: $mainSlider.data('autoplay'),

    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

});