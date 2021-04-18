const p1 = {
  btn: document.querySelector("#p1Btn"),
  display: document.querySelector("#p1display"),
  score: 0,
}
const p2 = {
  btn: document.querySelector("#p2Btn"),
  display: document.querySelector("#p2display"),
  score: 0,
}
const resetButton = document.querySelector("#reset")
const playTo = document.querySelector("#playTo");

reset();
changeWinningScore();

function updateScores(player, opponent) {
  if (gameNotOver) {
    player.score += 1;
    if (player.score == winningScore) {
      gameNotOver = false;
      player.display.classList.add("winner");
      opponent.display.classList.add("loser");
    }
    player.display.textContent = player.score;
  }
}

function reset(){
  gameNotOver = true;
  for (let p of [p1, p2]) {
    p.score = 0;
    p.display.textContent = p.score;
    p.display.classList.remove("winner", "loser");
  }
}

function changeWinningScore(){
  winningScore = playTo.value;
}

playTo.addEventListener("change", function () {
  changeWinningScore();
  reset();
})
p1.btn.addEventListener("click", function () {
  updateScores(p1, p2);
})
p2.btn.addEventListener("click", function () {
  updateScores(p2, p1);
})
resetButton.addEventListener("click", reset)
