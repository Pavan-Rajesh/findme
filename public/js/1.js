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

function init() {
  URL.revokeObjectURL(imagePlace.src);
  fetch("/makeblur?id=1", {
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
  // .then((arrayBufferData) => {
  //   console.log(arrayBufferData.arrayBuffer());
  //   const base64String = btoa(
  //     String.fromCharCode(...new Uint8Array(arrayBufferData))
  //   );
  //   const imageFromArrayBuffer = `data:image/png;base64,${base64String}`;
  //   imagePlace.setAttribute("src", imageFromArrayBuffer);
  // });
}

blurButton.addEventListener("click", increaseclarity);

function increaseclarity(e) {
  URL.revokeObjectURL(imagePlace.src);
  imagePlace.setAttribute("src", "images/before.jpg");

  fetch("/makeblur?id=1", {
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
  increaseclarityupdateScore();
  data.imageclarity = data.imageclarity + 10;
  chanceUpdate();
}

function checkanswer() {
  const ans = document.getElementById("hero").value;
  if (ans == "Ram") {
    alert("correct answer");
    window.location.href = "/blur2";
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
    window.location.href = "/blur2";
  }
}
