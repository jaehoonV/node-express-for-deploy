const page1 = document.getElementById('page-1');
const page2 = document.getElementById('page-2');
const page3 = document.getElementById('page-3');
const page4 = document.getElementById('page-4');

let interval;

function transitionToPage1() {
   activeFunc(1)
   page1.style.transform = 'translateX(0)';
   page2.style.transform = 'translateX(100%)';
   page3.style.transform = 'translateX(200%)';
   page4.style.transform = 'translateX(300%)';
   clearInterval(interval);
   start();
}

function transitionToPage2() {
   activeFunc(2)
   page1.style.transform = 'translateX(-100%)';
   page2.style.transform = 'translateX(0)';
   page3.style.transform = 'translateX(100%)';
   page4.style.transform = 'translateX(200%)';
   clearInterval(interval);
   start();
}

function transitionToPage3() {
   activeFunc(3)
   page1.style.transform = 'translateX(-200%)';
   page2.style.transform = 'translateX(-100%)';
   page3.style.transform = 'translateX(0)';
   page4.style.transform = 'translateX(100%)';
   clearInterval(interval);
   start();
}

function transitionToPage4() {
   activeFunc(4)
   page1.style.transform = 'translateX(-300%)';
   page2.style.transform = 'translateX(-200%)';
   page3.style.transform = 'translateX(-100%)';
   page4.style.transform = 'translateX(0)';
   clearInterval(interval);
   start();
}

function activeFunc(num){
   document.querySelectorAll(".slide_btn").forEach(function(item) {
      item.classList.remove("active");
   });
   let slide = document.querySelector(".slide" + num);
   slide.classList.add('active');
}

function pageFunc(div){
   switch(div){
      case 1 : transitionToPage1(); break;
      case 2 : transitionToPage2(); break;
      case 3 : transitionToPage3(); break;
      case 4 : transitionToPage4(); break;
      default: break;
   }
}

function getTranslateX(page) {
   let style = window.getComputedStyle(page);
   let matrix = new WebKitCSSMatrix(style.transform);
   return matrix.m41;
}

document.addEventListener('keydown', function (event) {
   if (event.code === 'ArrowLeft') {
      if (getTranslateX(page1) == 0) {
         transitionToPage4();
      } else if (getTranslateX(page2) == 0) {
         transitionToPage1();
      } else if (getTranslateX(page3) == 0) {
         transitionToPage2();
      } else if (getTranslateX(page4) == 0) {
         transitionToPage3();
      }
   } else if (event.code === 'ArrowRight') {
      if (getTranslateX(page1) == 0) {
         transitionToPage2();
      } else if (getTranslateX(page2) == 0) {
         transitionToPage3();
      } else if (getTranslateX(page3) == 0) {
         transitionToPage4();
      } else if (getTranslateX(page4) == 0) {
         transitionToPage1();
      }
   }
});

function start() {
   clearInterval(interval);
   interval = setInterval(function () {
      if (getTranslateX(page1) == 0) {
         transitionToPage2();
      } else if (getTranslateX(page2) == 0) {
         transitionToPage3();
      } else if (getTranslateX(page3) == 0) {
         transitionToPage4();
      } else if (getTranslateX(page4) == 0) {
         transitionToPage1();
      }
   }, 2500);
}

start()