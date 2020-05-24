function initialPageRender() {
    const root = document.getElementById("root");
    root.innerHTML = "";
    const body = document.getElementsByTagName("body")[0];
    let header = document.createElement("h1");
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
    middleDiv.classList.add("initialPage");
    middleDiv.appendChild(header);
    const button = document.createElement("button");
    button.innerText = "Begin";
    button.classList.add('btn', 'btn-dark');
    button.addEventListener("click", ()=>{
      location.href='./question.html';
    });
    middleDiv.appendChild(button);
  }

  initialPageRender();