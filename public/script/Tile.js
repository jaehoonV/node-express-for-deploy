export default class Tile {
    #tileElement
    #x
    #y
    #value
 
    constructor(tileContainer, value = Math.random() > 0.5 ? 2 : 4) {
       this.#tileElement = document.createElement("div")
       this.#tileElement.classList.add("tile")
       tileContainer.append(this.#tileElement)
       this.value = value
    } /* 타일 요소 추가 */
 
    get value() {
       return this.#value
    }
 
    set value(v) {
       this.#value = v
       this.#tileElement.textContent = v
       const power = Math.log2(v)
       const backgroundLightness = 100 - power * 9
       this.#tileElement.style.setProperty(
          "--background-lightness",
          `${backgroundLightness}%`
       ) /* 배경 밝기를 9% 비율로 줄임 */
       this.#tileElement.style.setProperty(
          "--text-lightness",
          `${backgroundLightness <= 50 ? 90 : 10}%`
       )
    }
 
    set x(value) { /* x 위치 설정 */
       this.#x = value
       this.#tileElement.style.setProperty("--x", value)
    }
 
    set y(value) { /* y 위치 설정 */
       this.#y = value
       this.#tileElement.style.setProperty("--y", value)
    }
 
    remove() {
       this.#tileElement.remove()
    }
 
    /* 새 애니메이션이 있을 때마다 promise에 추가*/
    waitForTransition(animation = false) {
       return new Promise(resolve => {
          this.#tileElement.addEventListener(
             animation ? "animationend" : "transitionend",
             resolve,
             {
                once: true,
             }
          )
       })
    }
 }