function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "navbar") {
      x.className += " responsive";
    } else {
      x.className = "navbar";
    }
  };
//   $('.js--nav-icon').click(function() {
//     var nav = $('.js--main-nav');
//     var icon = $('.js--nav-icon i');
    
//     nav.slideToggle(200);
    
//     if (icon.hasClass('ion-navicon-round')) {
//         icon.addClass('ion-close-round');
//         icon.removeClass('ion-navicon-round');
//     } else {
//         icon.addClass('ion-navicon-round');
//         icon.removeClass('ion-close-round');
//     }        
// })
window.onscroll = function() {yFunction()};

// Get the navbar
var navbar = document.getElementById("myTopnav");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function yFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}
function mmyFunction(imgs) {
  var expandImg = document.getElementById("expandedImg");
  var imgText = document.getElementById("imgtext");
  expandImg.src = imgs.src;
  imgText.innerHTML = imgs.alt;
  expandImg.parentElement.style.display = "block";
}