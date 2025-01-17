// showTime 함수 정의
function showTime() {
  var date = new Date();
  var h = date.getHours(); // 0 - 23
  var m = date.getMinutes(); // 0 - 59
  var s = date.getSeconds(); // 0 - 59
  var session = "AM";

  if (h == 0) {
    h = 12;
  }

  if (h > 12) {
    h = h - 12;
    session = "PM";
  }

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  // "시간", "분", "초" 추가
  var time = h + ":" + m + ":" + s + " " + session;
  document.getElementById("hours").innerText = h;
  document.getElementById("minutes").innerText = m;
  document.getElementById("seconds").innerText = s;
  document.getElementById("session").innerText = session;

  setTimeout(showTime, 1000); // 1초마다 갱신
}

$(document).ready(function () {
  // 페이지 로드 시 showTime 함수 실행
  showTime();

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
  });

  var requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;

  var angle = 0; // 회전 각도
  var textIndex = 0; // 텍스트 변경 인덱스
  var texts = ["Listening", "Reading", "Writing", "Feedback"]; // 표시할 텍스트 배열
  var images = document.querySelectorAll(".slide-image"); // 모든 이미지 요소를 선택

  function step() {
    angle += 0.5; // 회전 속도 (0.5도씩 증가, 이 값은 조정 가능합니다)
    if (angle >= 360) angle = 0; // 360도를 넘어가면 다시 0으로 초기화

    // 원호의 d 속성 업데이트
    $("#arc1").attr("d", describeArc(92, 92, 80, angle));

    // 텍스트 변경
    if (angle % 90 === 0) {
      // 90도마다 텍스트를 바꿔줍니다
      textIndex = (textIndex + 1) % texts.length; // 배열 순서대로 텍스트를 변경
      $(".value").text(texts[textIndex]); // 텍스트 변경

      // 이미지 변경
      updateImages(textIndex); // 이미지도 변경
    }

    requestAnimationFrame(step); // 계속 반복해서 호출하여 부드럽게 애니메이션
  }

  // 애니메이션 시작
  requestAnimationFrame(step);

  function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  }

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
  function describeArc(x, y, radius, angle) {
    var endProgress = angle;
    var start = polarToCartesian(x, y, radius, endProgress);
    var end = polarToCartesian(x, y, radius, 0);
    var largeArcFlag = endProgress <= 180 ? "0" : "1"; // 원호의 크기 설정

    // 원호를 그리기 위한 d 속성 값
    var d = [
      "M",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
    ].join(" ");

    return d;
  }

  $("#arc1").attr("d", describeArc(92, 92, 80, 0)); // 초기 설정

  // 이미지 업데이트 함수
  function updateImages(index) {
    // 모든 이미지를 숨깁니다
    images.forEach(function (image) {
      image.style.display = "none";
    });

    // 해당 인덱스의 이미지를 표시합니다
    images[index].style.display = "block";
  }
  $(document).ready(function () {
    // 윈도우 스크롤 시 이벤트 핸들러
    $(window).on("scroll", function () {
      // 각 요소들이 화면에 보일 때
      $(".con2 h2, .con2 span, .con2 img").each(function () {
        var elementOffset = $(this).offset().top; // 요소의 위치
        var windowHeight = $(window).scrollTop() + $(window).height(); // 현재 스크롤 위치 + 윈도우 높이

        // 요소가 화면에 80% 이상 들어왔을 때
        if (elementOffset < windowHeight * 1) {
          $(this).addClass("show"); // show 클래스 추가하여 애니메이션 실행
        }
      });
    });

    // 페이지 로드 시 바로 애니메이션 체크
    $(window).trigger("scroll");
  });
});
