let isScrolling = false;

// 1. 스크롤 이벤트 감지
window.addEventListener("wheel", function (e) {
  if (isScrolling) return; // 중복 스크롤 방지
  isScrolling = true;

  if (e.deltaY > 0) {
    // 아래로 스크롤 시
    let nextSection = getNextSection();
    scrollToSection(nextSection);
  } else {
    // 위로 스크롤 시
    let prevSection = getPrevSection();
    scrollToSection(prevSection);
  }

  // 스크롤이 끝난 후 1초 뒤에 다시 스크롤 가능
  setTimeout(() => {
    isScrolling = false;
  }, 500);
});

// 현재 섹션의 인덱스를 반환
function getCurrentSectionIndex() {
  const sections = document.querySelectorAll("section, #visual, #footer");
  let scrollPosition = window.scrollY;
  let currentSectionIndex = 0;

  for (let i = 0; i < sections.length; i++) {
    if (sections[i].offsetTop <= scrollPosition) {
      currentSectionIndex = i;
    }
  }
  return currentSectionIndex;
}

// 다음 섹션으로 이동
function getNextSection() {
  const sections = document.querySelectorAll("section, #visual, #footer");
  let currentSectionIndex = getCurrentSectionIndex();
  return sections[currentSectionIndex + 1] || sections[sections.length - 1];
}

// 이전 섹션으로 이동
function getPrevSection() {
  const sections = document.querySelectorAll("section, #visual, #footer");
  let currentSectionIndex = getCurrentSectionIndex();
  return sections[currentSectionIndex - 1] || sections[0];
}

// 부드럽게 스크롤
function scrollToSection(section) {
  window.scrollTo({
    top: section.offsetTop,
    behavior: "smooth",
  });
}

// 요소가 화면에 보이는지 확인하는 함수
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

$(document).ready(function () {
  // Show or hide the sticky footer button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $(".go-top").fadeIn(200);
    } else {
      $(".go-top").fadeOut(200);
    }
  });

  // Animate the scroll to top
  $(".go-top").click(function (event) {
    event.preventDefault();

    $("html, body").animate({ scrollTop: 0 }, 300);
  });
});

$(document).ready(function () {
  $(".menu").click(function () {
    $(".side-menu").toggleClass("open"); // 사이드 메뉴 열기/닫기
    $(".overlay").toggleClass("open"); // 오버레이 열기/닫기
  });

  $(".overlay").click(function () {
    $(".side-menu").removeClass("open"); // 메뉴 닫기
    $(".overlay").removeClass("open"); // 오버레이 닫기
  });
});

$(document).ready(function () {
  $(".menu").click(function () {
    $(this).toggleClass("open");
  });
  var Menu = {
    el: {
      ham: $(".menu"),
      menuTop: $(".menu-top"),
      menuMiddle: $(".menu-middle"),
      menuBottom: $(".menu-bottom"),
    },

    init: function () {
      Menu.bindUIactions();
    },

    bindUIactions: function () {
      Menu.el.ham.on("click", function (event) {
        Menu.activateMenu(event);
        event.preventDefault();
      });
    },

    activateMenu: function () {
      Menu.el.menuTop.toggleClass("menu-top-click");
      Menu.el.menuMiddle.toggleClass("menu-middle-click");
      Menu.el.menuBottom.toggleClass("menu-bottom-click");
    },
  };
  var Menu = {
    el: {
      ham: $(".menu"),
      menuTop: $(".menu-top"),
      menuMiddle: $(".menu-middle"),
      menuBottom: $(".menu-bottom"),
    },

    init: function () {
      Menu.bindUIactions();
    },

    bindUIactions: function () {
      Menu.el.ham.on("click", function (event) {
        Menu.activateMenu(event);
        event.preventDefault();
      });
    },

    activateMenu: function () {
      Menu.el.menuTop.toggleClass("menu-top-click");
      Menu.el.menuMiddle.toggleClass("menu-middle-click");
      Menu.el.menuBottom.toggleClass("menu-bottom-click");
    },
  };

  Menu.init();
});
