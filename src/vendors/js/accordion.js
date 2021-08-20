function accordion(btn, content) {
   $(btn).on("click", function () {
      $(this).parent().find(content).slideToggle();
   });
}

$().ready(() => {
   accordion(".accordion__main", ".accordion__information");
});
