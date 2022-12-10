function start() {
  let inputText = getInput();

  let elves = getElvesArrays(inputText);

  let elfTotals = elves.map(function (elf) {
    return elf.reduce(function (total, item) {
      item = parseInt(item);
      return total + item;
    }, 0);
  });

  let topThree = elfTotals.sort().reverse().slice(0, 3);
  let topThreeSum = topThree.reduce(function (total, subtotal) {
    return total + subtotal;
  }, 0);

  displayResults(topThree, topThreeSum);
}

function getElvesArrays(inputText) {
  let elfArr = inputText.split("\n\n");
  elfArr = elfArr.map(function (elf) {
    return elf.split("\n");
  });

  return elfArr;
}
