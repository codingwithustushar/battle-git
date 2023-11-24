const button =document.getElementById("playbtn");

button.addEventListener("click",function(){
    window.location.href="./nickname.html"
})
const instr = document.getElementById("instbtn");

instr.addEventListener("click",function(){
    window.location.href="./instr.html"
})

// function playBg(){
//     document.getElementById("bgaudio").play()
// }
// window.onload=playBg

function playBg() {
    document.getElementById("bgaudio").play();
}

window.onload = playBg;

