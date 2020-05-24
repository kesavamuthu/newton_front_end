let x;
class Quiz {
  constructor(questions, answers) {
    this.questions = questions;
    this.answers = answers;
    this.wholeObjects = [];
    // this.skeletonMaker();
    this.endTime;
    this.wholeObjectsSetter();
    this.questionAndOptionsRender();
    this.questionsSideBar();
  }

  skeletonMaker() {
    const root = document.getElementById("root");
    root.innerHTML = "";
    let div;
    let span;
    let mainRow;
    mainRow = document.createElement("div");
    mainRow.classList.add("row");
    let mainDiv = document.createElement("div");
    mainDiv.classList.add("col-sm-8");
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
    mainRow.appendChild(mainDiv);

    mainDiv = document.createElement("div");
    mainDiv.classList.add("col-sm-4");
    mainRow.appendChild(mainDiv);
    span = document.createElement("span");
    span.setAttribute('id', 'timer');
    mainDiv.appendChild(span);
    root.appendChild(mainRow);
    this.endTime = new Date().getTime() +(0.5 * 60000);
    // setInterval(this.hai, 550);
    x = setInterval(countDownTimer(this.endTime), 500);
    quiz.questionAndOptionsRender();
   
  }

  questionAndOptionsRender(index = 0) {
    const root = document.getElementById('root');
    let questionIndex = document.getElementById("question-index");
    let question = document.getElementById("question");
    let answerSecOne = document.getElementsByTagName('ul')[0];
    let list;
    let pageObject = this.wholeObjects[index];
    questionIndex.innerText = "";
    questionIndex.innerText = "Question : " +( index + 1);
    question.innerText = "";
    question.innerText = pageObject.question;
    answerSecOne.innerHTML = "";
    pageObject.options.forEach((value, ind) => {
      list = document.createElement("li");
      list.value = ind;
      list.classList.add("list-group-item");
      list.addEventListener("click", (event) => {
        if (!pageObject.isAttempted){
          event.target.style.backgroundColor = "green";
          pageObject.userAnswer = event.target.value;
        }
        if(ind == pageObject.userAnswer && pageObject.userAnswer == pageObject.answer)
          list.style.backgroundColor = "green";
        console.log(event.target.value);
        pageObject.isAttempted = true;
      });
      list.innerText = value;
      answerSecOne.appendChild(list)
    });
    if (document.getElementsByTagName("a")[0])
      document.getElementsByTagName("a")[0].remove();
    let button = document.createElement("a");
    button.innerText = "Next";
    button.classList.add("btn","btn-primary","btn-lg")
    index++;
    button.addEventListener("click", function () {
      quiz.questionAndOptionsRender(index);
      quiz.questionsSideBar();
    });
    if (index < this.wholeObjects.length)
      document.getElementsByClassName("jumbotron")[0].appendChild(button);
    else
    quiz.questionAndOptionsRender();
  }

  questionsSideBar(){
    let cardBody = document.getElementsByClassName('card-body')[0];
    cardBody.innerHTML = '';
    let head = document.createElement('h5');
    head.classList.add("card-title");
    head.innerText='Points : ';
    let pgh = document.createElement('p');
    let span = document.createElement('span');
    let count = 0;
    let correctAnswers = this.wholeObjects.length;
    pgh.classList.add("card-text");
    pgh.style.marginTop='20px';
    cardBody.appendChild(head);
    this.wholeObjects.forEach((value, index) =>{
      span = document.createElement('span');
      span.classList.add("rounded-circle", "border","border-dark", "padding");
      span.addEventListener('click', (index) =>{
        quiz.questionAndOptionsRender(index)
      })
      if(value.answer == value.userAnswer)
      span.classList.add('bg');
      else{
      head.innerHTML = 'Points : ' + (correctAnswers - 1);
     
    }
      span.innerText= index < 9 ? "0" + (index + 1) : index + 1;
      pgh.appendChild(span);
      ++count;
      if(count == 3){
        cardBody.appendChild(pgh);
        pgh = document.createElement('p');
        pgh.classList.add("card-text");
        pgh.style.marginTop='20px';
        count = 0;
      }
    })
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
}

function countDownTimer(endTime){
  return () => {
    let currentTime = new Date().getTime();
    currentTime = endTime - currentTime;
    timer.innerText = '';
    let min = Math.floor((currentTime % (1000 * 60 * 60)) / (1000 * 60));
    // let min = 0;
    let sec = Math.floor((currentTime % (1000 * 60)) / 1000);
    sec = sec < 10 ? '0' + sec : sec;
    min = min < 10 ? '0' + min : min;
    // if(sec == 59)
    // ++min;
    console.log(min, sec);
    if(sec == 0)
    clearInterval(x);
    timer.innerText = min + ' : ' + sec;
  }
}

function getQuestions(count = 20) {
  const questions = [];
  const template = "This is dummy question no : ";
  for (let i = 0; i < count; i++) questions.push(template + (i + 1));
  return questions;
}

const quiz = new Quiz(getQuestions());
