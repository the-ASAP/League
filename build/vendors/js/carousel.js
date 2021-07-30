const owl = $('.owl-carousel')

owl.owlCarousel({
    items: 3,
    margin: 20,
    loop: true,
    nav: true,
})

$(".nextButton").click(function(){
    owl.trigger("owl.next");
  });
   
$(".prevButton").click(function(){
    owl.trigger("owl.prev");
});