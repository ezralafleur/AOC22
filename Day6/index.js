function start() {
  let inputText = getInput();
  let packetStart = findUniqueWindow(inputText, 4);
  let messageStart = findUniqueWindow(inputText, 14);

  displayResults(packetStart, messageStart);
}

function findUniqueWindow(input, windowLength) {
  windowLength -= 1;

  for (let i in input) {
    i = parseInt(i);
    let char = input[i];

    let windowStart = i < windowLength ? 0 : i - windowLength;
    let windowEnd = i > windowLength ? i : windowLength;

    let window = input.slice(windowStart, windowEnd);

    if (arrayContainsDuplicates(window)) {
      continue;
    } else if (!window.includes(char)) {
      return windowEnd + 1;
    }
  }

  return -1;
}

function arrayContainsDuplicates(arr) {
  let s = new Set(arr);
  return s.size < arr.length;
}
