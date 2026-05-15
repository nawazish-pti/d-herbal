  $('.slider').slick({
  dots: {{section_setting.dots}},
  arrows:{{section_setting.buttons}},
  infinite: {{section_setting.infinite}},
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