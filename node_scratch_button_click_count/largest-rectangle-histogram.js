function findLargestRectagnle(hist) {
  var h,
    pos,
    tempH,
    tempPos,
    tempSize = 0,
    maxSize = -Infinity;
  var hStack = [],
    pStack = [];

  function popThatShit() {
    tempH = hStack.pop();
    tempPos = pStack.pop();
    tempSize = tempH * (pos - tempPos);
    maxSize = Math.max(tempSize, maxSize);
    console.log(tempH, tempPos, tempSize, maxSize);
  }

  for (pos = 0; pos < hist.length; pos++) {
    h = hist[pos];
    if (hStack.length === 0 || h > hStack[hStack.length - 1]) {
      hStack.push(h);
      pStack.push(pos);
    } else if (h < hStack[hStack.length - 1]) {
      while (hStack.length && h < hStack[hStack.length - 1]) {
        popThatShit();
      }
      hStack.push(h);
      pStack.push(tempPos);
    }
  }
  while (hStack.length) popThatShit();

  return maxSize;
}

// findLargestRectagnle([6, 2, 5, 4, 5, 1, 6]);
