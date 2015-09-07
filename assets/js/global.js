var js = js || {},
  body = $('body'),
  doc = $(document);

js.main = {
  init: function () {
    this.linksExternal();
  },
  linksExternal: function () {
    $("a[href^='http://']").attr("target", "_blank");
  },
};

$(document).ready(function () {
  js.main.init();
});