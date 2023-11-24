const back = document.getElementById("back");

back.addEventListener("click",function(){
    window.location.href="./index.html"
})

const starts = document.getElementById("starts");

starts.addEventListener("click",function(){
    window.location.href="./nickname.html"
})
function playBg() {
    document.getElementById("bgaudio").play();
}

window.onload = playBg;