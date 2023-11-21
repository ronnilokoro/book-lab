var Webflow = Webflow || [];
Webflow.push(function () {

var tabTimeout;
clearTimeout(tabTimeout);
tabLoop();

function tabLoop() {
tabTimeout = setTimeout(function() {
var $next = $('.tab-menu').children('.w--current:first').next();
if($next.length) {
if ($(".menu-button").hasClass("w--open")) {
tabLoop();
}else{
$next.removeAttr("href").click();
}
} else {
if ($(".menu-button").hasClass("w--open")){
tabLoop();
}else{
$('.auto-tab-link:first').removeAttr("href").click();
}
}
}, 12000); // 12 seconds
}

$('.auto-tab-link').click(function() {
clearTimeout(tabTimeout);
tabLoop();
});
});
