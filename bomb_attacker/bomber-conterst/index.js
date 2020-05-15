"use strict"
let root = document.getElementById('root');
let subRoot;
subRoot = document.createElement('div');
let div;
for(let i = 1; i < 82; ++i){
    div = document.createElement('div');
    div.innerHTML=i;
    div.classList.add('border')
    subRoot.append(div);
    if(i%9 == 0){
        root.appendChild(subRoot);    
        subRoot = document.createElement('div');    
    }
}
