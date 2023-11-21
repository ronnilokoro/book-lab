$(".hero_item-rotate3").eq(0).addClass("active");

function switchItem3() {
  let prevItem = $(".hero_item-rotate3.active");
  prevItem.removeClass("active");
  let nextItem = prevItem.next();
  if (prevItem.next().length == 0) {
    nextItem = $(".hero_item-rotate3").eq(0);
  }
  nextItem.addClass("active");
  // Create animation
  let tl = gsap.timeline();
  tl.fromTo(
    ".hero_list3",
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
      ".hero_list3",
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
      nextItem.find(".pop3-1"),
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
      nextItem.find(".tab-3-w"),
      { width: 300, height: 284 },
      {
        width: 390,
        height: 370,
        stagger: 0.2,
        duration: 1,
        ease: "power2"
      },
      "<"
      )
      .fromTo(
      nextItem.find(".tab-3-line-w"),
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

let myInterval3;
function setMyIntervalk() {
  myInterval3 = setInterval(function () {
    switchItem3();
  }, 9000);
}
setMyIntervalk();

$(".hero_list3").on("click", function () {
  clearInterval(myInterval3);
  switchItem3();
  setMyIntervalk();
});
