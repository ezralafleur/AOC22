function getInput() {
    let inputElement = document.getElementById("input");
    let inputText = inputElement.value.trimRight();

    return inputText;
}

function displayResults(solutionOne, solutionTwo) {
    let resultContainer = document.getElementById("resultCont");
    let firstElement = document.getElementById("solutionOne");
    let secondElement = document.getElementById("solutionTwo");

    firstElement.innerText = solutionOne;
    secondElement.innerText = solutionTwo;
    resultContainer.style.display = "block";
}