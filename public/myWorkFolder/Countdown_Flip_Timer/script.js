const countToDate = new Date().setHours(new Date().getHours() + 24)
let previousTimeBetweenDates
setInterval(() => {
   const currentDate = new Date()
   const timeBetweenDates = Math.ceil((countToDate - currentDate) / 1000)
   flipAllCards(timeBetweenDates)

   previousTimeBetweenDates = timeBetweenDates
}, 250)

function flipAllCards(time) {
   const seconds = time % 60
   const minutes = Math.floor(time / 60) % 60
   const hours = Math.floor(time / 3600)

   flip(document.querySelector("[data-hours-tens]"), Math.floor(hours / 10))
   flip(document.querySelector("[data-hours-ones]"), hours % 10)
   flip(document.querySelector("[data-minutes-tens]"), Math.floor(minutes / 10))
   flip(document.querySelector("[data-minutes-ones]"), minutes % 10)
   flip(document.querySelector("[data-seconds-tens]"), Math.floor(seconds / 10))
   flip(document.querySelector("[data-seconds-ones]"), seconds % 10)
}

function flip(flipCard, newNumber) {
   const topHalf = flipCard.querySelector(".top")
   const startNumber = parseInt(topHalf.textContent)
   if (newNumber === startNumber) return

   const bottomHalf = flipCard.querySelector(".bottom")
   const topFlip = document.createElement("div")
   topFlip.classList.add("top-flip")
   const bottomFlip = document.createElement("div")
   bottomFlip.classList.add("bottom-flip")

   top.textContent = startNumber
   bottomHalf.textContent = startNumber
   topFlip.textContent = startNumber
   bottomFlip.textContent = newNumber

   topFlip.addEventListener("animationstart", e => {
      topHalf.textContent = newNumber
   })
   topFlip.addEventListener("animationend", e => {
      topFlip.remove()
   })
   bottomFlip.addEventListener("animationend", e => {
      bottomHalf.textContent = newNumber
      bottomFlip.remove()
   })
   flipCard.append(topFlip, bottomFlip)
}

flipAllCards1()
function flipAllCards1() {
   let currentDate = new Date();

   // document.querySelector("[data-hours-tens1]").textContent = Math.floor(currentDate.getHours() / 10)
   // document.querySelector("[data-hours-ones1]").textContent = currentDate.getHours() % 10
   // document.querySelector("[data-minutes-tens1]").textContent = Math.floor(currentDate.getMinutes() / 10)
   // document.querySelector("[data-minutes-ones1]").textContent = currentDate.getMinutes() % 10
   // document.querySelector("[data-seconds-tens1]").textContent = Math.floor(currentDate.getSeconds() / 10)
   // document.querySelector("[data-seconds-ones1]").textContent = currentDate.getSeconds() % 10

   flip1(document.querySelector("[data-hours-tens1]"), Math.floor(currentDate.getHours() / 10))
   flip1(document.querySelector("[data-hours-ones1]"), currentDate.getHours() % 10)
   flip1(document.querySelector("[data-minutes-tens1]"), Math.floor(currentDate.getMinutes() / 10))
   flip1(document.querySelector("[data-minutes-ones1]"), currentDate.getMinutes() % 10)
   flip1(document.querySelector("[data-seconds-tens1]"), Math.floor(currentDate.getSeconds() / 10))
   flip1(document.querySelector("[data-seconds-ones1]"), currentDate.getSeconds() % 10)

   setTimeout(flipAllCards1, 1000);
}

function flip1(flipCard, newNumber) {
   const topHalf = flipCard.querySelector(".top")
   const startNumber = parseInt(topHalf.textContent)
   if (newNumber === startNumber) return

   const bottomHalf = flipCard.querySelector(".bottom")
   const topFlip = document.createElement("div")
   topFlip.classList.add("top-flip")
   const bottomFlip = document.createElement("div")
   bottomFlip.classList.add("bottom-flip")

   top.textContent = startNumber
   bottomHalf.textContent = startNumber
   topFlip.textContent = startNumber
   bottomFlip.textContent = newNumber

   topFlip.addEventListener("animationstart", e => {
      topHalf.textContent = newNumber
   })
   topFlip.addEventListener("animationend", e => {
      topFlip.remove()
   })
   bottomFlip.addEventListener("animationend", e => {
      bottomHalf.textContent = newNumber
      bottomFlip.remove()
   })
   flipCard.append(topFlip, bottomFlip)
}

function showClock() {
   let currentDate = new Date();
   let divClock = document.getElementById('divClock');
   let msg = "";
   msg += currentDate.getHours() + "시 ";
   msg += currentDate.getMinutes() + "분 ";
   msg += currentDate.getSeconds() + "초";

   divClock.innerText = msg;

   setTimeout(showClock, 1000);  //1초마다 갱신
}