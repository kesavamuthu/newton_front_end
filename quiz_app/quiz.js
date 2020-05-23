class Quiz {
  constructor(questions, answers) {
    this.questions = questions;
    this.answers = answers;
    this.wholeObjects = [];
    // this.skeletonMaker();
    this.endTime;
    this.initialPageRender();
    this.wholeObjectsSetter();
  }

  skeletonMaker() {
    const root = document.getElementById("root");
    root.innerHTML = "";
    let div;
    let span;
    let mainDiv = document.createElement("div");
    mainDiv.classList.add("col-8");
    div = document.createElement("div");
    div.classList.add("row");
    div.setAttribute("id", "question");
    mainDiv.appendChild(div);

    div = document.createElement("div");
    div.setAttribute("id", "first-row");
    div.classList.add("row");
    mainDiv.appendChild(div);

    div = document.createElement("div");
    div.setAttribute("id", "second-row");
    div.classList.add("row");
    mainDiv.appendChild(div);
    root.appendChild(mainDiv);

    mainDiv = document.createElement("div");
    mainDiv.classList.add("col-4");
    root.appendChild(mainDiv);
    this.endTime = new Date().getTime() +(15 * 60000);
    // setInterval(this.hai, 550);
    setInterval(countDownTimer(new Date().getTime(), this.endTime), 1000);
    quiz.questionAndOptionsRender();
   
  }

  questionAndOptionsRender(index = 0) {
    let question = document.getElementById("question");
    let answerSecOne = document.getElementById("first-row");
    let answerSecTwo = document.getElementById("second-row");
    let span;
    let pageObject = this.wholeObjects[index];
    question.innerText = "";
    question.innerText = pageObject.question;
    answerSecOne.innerHTML = "";
    answerSecTwo.innerHTML = "";
    pageObject.options.forEach((value, ind) => {
      span = document.createElement("span");
      span.value = ind;
      span.classList.add("col-4");
      span.addEventListener("click", (event) => {
        if (!pageObject.isAttempted)
          event.target.style.backgroundColor = "green";
        console.log(event.target.value);
        pageObject.isAttempted = true;
      });
      span.innerText = value;
      if (ind < 2) answerSecOne.appendChild(span);
      else answerSecTwo.appendChild(span);
    });
    if (document.getElementsByTagName("button")[0])
      document.getElementsByTagName("button")[0].remove();
    let button = document.createElement("button");
    button.innerText = "Next";
    index++;
    button.addEventListener("click", function () {
      quiz.questionAndOptionsRender(index);
    });
    if (index < this.wholeObjects.length)
      document.getElementsByClassName("col-8")[0].appendChild(button);
      span = document.createElement("span");

  }

  wholeObjectsSetter() {
    let obj;
    this.questions.forEach((element) => {
      obj = {};
      obj.question = element;
      obj.answer = Math.floor(Math.random() * 4);
      obj.options = ["option 1", "option 2", "option 3", "option 4"];
      obj.isAttempted = false;
      obj.flag = false;
      obj.userAnswer = "";
      this.wholeObjects.push(obj);
    });
  }

  initialPageRender() {
    const root = document.getElementById("root");
    root.innerHTML = "";
    const body = document.getElementsByTagName("body")[0];
    let header = document.createElement("h3");
    let div;
    let divRow;
    let middleDiv;
    body.style.backgroundColor = "salmon";
    body.style.font = "comic sans ms";
    divRow = document.createElement("div");
    divRow.classList.add("row");
    for (let i = 0; i < 3; ++i) {
      div = document.createElement("div");
      div.classList.add("col-sm");
      divRow.appendChild(div);
    }

    header.innerText = "The quiz app";
    header.classList.add("center");
    root.classList.add("container");
    root.appendChild(divRow);
    middleDiv = document.getElementsByClassName("col-sm")[1];
    middleDiv.classList.add("col-6");
    middleDiv.appendChild(header);
    const button = document.createElement("button");
    button.innerText = "Begin";
    button.addEventListener("click", this.skeletonMaker);
    middleDiv.appendChild(button);
  }

}

function countDownTimer(currentTime, endTime){
  return () => {
    // let currentTime = new Date().getTime();
    currentTime = endTime - currentTime;
    // timer.innerText = '';
    let min = Math.floor((currentTime % (1000 * 60 * 60)) / (1000 * 60));
    // let min = 0;
    let sec = Math.floor((currentTime % (1000 * 60)) / 1000);
    // sec = sec < 10 ? '0' + sec : sec;
    // min = min < 10 ? '0' + min : min;
    // if(sec == 59)
    // ++min;
    console.log(min, sec);
    // timer.innerText = min + ' : ' + sec;
  }
}

function getQuestions(count = 10) {
  const questions = [];
  const template = "This is dummy question no : ";
  for (let i = 0; i < count; i++) questions.push(template + (i + 1));
  return questions;
}

const quiz = new Quiz(getQuestions());
