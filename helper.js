function getInput() {
  let inputElement = document.getElementById("input");
  let inputText = inputElement.value.trimRight();

  return inputText;
}

function displayResults(solutionOne, solutionTwo) {
  let resultContainer = document.getElementById("resultCont");
  let firstElement = document.getElementById("solutionOne");
  let secondElement = document.getElementById("solutionTwo");

  firstElement.innerHTML = solutionOne;
  secondElement.innerHTML = solutionTwo;
  resultContainer.style.display = "block";
}
