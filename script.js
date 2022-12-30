const cardscontainer = document.querySelector(".card-container");
// const cards = document.querySelectorAll(".card");
const prevbtn = document.querySelector(".prev");
const nextbtn = document.querySelector(".next");
const currentpage = document.querySelector(".current-page");

const addbtn = document.querySelector(".add-btn");
const closeaddbtn = document.querySelector(".close-add");

const addnewcard = document.querySelector(".addnewcard-container");

const question = document.getElementById("question");
const answer = document.getElementById("answer");
const addcardbtn = document.querySelector(".add-card-btn");

const clearbtn = document.querySelector(".clear-btn");

let currentcardindex = 0;

let cardsEl = [];

let cardsdata;

// const cardsdata = [
//   {
//     question: "What must a variable begin with?",
//     answer: "A letter, $ or _",
//   },
//   {
//     question: "What is a variable?",
//     answer: "Container for a piece of data",
//   },
//   {
//     question: "Example of Case Sensitive Variable",
//     answer: "thisIsAVariable",
//   },
// ];

let savedcards = JSON.parse(localStorage.getItem("cardsdata"));

if (localStorage.getItem("cardsdata") === null) {
  cardsdata = [];
} else {
  cardsdata = savedcards;
}

// console.log(cardsdata);
// populateui();
createcards();

// cards.forEach((card) => {
//   card.addEventListener("click", () => {
//     card.classList.toggle("rotate-card");
//   });
// });

addbtn.addEventListener("click", () => {
  addnewcard.classList.add("show-addnewcard");
});

closeaddbtn.addEventListener("click", () => {
  addnewcard.classList.remove("show-addnewcard");
});

function addactivecard() {
  if (cardsEl.length > 0) {
    cardsEl[currentcardindex].classList.add("active-card");
    currentpage.innerText = `${currentcardindex + 1} / ${cardsEl.length}`;
  }
}

// console.log(cardsEl.length);

addactivecard();

function movetoprevcard() {
  prevcardindex = currentcardindex - 1;
  //   console.log("currentcardindex", currentcardindex);
  //   console.log("prevcardindex", prevcardindex);

  if (currentcardindex > 0) {
    cardsEl[currentcardindex].classList.remove("active-card");
    // cardsEl[currentcardindex].classList.add("right");
    // cardsEl[currentcardindex].className = "card right";

    cardsEl[prevcardindex].classList.add("active-card");
    // cardsEl[prevcardindex].className = "card active-card";

    currentcardindex--;
    currentpage.innerText = `${currentcardindex + 1} / ${cardsEl.length}`;
  }
}

// console.log("total-cards", cards.length);

// const nowindex = document.querySelector(".active-card");

function movetonextcard() {
  nextcardindex = currentcardindex + 1;
  //   console.log("currentcardindex", currentcardindex);
  //   console.log("nextcardindex", nextcardindex);

  if (currentcardindex < cardsEl.length - 1) {
    cardsEl[currentcardindex].classList.remove("active-card");
    // cardsEl[currentcardindex].classList.add("left");
    cardsEl[nextcardindex].classList.add("active-card");

    // cardsEl[currentcardindex].className = "card left";
    // cardsEl[nextcardindex].className = "card active-card";

    currentcardindex++;
    currentpage.innerText = `${currentcardindex + 1} / ${cardsEl.length}`;
  }
}

function createcards() {
  cardsdata.forEach((data, index) => createcard(data, index));
}

function createcard(data, index) {
  // cardsdata.forEach((data, index) => {
  const cardEl = document.createElement("div");

  cardEl.classList.add("card");

  if (index === 0) {
    cardEl.classList.add("active-card");
  }

  cardEl.innerHTML = `
        
        <div class="inner-card">
        <div class="front-card">
        <p>${data.question}</p>
        </div>
        <div class="back-card">
        <p>${data.answer}</p>
        </div>
        </div>
        `;

  cardEl.addEventListener("click", () => {
    cardEl.classList.toggle("rotate-card");
  });

  cardsEl.push(cardEl);
  // cardsdata = [];

  // updtatelocalstorage();
  cardscontainer.appendChild(cardEl);
  // });
}

function getinput() {
  const ques = question.value;
  const ans = answer.value;

  if (ques.trim() && ans.trim()) {
    const newcard = {
      question: ques,
      answer: ans,
    };

    cardsdata.push(newcard);
    //   cardsEl.push(data);
    // populateui();

    createcard(newcard);
    addactivecard();

    question.value = "";
    answer.value = "";

    addnewcard.classList.remove("show-addnewcard");
    // console.log(cardsdata);
    // console.log(cardsEl);

    // console.log(cardsEl.innerText);
    updtatelocalstorage();
  } else {
    alert("please fill question and answer sections");
  }
}

function updtatelocalstorage() {
  localStorage.setItem("cardsdata", JSON.stringify(cardsdata));
  window.location.reload();
}

nextbtn.addEventListener("click", movetonextcard);
prevbtn.addEventListener("click", movetoprevcard);

addcardbtn.addEventListener("click", getinput);

// updtatelocalstorage();

// console.log(cardsEl);

clearbtn.addEventListener("click", () => {
  localStorage.clear();
  cardscontainer.innerHTML = "";
  window.location.reload();
});
