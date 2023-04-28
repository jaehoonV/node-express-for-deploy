let btn = document.getElementById('btn');
let txt = document.getElementById('txt');

function changeColor(color){
   document.body.style.background = color;
   btn.style.background = color;
   txt.style.borderColor = color;

   // mark as active selected color
   document.querySelectorAll('span').forEach(function(item){
      item.classList.remove('active');
   })
   event.target.classList.add('active');
}