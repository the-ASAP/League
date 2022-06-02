// for price-index pages

// $(function () {
//   $(".sidebar__nav [href]").each(function () {
//     if (this.href == window.location.href) {
//       $(this).addClass("active");
//     }
//   });
// });

$(".sidebar__nav [href]").each(function () {
  if (window.location.pathname.indexOf($(this).attr("href")) > -1) {
    $(this).addClass("active");
  }
});
