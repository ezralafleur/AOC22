function start() {
  let inputText = getInput();
  let lines = inputText.split("\n");
  let signals = getSignalsFromInstructions(lines);

  let imageBits = convertSignalsToImageBits(signals);
  let imageString = makeImageStringFromBits(imageBits);

  let signalStrengths = getStrengthsFromSignals(signals);
  let interestingStrengths = getInterestingBitsFromArray(signalStrengths);

  let strengthSum = interestingStrengths.reduce((total, subtotal) => {
    return total + subtotal;
  });

  displayResults(strengthSum, imageString);
}

function convertSignalsToImageBits(signals) {
  let imageBits = [];

  for (let i = 0; i < signals.length; i++) {
    let position = i % 40;
    let signal = signals[i];

    if (position >= signal - 1 && position <= signal + 1) {
      imageBits.push("#");
    } else {
      imageBits.push(".");
    }
  }

  return imageBits;
}

function makeImageStringFromBits(bits) {
  let image = "<pre><code style='display:inline-block;line-height:0.6;'>";

  for (let i = 0; i < bits.length; i++) {
    if (i % 40 == 0) {
      image += "\n";
    }
    image += bits[i];
  }

  image += "</code></pre>";

  return image;
}

function getSignalsFromInstructions(lines) {
  let signalArray = [1];

  for (let line of lines) {
    let [op, value] = line.split(" ");
    value = parseInt(value);

    let priorValue = signalArray[signalArray.length - 1];
    signalArray.push(priorValue);

    if (op == "addx") {
      let newValue = priorValue + value;
      signalArray.push(newValue);
    }
  }

  return signalArray;
}

function getStrengthsFromSignals(signals) {
  let strengths = [];
  for (let i = 0; i < signals.length; i++) {
    let position = i + 1;
    let signal = signals[i];

    strengths.push(position * signal);
  }

  return strengths;
}

function getInterestingBitsFromArray(bits) {
  let interestingBits = [];

  for (let i = 20; i < bits.length; i += 40) {
    let position = i - 1;
    interestingBits.push(bits[position]);
  }

  return interestingBits;
}
