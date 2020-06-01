const DRAGGABLE_LIST = document.getElementById("draggable-list");
const CHECK = document.getElementById("check");

const RICHEST_PEOPLE = ["A", "B", "C", "D", "E", "F", "G", "H"];

const LIST_ITEMS = [];

let dragStartIndex;

createList();

function createList() {
  let randomizedList = RICHEST_PEOPLE.map((a) => {
    return { value: a, sort: Math.random() };
  })
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value) //used to discard sort.
    .forEach((person, index) => {
      const LIST = document.createElement("li");
      LIST.value = person;
      LIST.innerHTML = `
      <span class='number'> ${index + 1}</span>
      <div class='draggable' draggable='true'  id='${index}'>
      <p class='person-name'> ${person}</p>
      </div>
      `;

      LIST_ITEMS.push(LIST);
      DRAGGABLE_LIST.appendChild(LIST);
    });
}
//  let first;
document.getElementsByTagName(
  "li",
  addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("first", e.target.id);
  })
);
document.getElementsByTagName(
  "li",
  addEventListener("dragover", (e) => {
    e.preventDefault();
  })
);
document.getElementsByTagName(
  "li",
  addEventListener("drop", (e) => {
    let tmp = e.dataTransfer.getData('first');
    let firstTmp = document.getElementById(tmp).innerHTML;
    let anoTmp = e.target.id;
    let secTmp = document.getElementById(anoTmp).innerHTML;
    e.target.innerHTML = firstTmp;
    firstTmp.innerHTML = secTmp;
  })
);

// function swap(first, sec) {
//   let tmp = first;
//   first = sec.innerHTML;
//   sec = tmp.innerHTML;
// }
