const button =document.getElementById("playbtn");

button.addEventListener("click",function(){
    window.location.href="./nickname.html"
})
const instr = document.getElementById("instbtn");

instr.addEventListener("click",function(){
    window.location.href="./instr.html"
})
const prof = document.getElementById("profbtn")

prof.addEventListener("click",function(){
    window.location.href = "https://www.linkedin.com/in/tushar-shekhar-920272283/"
})

// function playBg(){
//     document.getElementById("bgaudio").play()
// }
// window.onload=playBg

function playBg() {
    document.getElementById("bgaudio").play();
}

window.onload = playBg;

