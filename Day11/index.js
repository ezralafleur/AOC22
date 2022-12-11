var worryLevel;

class Monkey {
  static monkeys = new Map();

  constructor(name, items, operation, test) {
    this.name = parseInt(name.match(/\d/g)[0]);
    this.itemTotal = 0;
    this.items = items.map((item) => BigInt(item));
    this.operation = operation;
    this.test = test;

    Monkey.monkeys.set(this.name, this);
  }

  set test(testString) {
    let [criteria, trueString, falseString] = testString.split("\n");
    let modNum = parseInt(criteria.match(/\d+/g)[0]);
    let trueThrow = parseInt(trueString.match(/\d+/g)[0]);
    let falseThrow = parseInt(falseString.match(/\d+/g)[0]);

    this.testObj = { modNum, trueThrow, falseThrow };
  }

  addItem(item) {
    this.items.push(item);
  }

  getNewWorry(item) {
    let opString = this.operation.replaceAll("old", item);
    let [first, op, second] = opString.split(" ");
    first = BigInt(first);
    second = BigInt(second);

    if (op == "+") {
      item = first + second;
    } else if (op == "*") {
      item = first * second;
    } else {
      console.error("oh no");
    }

    if (worryLevel > 0) {
      item = item / BigInt(worryLevel);
    }

    return item;
  }

  testItem(item) {
    let testMod = item % BigInt(this.testObj.modNum);
    let targetMonkey;

    if (testMod == 0) {
      targetMonkey = Monkey.monkeys.get(this.testObj.trueThrow);
    } else {
      targetMonkey = Monkey.monkeys.get(this.testObj.falseThrow);
    }

    targetMonkey.addItem(item);
    // console.log(
    //   `Item ${item} was thrown to Monkey ${targetMonkey.name} because ${item} % ${this.testObj.modNum} == ${testMod}`
    // );
  }

  go() {
    let item = this.items.shift();
    this.itemTotal++;

    item = this.getNewWorry(item);

    this.testItem(item);
  }

  inspectAllItems() {
    while (this.items.length != 0) {
      this.go();
    }
  }
}

function start() {
  let inputText = getInput();

  Monkey.monkeys = new Map();
  makeMonkeysFromText(inputText);
  runNumRoundsWithWorryLevel(20, 3);

  let topTwo = getTopTwoMonkeys();
  let topTwoScore = topTwo[1].itemTotal * topTwo[0].itemTotal;

  Monkey.monkeys = new Map();
  makeMonkeysFromText(inputText);
  runNumRoundsWithWorryLevel(10000, 0);

  let worriedTopTwo = getTopTwoMonkeys();
  let worriedTopTwoScore =
    worriedTopTwo[1].itemTotal * worriedTopTwo[0].itemTotal;

  displayResults(topTwoScore, worriedTopTwoScore);
}

function runNumRoundsWithWorryLevel(rounds, worry) {
  worryLevel = worry;

  for (let i = 0; i < rounds; i++) {
    if (i % 100 == 0) {
      console.log("Starting round " + i);
    }
    executeRound();
  }
}

function getTopTwoMonkeys() {
  let monkeyScores = [...Monkey.monkeys.values()];
  monkeyScores.sort((a, b) => a.itemTotal - b.itemTotal);
  return monkeyScores.slice(-2);
}

function executeRound() {
  for (let monkey of Monkey.monkeys.values()) {
    monkey.inspectAllItems();
  }
}

function makeMonkeysFromText(input) {
  let monkeys = input.split("\n\n");
  monkeys = monkeys.map((monkey) => monkey.split("\n"));

  for (let monkey of monkeys) {
    [nameLine, itemLine, opLine, testLine, trueLine, falseLine] = monkey;

    let items = Array.from(itemLine.matchAll(/\d+\s?/g));
    items.map((item) => item[0]);

    let opString = opLine.split("=")[1];
    opString = opString.trim();

    let testString = [testLine, trueLine, falseLine].join("\n");

    let m = new Monkey(nameLine, items, opString, testString);
  }
}
