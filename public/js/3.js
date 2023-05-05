const blurButton = document.getElementById("blur-button");
const imagePlace = document.getElementById("image-place");
const scorePlace = document.getElementById("score-place");
let chances = 7;
let clarity = 9;
let data = {
  imageclarity: clarity,
};
window.onload = () => {
  init();
};
blurButton.addEventListener("click", increaseclarity);
function init() {
  URL.revokeObjectURL(imagePlace.src);
  fetch("/makeblur?id=3", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.blob();
    })
    .then((data) => {
      imagePlace.setAttribute("src", URL.createObjectURL(data));
    });
  const score = localStorage.getItem("score");
  scorePlace.innerHTML = score;
}
function increaseclarity(e) {
  URL.revokeObjectURL(imagePlace.src);
  imagePlace.setAttribute("src", "images/before.jpg");
  console.log(data.imageclarity);
  fetch("/makeblur?id=3", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.blob();
    })
    .then((data) => {
      imagePlace.setAttribute("src", URL.createObjectURL(data));
    });

  data.imageclarity = data.imageclarity + 10;
  increaseclarityupdateScore();
  chanceUpdate();
}
function checkanswer() {
  const ans = document.getElementById("hero").value;
  if (ans == "Prabhas") {
    alert("correct answer");
    window.location.href = "/blur4";
  } else {
    answercheckupdateScore();
  }
}

function answercheckupdateScore() {
  let score = parseInt(localStorage.getItem("score"));
  score = score - 5;
  localStorage.setItem("score", score);
  alert("wrong answer score decreased by 5");
  scorePlace.innerHTML = String(score);
}

function increaseclarityupdateScore() {
  let score = parseInt(localStorage.getItem("score"));
  score = score - 10;
  localStorage.setItem("score", score);
  alert(" score decreased by 10");
  scorePlace.innerHTML = String(score);
}
function chanceUpdate() {
  chances = chances - 1;
  if (chances == 0) {
    alert("you limited your chances moving to next");
    window.location.href = "/blur4";
  }
}
