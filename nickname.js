document.addEventListener("DOMContentLoaded", function () {
    const playerNameInput1 = document.getElementById("playerName1");
    const nicknameInput1 = document.getElementById("nickname1");
    const playerNameInput2 = document.getElementById("playerName2");
    const nicknameInput2 = document.getElementById("nickname2");
    const startButton = document.getElementById("startit");
    const nicknameForm = document.getElementById("nicknameForm");

    // Function to enable/disable the start button based on input validity
    function updateStartButton() {
        startButton.disabled = !nicknameForm.checkValidity();
    }

    // Add event listeners for input changes
    playerNameInput1.addEventListener("input", updateStartButton);
    nicknameInput1.addEventListener("input", updateStartButton);
    playerNameInput2.addEventListener("input", updateStartButton);
    nicknameInput2.addEventListener("input", updateStartButton);

    // Add submit event listener to prevent the form submission if inputs are not valid
    nicknameForm.addEventListener("submit", function (event) {
        if (!nicknameForm.checkValidity()) {
            event.preventDefault();
        }
    });
});


const goback = document.getElementById("goback");

goback.addEventListener("click",function(){
    window.location.href="./index.html"
})
const form = document.getElementById("nicknameForm");

form.onsubmit=()=>{
    window.location.href = "./game.html"
    return false;
}