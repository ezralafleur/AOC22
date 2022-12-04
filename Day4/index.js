function start() {
    let inputText = getInput();
    let elfLines = inputText.split('\n');
    let elfPairs = elfLines.map(function(line){
        return line.split(',');
    });

    let elfRanges = elfPairs.map(function(pair){
        let elfOne = pair[0];
        let elfTwo = pair[1];

        let elfOneRange = getIntRangeFromElf(elfOne);
        let elfTwoRange = getIntRangeFromElf(elfTwo);

        return [elfOneRange, elfTwoRange];
    });

    let elfContains = elfRanges.map((ranges) => {
        return doRangesContain(ranges[0], ranges[1]);
    });

    let totalContains = elfContains.reduce((total, subtotal) => {
        return total+subtotal;
    });

    let elfOverlaps = elfRanges.map((ranges) => {
        return doRangesOverlap(ranges[0], ranges[1]);
    });

    let totalOverlaps = elfOverlaps.reduce((total, subtotal) => {
        return total+subtotal;
    });

    displayResults(totalContains, totalOverlaps);
}

function getIntRangeFromElf(elf) {
    let elfRange = elf.split('-');
    let elfIntRange = elfRange.map((item) => {return parseInt(item)});
    return elfIntRange;
}

function doRangesContain(rangeOne, rangeTwo) {
    if (rangeOne[0] > rangeTwo[0]) {
        return rangeOne[1] <= rangeTwo[1];
    }
    else if (rangeOne[0] < rangeTwo[0]) {
        return rangeOne[1] >= rangeTwo[1];
    }
    else if (rangeOne[0] == rangeTwo[0]) {
        return true;
    }
}

function doRangesOverlap(rangeOne, rangeTwo) {
    if (rangeOne[0] > rangeTwo[0]) {
        return rangeOne[0] <= rangeTwo[1];
    }
    else if (rangeOne[0] < rangeTwo[0]) {
        return rangeOne[1] >= rangeTwo[0];
    }
    else if (rangeOne[0] == rangeTwo[0]){
        return true;
    }
}