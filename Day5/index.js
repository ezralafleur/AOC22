function start() {
    let inputText = getInput();

    let inputSplit = inputText.split('\n\n');

    let startingPosition = inputSplit[0];
    let instructionLines = inputSplit[1];

    let stacks = createStacks(startingPosition);

    let instructionNumbers = parseInstructions(instructionLines);

    let newStacks9000 = doInstructionsOnStacks9000(instructionNumbers, stacks);
    let newStacks9001 = doInstructionsOnStacks9001(instructionNumbers, stacks);

    let tops9000 = getTops(newStacks9000);
    let tops9001 = getTops(newStacks9001);

    displayResults(tops9000.join(''), tops9001.join(''));
}

function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function doInstructionsOnStacks9000(instructions, stacks) {
    let newStacks = deepCopy(stacks);

    for (let instruction of instructions) {
        let quantity = instruction[0];
        let source = instruction[1] - 1;
        let destination = instruction[2] - 1;

        for (let i = 0; i < quantity; i++) {
            let box = newStacks[source].pop();
            newStacks[destination].push(box);
        }
    }

    return newStacks;
}

function doInstructionsOnStacks9001(instructions, stacks) {
    let newStacks = deepCopy(stacks);

    for (let instruction of instructions) {
        let quantity = instruction[0];
        let source = instruction[1] - 1;
        let destination = instruction[2] - 1;

        let moving = newStacks[source].slice(0-quantity);
        let remainder = newStacks[source].slice(0,0-quantity);

        newStacks[source] = remainder;
        newStacks[destination] = newStacks[destination].concat(moving);
    }

    return newStacks;
}

function parseInstructions(instructions) {
    let instructionArr = instructions.split('\n');

    instructionArr = instructionArr.map(line => {
        let numbers = [...line.matchAll(/\d+/g)];

        numbers = numbers.map(numberArr => {
            return parseInt(numberArr[0]);
        })

        return numbers;
    });

    return instructionArr;
}

function createStacks(stackSetup) {
    let stackNum = parseInt(stackSetup[stackSetup.length-2]);
    let stacks = [];
    var stacksIndex = 0;

    for (let i = 0; i < stackNum; i++) {
        stacks.push([]);
    }

    for (let i = 0; i < stackSetup.length; i++) {
        let char = stackSetup[i];

        if (char.match(/[0-9]/g)) {
            break;
        }
        else if (char == '[') {
            continue;
        }
        else if (char == '\n') {
            stacksIndex = 0;
        }
        else if (char == ' ') {
            i += 3;
            if (stacksIndex == stackNum - 1) {
                stacksIndex = 0;
            }
            else {
                stacksIndex++;
            }
            continue;
        }
        else {
            i += 3;
            stacks[stacksIndex].push(char);

            if (stacksIndex == stackNum - 1) {
                stacksIndex = 0;
            }
            else {
                stacksIndex++;
            }
        }
    }

    stacks = stacks.map(stack => {
        return stack.reverse();
    });

    return stacks;
}

function peek(arr) {
    return arr[arr.length-1];
}

function getTops(stacks) {
    let tops = stacks.map(stack => {
        return peek(stack);
    });

    return tops;
}