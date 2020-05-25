let x;
class Quiz {
  constructor(questions, answers) {
    this.questions = questions;
    this.answers = answers;
    this.wholeObjects = [];
    this.flag = false;
    this.isFinished = false;
    // this.skeletonMaker();
    if(localStorage.getItem('wh')){
      this.tmp = JSON.parse(localStorage.getItem('wh'));
      this.tmp = this.tmp.pop();
      if(this.tmp && this.tmp.endTime > new Date().getTime()){
        this.wholeObjects = this.tmp.wholeObjects;
        this.endTime = this.tmp.endTime;
        this.flag = true;
      }
    }
    if(!this.flag){
      this.wholeObjectsSetter();
      this.endTime = new Date().getTime() +(2 * 60000);
    }
    if(!localStorage.getItem('wh')){
      state.wholeObjects = this.wholeObjects;
      state.endTime = this.endTime;
      localStorage.setItem('wh', JSON.stringify([state]))
    }
    this.questionsSideBar();
    this.questionAndOptionsRender();
    
    x = setInterval(countDownTimer(this.endTime), 500);
  }

  questionAndOptionsRender(index = 0) {
    index = index >= this.wholeObjects.length ? 0 : index;
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
        if (!this.isFinished){
          event.target.style.backgroundColor = "green";
          pageObject.userAnswer = event.target.value;
          console.log(event.target.value);
        pageObject.isAttempted = true;
        state.wholeObjects = this.wholeObjects;
        state.endTime = this.endTime;
        this.tmp = JSON.parse(localStorage.getItem('wh'));
        this.tmp.push(state);
        localStorage.setItem('wh', JSON.stringify(this.tmp));
        }
        this.questionAndOptionsRender(index);
      });
      if(ind === pageObject.userAnswer)
          list.style.backgroundColor = "green";
      list.innerText = value;
      answerSecOne.appendChild(list)
    });
    if (document.getElementsByTagName("a")[0])
      document.getElementsByTagName("a")[0].remove();
    let button = document.createElement("a");
    button.innerText = "Next";
    button.classList.add("btn","btn-primary","btn-lg")
    // index++;
    button.addEventListener("click", function () {
      quiz.questionAndOptionsRender(index + 1);
      quiz.questionsSideBar();
    });
    if (index < this.wholeObjects.length)
      document.getElementsByClassName("jumbotron")[0].appendChild(button);
    else
    quiz.questionAndOptionsRender();
    this.finishIt();
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
      span.addEventListener('click', () =>{
        quiz.questionAndOptionsRender(index);
      })
      if(value.answer == value.userAnswer)
      span.classList.add('bg');
      else{
      head.innerHTML = 'Points : ';
     
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
      if(index + 1 == this.wholeObjects.length){
        cardBody.appendChild(pgh);
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

  finishIt(){
    let count = 0;
    let attemptCount = 0;
    let spans = document.getElementsByClassName('rounded-circle');
    this.wholeObjects.forEach((value, i) =>{
      if(value.userAnswer === value.answer && quiz.isFinished)
      ++count;
      if(value.isAttempted){
      spans[i].style.backgroundColor='black';
      ++attemptCount;
      }
    })
    document.getElementsByClassName('card-header')[0].innerHTML='Questions Attempted : ' + attemptCount;
    document.getElementsByClassName('card-title')[0].innerHTML='Points : ' + count;
    // return count;
  }
}

const state = {};

function countDownTimer(endTime){
  return () => {
    let currentTime = new Date().getTime();
    currentTime = endTime - currentTime;
    timer.innerText = '';
    let min = Math.floor((currentTime % (1000 * 60 * 60)) / (1000 * 60));
    let sec = Math.floor((currentTime % (1000 * 60)) / 1000);
    sec = sec < 10 ? '0' + sec : sec;
    min = min < 10 ? '0' + min : min;
    if(min <= 0 && sec <= 0){
    clearInterval(x);
    quiz.finishIt();
    quiz.isFinished = true;
    timer.innerText = 'Times Up!!!'
    return;
  }
    timer.innerText = min + ' : ' + sec;
  }
}

function getQuestions(count = 20) {
  const questions = [];
  const template = "This is dummy question with details ";
  for (let i = 0; i < count; i++) questions.push(template + (i + 1));
  return questions;
}

const quiz = new Quiz(getQuestions());
