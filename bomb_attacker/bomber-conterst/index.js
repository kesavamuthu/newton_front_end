"use strict";
class LocationDetails {
  constructor(hasBomb = false) {
    this.click = false;
    this.hasBomb = hasBomb;
  }
}

class Game {
  constructor(limit1, limit2) {
    this.limit1 = limit1;
    this.limit2 = limit2;
    this.locationDetailsCollections = [];
    this.render();
  }

  render() {
    let count = 0;
    document.getElementById("root").innerHTML = "";
    const root = document.getElementById("root");
    let subRoot = document.createElement("div");
    let div;
    const maxLimit = this.limit1 * this.limit2;
    let bombLocation = this.randomNumberArrayGenerator(maxLimit);

    this.locationDetailsCollections = [];
    for (let i = 1; i < maxLimit + 1; ++i) {
      div = document.createElement("div");
      this.locationDetailsCollections.push(
        new LocationDetails(bombLocation.includes(i))
      );
      div.classList.add("border");
      div.style.verticalAlign='bottom';
      div.addEventListener("click", (event) => {
        if(!this.locationDetailsCollections[i - 1].click){
        if (this.locationDetailsCollections[i - 1].hasBomb) {
          this.showAllBombLocation();
          this.showButton(root);
          return;
        } else{
          event.target.style.backgroundColor = "green";
          event.target.innerText = this.getBombCountAroundDiv(i - 1);
          document.getElementById('score').innerHTML = ++count;
          if(count == 2){
          document.getElementById('score').innerHTML = count +" Hey you Won !!!";
          //disabling all click
          this.showButton(root);
          this.locationDetailsCollections.forEach(value => value.click = true);
        }
        }
      }
        this.locationDetailsCollections[i - 1].click = true;
      });
      div.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        if (this.locationDetailsCollections[i - 1].hasBomb && !this.locationDetailsCollections[i - 1].click) {
          event.target.innerHTML = "bo";
        }
      });

      subRoot.append(div);
      if (i % 9 == 0) {
        root.appendChild(subRoot);
        subRoot = document.createElement("div");
      }
    }
    let point = document.createElement('h3');
    point.innerHTML = 'Point : ';
    let PointValue = document.createElement('span');
    PointValue.setAttribute('id', 'score');
    point.appendChild(PointValue);
    root.appendChild(point);
  }
  randomNumberArrayGenerator(maxLimit) {
    let bombLocation = [];
    let tmp;
    while (bombLocation.length < maxLimit / 2) {
      tmp = Math.floor(Math.random() * maxLimit);
      if (!bombLocation.includes(tmp)) bombLocation.push(tmp);
    }
    return bombLocation;
  }

  showAllBombLocation() {
    const root = document.getElementById("root");
    const allDiv = root.getElementsByClassName("border");
    for (let i = 0; i < this.limit1 * this.limit1; ++i){
      if (this.locationDetailsCollections[i].hasBomb)
        allDiv[i].style.backgroundColor = "red";
      this.locationDetailsCollections[i].click = true;
      }
  }

  getBombCountAroundDiv(passedIndex) {
    let count = 0;
    if (passedIndex == 0) {
      count =
        this.locationDetailsCollections[passedIndex + 1].hasBomb +
        this.locationDetailsCollections[this.limit1].hasBomb +
        this.locationDetailsCollections[this.limit1 + 1].hasBomb;
      return count;
    } else if (passedIndex == this.limit1 - 1) {
      count =
        this.locationDetailsCollections[passedIndex - 1].hasBomb +
        this.locationDetailsCollections[passedIndex * 2].hasBomb +
        this.locationDetailsCollections[passedIndex * 2 + 1].hasBomb;
    } else if (passedIndex == this.limit1 * this.limit1 - 1) {
      count =
        this.locationDetailsCollections[passedIndex - 1].hasBomb +
        this.locationDetailsCollections[passedIndex - this.limit1].hasBomb +
        this.locationDetailsCollections[passedIndex - this.limit1 - 1].hasBomb;
    } else if (passedIndex == this.limit1 * this.limit1 - this.limit1) {
      count =
        this.locationDetailsCollections[passedIndex + 1].hasBomb +
        this.locationDetailsCollections[passedIndex - this.limit1].hasBomb +
        this.locationDetailsCollections[passedIndex - this.limit1 + 1].hasBomb;
    } //corner box handle above...
    else if (
      !(passedIndex % this.limit1) ||
      !((passedIndex + 1) % this.limit1)
    ) {
      //left and right side of the box
      if (!((passedIndex + 1) % this.limit1)) {
        passedIndex = passedIndex - 1;
        count = this.locationDetailsCollections[passedIndex].hasBomb;
      }
      count +=
        this.locationDetailsCollections[passedIndex + 1].hasBomb +
        this.locationDetailsCollections[passedIndex - this.limit1].hasBomb +
        this.locationDetailsCollections[passedIndex - this.limit1 + 1].hasBomb +
        this.locationDetailsCollections[passedIndex + this.limit1].hasBomb +
        this.locationDetailsCollections[passedIndex + this.limit1 + 1].hasBomb;
    } else if (
      (passedIndex > 0 && passedIndex < this.limit1) ||
      (passedIndex < this.limit1 ** 2 &&
        passedIndex > this.limit1 ** 2 - this.limit1)
    ) {
      //upper and lower side of the box
      let tmp = this.limit1;
      if (
        passedIndex < this.limit1 ** 2 &&
        passedIndex > this.limit1 ** 2 - this.limit1
      )
        tmp = -this.limit1;
      count =
        this.locationDetailsCollections[passedIndex + 1].hasBomb +
        this.locationDetailsCollections[passedIndex - 1].hasBomb +
        this.locationDetailsCollections[passedIndex + tmp + 1].hasBomb +
        this.locationDetailsCollections[passedIndex + tmp].hasBomb +
        this.locationDetailsCollections[passedIndex + tmp - 1].hasBomb;
    } else {
      for (let i = 0; i < 3; ++i)
        count += this.locationDetailsCollections[
          passedIndex + this.limit1 - 1 + i
        ].hasBomb;
      for (let i = 0; i < 3; ++i)
        count += this.locationDetailsCollections[
          passedIndex - this.limit1 - 1 + i
        ].hasBomb;
      count += this.locationDetailsCollections[passedIndex - 1].hasBomb;
      count += this.locationDetailsCollections[passedIndex + 1].hasBomb;
    }
    return count;
  }

  showButton(root){
    const button = document.createElement("button");
          button.innerText = "Play again";
          button.addEventListener("click", () => {
            this.render();
          });
          root.appendChild(button);
  }
}

const game = new Game(9, 9);
