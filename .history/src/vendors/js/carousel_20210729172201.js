$('.owl-carousel').owlCarousel({
    items: 3,
    margin: 20,
    loop: true,
    nav: true,
})

$(".nextButton").click(function(){
    console.log(123)
    $('.owl-carousel').trigger("next.owl.carousel");
  });
   
$(".prevButton").click(function(){
    $('.owl-carousel').trigger("prev.owl.carousel");
});