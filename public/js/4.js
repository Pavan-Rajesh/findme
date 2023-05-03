const blurButton = document.getElementById("blur-button");
const imagePlace = document.getElementById("image-place");
const scorePlace = document.getElementById("score-place");
let chances = 6;
let clarity = 9;
let data = {
  imageclarity: clarity,
};
window.onload = () => {
  init();
};

function init() {
  fetch("/makeblur?id=4", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.arrayBuffer();
    })
    .then((arrayBufferData) => {
      const base64String = btoa(
        String.fromCharCode(...new Uint8Array(arrayBufferData))
      );
      const imageFromArrayBuffer = `data:image/png;base64,${base64String}`;
      imagePlace.setAttribute("src", imageFromArrayBuffer);
    });
  const score = localStorage.getItem("score");
  scorePlace.innerHTML = score;
}
blurButton.addEventListener("click", increaseclarity);

function increaseclarity(e) {
  console.log(data.imageclarity);
  imagePlace.setAttribute("src", "images/before.jpg");
  fetch("/makeblur?id=4", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.arrayBuffer();
    })
    .then((arrayBufferData) => {
      const base64String = btoa(
        String.fromCharCode(...new Uint8Array(arrayBufferData))
      );
      const imageFromArrayBuffer = `data:image/png;base64,${base64String}`;
      imagePlace.setAttribute("src", imageFromArrayBuffer);
    });

  data.imageclarity = data.imageclarity + 10;
  increaseclarityupdateScore();
  chanceUpdate();
}

function checkanswer() {
  const ans = document.getElementById("hero").value;
  if (ans == "Suriya") {
    alert("correct answer");
    window.location.href = "/score";
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
    alert("you limited your chances moving to scoredashboard");
    window.location.href = "/score";
  }
}
