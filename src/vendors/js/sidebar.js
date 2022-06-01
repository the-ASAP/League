// for price-index pages

$(function () {
  $(".sidebar__nav [href]").each(function () {
    if (this.href == window.location.href) {
      $(this).addClass("active");
    }
  });
});
