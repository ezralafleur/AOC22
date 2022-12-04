function startCalc() {
    let elves = getElvesArrays();

    let elfTotals = elves.map(function(elf){
        return elf.reduce(function(total, item){
            item = parseInt(item);
            return total+item;
        }, 0);
    });

    let topThree = elfTotals.sort().reverse().slice(0,3);
    let topThreeSum = topThree.reduce(function(total,subtotal){
        return total+subtotal;
    },0);

    displayResult(topThree, topThreeSum);

}

function getElvesArrays() {
    let inputElement = document.getElementById("initialInput");
    let inputText = inputElement.value.trim();

    let elfArr = inputText.split('\n\n');
    elfArr = elfArr.map(function(elf){return elf.split('\n')});

    return elfArr;
}

function displayResult(topThree, topThreeSum) {
    let resultContainer = document.getElementById("resultCont");
    let resultElement = document.getElementById("resultText");

    resultElement.innerHTML = "Max: " + topThree[0] + "<br>Top Three: " + topThreeSum;
    resultContainer.style.display = "block";
}