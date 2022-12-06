function start() {
    let inputText = getInput();
    let index = processInput(inputText);

    displayResults(index);
}

function processInput(input) {
    for (let i in input) {
        i = parseInt(i);
        let char = input[i];

        let windowStart = i < 3 ? 0 : i-3;
        let windowEnd = i > 3 ? i : 3;

        let window = input.slice(windowStart, windowEnd);

        if (arrayContainsDuplicates(window)) {
            continue;
        }
        else if (!window.includes(char)) {
            return i + 1;
        }
    }

    return -1;
}

function arrayContainsDuplicates(arr) {
    let s = new Set(arr);
    return s.size < arr.length;
}