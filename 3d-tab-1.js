$(".hero_item-rotate").eq(0).addClass("active");

function switchItem() {
  let prevItem = $(".hero_item-rotate.active");
  prevItem.removeClass("active");
  let nextItem = prevItem.next();
  if (prevItem.next().length == 0) {
    nextItem = $(".hero_item-rotate").eq(0);
  }
  nextItem.addClass("active");
  // Create animation
  let tl = gsap.timeline();
  tl.fromTo(
    ".hero_list",
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
      ".hero_list",
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
      nextItem.find(".pop-1b-tabs"),
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
      nextItem.find(".tab-1b-line-w"),
      { height: 10, opacity: 0, },
      {
        height: 120,
        opacity: 1,
        stagger: 0.3,
        duration: 0.6,
        ease: "power2"
      },
      "<0.6"
    )
}


let myInterval;
function setMyInterval() {
  myInterval = setInterval(function () {
    switchItem();
  }, 9000);
}
setMyInterval();

$(".hero_list").on("click", function () {
  clearInterval(myInterval);
  switchItem();
  setMyInterval();
});
