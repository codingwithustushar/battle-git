document.addEventListener("DOMContentLoaded", function () {
    const playerNameInput = document.getElementById("playerName");
    const nicknameInput = document.getElementById("nickname");
    const startButton = document.getElementById("startit");
    const nicknameForm = document.getElementById("nicknameForm");

    // Function to enable/disable the start button based on input validity
    function updateStartButton() {
        startButton.disabled = !nicknameForm.checkValidity();
    }

    // Add event listeners for input changes
    playerNameInput.addEventListener("input", updateStartButton);
    nicknameInput.addEventListener("input", updateStartButton);

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