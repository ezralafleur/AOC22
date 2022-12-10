function start() {
  let inputText = getInput();
  let matrix = makeMatrix(inputText);
  let sumVisible = iterateSumVisibleInMatrix(matrix);
  let maxScore = iterateMaxCoordScoreInMatrix(matrix);

  displayResults(sumVisible, maxScore);
}

function makeMatrix(input) {
  let rows = input.split("\n");
  let matrix = rows.map((row) => {
    let heights = row.split("");
    let heightInts = heights.map((height) => {
      return parseInt(height);
    });
    return heightInts;
  });

  return matrix;
}

function iterateSumVisibleInMatrix(matrix) {
  let totalVisible = 0;

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[0].length; x++) {
      totalVisible += isCoordVisibleInMatrix(x, y, matrix);
    }
  }

  return totalVisible;
}

function iterateMaxCoordScoreInMatrix(matrix) {
  let maxScore = 0;
  let maxY = 0;
  let maxX = 0;

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[0].length; x++) {
      let score = getCoordScoreFromMatrix(x, y, matrix);
      if (score > maxScore) {
        maxScore = score;
        maxY = y;
        maxX = x;
      }
    }
  }

  return maxScore;
}

function isCoordVisibleInMatrix(x, y, matrix) {
  let row = matrix[y];
  let col = matrix.map((matRow) => {
    return matRow[x];
  });

  let rowVis = isIndexVisibleInArr(x, row);
  let colVis = isIndexVisibleInArr(y, col);

  return rowVis || colVis;
}

function getCoordScoreFromMatrix(x, y, matrix) {
  let row = matrix[y];
  let col = matrix.map((matRow) => {
    return matRow[x];
  });

  let rowScore = getIndexScoreFromArr(x, row);
  let colScore = getIndexScoreFromArr(y, col);

  return rowScore * colScore;
}

function getIndexScoreFromArr(index, arr) {
  let i = index;
  let leftDistance = 0;
  let rightDistance = 0;

  for (let i = index - 1; i >= 0; i--) {
    leftDistance++;

    if (arr[i] >= arr[index]) {
      break;
    }
  }

  for (let i = index + 1; i < arr.length; i++) {
    rightDistance++;

    if (arr[i] >= arr[index]) {
      break;
    }
  }

  return leftDistance * rightDistance;
}

function isIndexVisibleInArr(index, arr) {
  let leftTallest = -1;
  let rightTallest = -1;

  let treeHeight = arr[index];

  let leftVis = true;
  let rightVis = true;

  for (let i = 0; i < arr.length; i++) {
    let compHeight = arr[i];

    if (i == index) {
      continue;
    } else if (leftVis && i < index) {
      leftTallest = leftTallest > compHeight ? leftTallest : compHeight;
      leftVis = leftTallest < treeHeight;

      if (!leftVis) {
        i = index;
      }
    } else if (rightVis && i > index) {
      rightTallest = rightTallest > compHeight ? rightTallest : compHeight;
      rightVis = rightTallest < treeHeight;

      if (!rightVis) {
        break;
      }
    }
  }

  return leftVis || rightVis;
}
