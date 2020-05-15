'use strict'
function initialize() {
    pageSetter();
}
let bombLocation = [];
let count = 1;
let div;

function pageSetter(limit1 = 9, limit2 = 9) {
    let h2 = document.createElement('h2');
    h2.innerHTML='Mine sweeper !';
    div = document.createElement('div');
    let div1;
    let div2;
    let tmp;
    bombLocation = [];
    for (let i = 0; i < limit1; ++i) {
        div1 = document.createElement('div');
        div1.setAttribute('class', 'row');
        tmp = Math.floor(Math.random() * limit2);
        bombLocation.push(tmp);
        for (let j = 0; j < limit2; ++j) {
            div2 = document.createElement('div');
            div2.setAttribute('class', 'col');
            div2.setAttribute('class', 'border');
            div2.value = `${i}${j}`;
            div2.onclick = valuer;
            div1.appendChild(div2);
        }
      //  console.log(tmp);
        div.appendChild(div1);
    }
    div.setAttribute('class', 'container');
    let ano = document.createElement('div');
    ano.setAttribute('id', 'points');
    ano.innerHTML = 'Points : ';
    div.append(ano);
    document.body.appendChild(h2);
    document.body.appendChild(div);
}

function valuer() {
    let tmp = this.value.split('');
  //  console.log(tmp)
    if (tmp[1] != bombLocation[tmp[0]]) {
        this.classList.add('filler', 'deactivate');
        document.getElementById('points').innerHTML = 'Points: ' + count++;
    }
    else {
        this.classList.add('negative');
        let result = document.createElement('h1');
        result.innerHTML = 'Game Over !!!'
        document.body.append(result);
        bombLocation.forEach((value, index) =>
            document.getElementsByClassName('row')[index].getElementsByClassName('border')[value].classList.add('negative'));
        let tmp = document.getElementsByClassName('row');
        for (let i = 0; i < tmp.length; ++i)
            tmp[i].classList.add('deactivate');
        let button = document.createElement('input');
        button.setAttribute('type', 'button');
        button.onclick = restarter;
        button.setAttribute('value', 'Play again');
        div.append(button);
    }
}

function restarter() {
    document.body.innerText = '';
    pageSetter();
}

window.onload = initialize();