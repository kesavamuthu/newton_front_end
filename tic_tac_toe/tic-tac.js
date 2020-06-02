let availableValues = [[], [], []];
let playable = true;
let finalMsg = document.getElementById("final-message");
let popup = document.getElementById("popup-container");
// const playButton = document.getElementById("play-button");
function pageSetter() {
  let flag = true;
  let mainDiv = document.getElementById("ticTacToe");
  mainDiv.innerHTML = `
  <div class="popup-container" id="popup-container">
  <div class="popup">
      <h2 id="final-message"></h2>
      <h3 id="final-message-reveal-word"></h3>
      <button id="play-button">Play Again</button>
  </div>
  </div>
  `;
  let div;
  let count = 0;
  for (let i = 0; i < 3; ++i) {
    div = document.createElement("div");
    div.classList.add("column");
    for (let j = 0; j < 3; ++j) {
      let span = document.createElement("span");
      span.classList.add("square");
      //   span.innerText = i + " " + j;
      span.addEventListener("click", (event) => {
        if (availableValues[i][j] || !playable) return;
        availableValues[i][j] = flag ? 1 : 2;
        event.target.innerText = flag ? "X" : "O";
        playable = checkWinner() ? false : true;
        if (!playable) {
          console.log(flag ? "X" : "O");
          finalMsg.innerText = flag ? "X won" : "O won";
          popup.style.display = "flex";
          return;
        }
        if (++count == 9) {
          playable = false;
          finalMsg.innerText = `It's Tie`;
          popup.style.display = "flex";
        }
        flag = !flag;
      });
      div.appendChild(span);
    }
    mainDiv.appendChild(div);
  }
}

function checkWinner() {
  let status;
  //   vertical
  for (let i = 0; i < 3; ++i)
    if (
      equals3(
        availableValues[i][0],
        availableValues[i][1],
        availableValues[i][2]
      )
    )
      status = true;

  //   horizontal
  for (let i = 0; i < 3; ++i)
    if (
      equals3(
        availableValues[0][i],
        availableValues[1][i],
        availableValues[2][i]
      )
    )
      status = true;

  if (
    equals3(availableValues[0][0], availableValues[1][1], availableValues[2][2])
  )
    status = true;
  if (
    equals3(availableValues[0][2], availableValues[1][1], availableValues[2][0])
  )
    status = true;
  return status;
}

function equals3(a, b, c) {
  return a && a == b && b == c;
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("hai");
  finalMsg = document.getElementById("final-message");
  popup = document.getElementById("popup-container");
  document.getElementsByTagName("button")[0].addEventListener("click", () => {
    let mainDiv = document.getElementById("ticTacToe");

    mainDiv.innerHTML = "";
    availableValues = [[], [], []];
    playable = true;
    flag = true;
    pageSetter();
  });
});
window.onload = pageSetter();
