$('.owl-carousel').owlCarousel({
    items: 1,
    margin: 10,
    loop: true,
    nav: true,
    responsive:{
        0:{
          items:1
        },
        768:{
          items:2
        },
        1180:{
          items:3
        }
    }
})