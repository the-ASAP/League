$('.owl-carousel').owlCarousel({
    items: 3,
    margin: 20,
    loop: true,
    nav: true,
    navText: [
        '<span class="arrow-owl arrow-left"></span>',
        '<span class="arrow-owl arrow-right"></span>'
    ],
})

$(".next_button").click(function(){
    owl.trigger("next.owl.carousel");
  });
   
  $(".prev_button").click(function(){
    owl.trigger("prev.owl.carousel");
  });