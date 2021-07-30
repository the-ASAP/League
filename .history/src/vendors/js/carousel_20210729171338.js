$('.owl-carousel').owlCarousel({
    items: 3,
    margin: 20,
    loop: true,
    nav: true,
})

$(".nextButton").click(function(){
    owl.trigger("next.owl.carousel");
  });
   
$(".prevButton").click(function(){
owl.trigger("prev.owl.carousel");
});