$('.owl-carousel').owlCarousel({
    items: 3,
    margin: 20,
    loop: true,
    nav: true,
})

$(".nextButton").click(function(){
    $('.owl-carousel').trigger("prev");
  });
   
$(".prevButton").click(function(){
    $('.owl-carousel').trigger("owl.next");
});