$(".hero_item-rotate2").eq(0).addClass("active");

function switchItem2() {
  let prevItem = $(".hero_item-rotate2.active");
  prevItem.removeClass("active");
  let nextItem = prevItem.next();
  if (prevItem.next().length == 0) {
    nextItem = $(".hero_item-rotate2").eq(0);
  }
  nextItem.addClass("active");
  // Create animation
  let tl = gsap.timeline();
  tl.fromTo(
    ".hero_list2",
    {
      rotationY: 0
    },
    {
      rotationY: 90,
      ease: "power2.in",
      duration: 0.3
    }
  )
    .set(prevItem, { opacity: 0 })
    .set(nextItem, { opacity: 1 })
    .fromTo(
      ".hero_list2",
      {
        rotationY: -90
      },
      {
        rotationY: 0,
        ease: "power2.out",
        duration: 0.6
      }
    )
      .fromTo(
      nextItem.find(".pop2-1"),
      { scale: 0.4, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        stagger: 0.2,
        duration: 0.4,
        ease: "power2"
      },
      "<"
      )
      .fromTo(
      nextItem.find(".tab-2-line-w"),
      { width: 56, opacity: 0, },
      {
        width: 120,
        opacity: 1,
        stagger: 0.3,
        duration: 1,
        ease: "power2"
      },
      "<0.4"
    )
}

let myInterval2;
function setMyIntervall() {
  myInterval2 = setInterval(function () {
    switchItem2();
  }, 9000);
}
setMyIntervall();

$(".hero_list2").on("click", function () {
  clearInterval(myInterval2);
  switchItem2();
  setMyIntervall();
});
