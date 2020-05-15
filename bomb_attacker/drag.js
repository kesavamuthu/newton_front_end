let main = document.getElementById('first');
var flag = false;
let tmp = document.createElement('div');
let start = {};
let end = {};
main.addEventListener('mousedown', (event) =>{
    tmp.style.position='absolute';
    start.posX = event.clientX;
    start.posY = event.clientY;
    flag=true;
});

main.addEventListener('mousemove', (event) =>{
    if(flag){
    end.posX = event.clientX;
    end.posY = event.clientY;
}
})

main.addEventListener('mouseup', () =>{
    flag = false;
    tmp.style.top = start.posY +'px';
    tmp.style.left = start.posX +'px';
    tmp.style.width =  (end.posX - start.posX) + 'px';
    tmp.style.height =  (end.posY - start.posY) + 'px';
    tmp.style.backgroundColor='red';
    main.appendChild(tmp);
    console.log(start.posX +'       ' + start.posY +'\n' + end.posX +'              ' + end.posY)
})