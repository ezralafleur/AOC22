function startCalc() {
    let rounds = getInput();

    let stratOneScore = strategyOne(rounds);
    let stratTwoScore = strategyTwo(rounds);
    
    displayResult(stratOneScore, stratTwoScore);
}

function getInput() {
    let inputElement = document.getElementById("initialInput");
    let inputText = inputElement.value.trim();

    let rounds = inputText.split('\n');

    return rounds;
}

function displayResult(stratOneScore, stratTwoScore) {
    let resultContainer = document.getElementById("resultCont");
    let resultElement = document.getElementById("resultText");

    resultElement.innerHTML = "Strategy 1 Score: " + stratOneScore;
    resultElement.innerHTML += "<br>Strategy 2 Score: " + stratTwoScore;
    resultContainer.style.display = "block";
}

function getScore(oppCode, youCode) {
    let diff = youCode - oppCode;
    let mod_diff = ((diff % 3) + 3) % 3;

    let score = youCode + 1;

    if (mod_diff == 1 || mod_diff == -2) { // you win
        score += 6;
    }
    else if (mod_diff == 0) { // you tie
        score += 3;
    }
    else if (mod_diff == -1 || mod_diff == 2) { // you lose
        score += 0;
    }

    return score;
}

function strategyOne(rounds) {
    let roundScores = rounds.map(function(round){
        let roundPicks = round.split(' ');
        let oppCode = roundPicks[0].charCodeAt() - "A".charCodeAt();
        let youCode = roundPicks[1].charCodeAt() - "X".charCodeAt();

        return getScore(oppCode, youCode);
    });

    let sumScores = roundScores.reduce(function(total, subtotal){
        return total+subtotal;
    });

    return sumScores;
}

function strategyTwo(rounds) {
    let roundScores = rounds.map(function(round){
        let roundPicks = round.split(' ');

        let oppPick = roundPicks[0].charCodeAt() - "A".charCodeAt();
        let outcome = roundPicks[1];
        let youPick;

        if (outcome == 'X') {
            youPick = (oppPick + 2) % 3;
        }
        else if (outcome == 'Y') {
            youPick = oppPick;
        }
        else if (outcome == 'Z') {
            youPick = (oppPick + 1) % 3;
        }
        
        return getScore(oppPick, youPick);
    });

    let sumScores = roundScores.reduce(function(total, subtotal){
        return total+subtotal;
    });

    return sumScores;
}

