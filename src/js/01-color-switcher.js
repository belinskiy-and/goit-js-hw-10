const bodyElement = document.querySelector("body");
const startButton = document.querySelector("button[data-start]");
const stopButton = document.querySelector("button[data-stop]");

let timerId = null;

//----------------------------------------------

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const clickStart = event => {
    event.currentTarget.setAttribute("disabled", "disabled");

    timerId = setInterval(() => {
        bodyElement.style.backgroundColor = getRandomHexColor();   
    }, 1000);
};

const clickStop = event => {
    startButton.removeAttribute("disabled");

    clearInterval(timerId);
};


//----------------------------------------------

startButton.addEventListener("click", clickStart);
stopButton.addEventListener("click", clickStop);