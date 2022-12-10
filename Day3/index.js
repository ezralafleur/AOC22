function start() {
  let inputText = getInput();
  let sacks = inputText.split("\n");

  let sackSets = sacks.map(function (sack) {
    return new Set(sack);
  });

  let badges = findBadgesFromSackSets(sackSets);

  let badgePriorities = badges.map(function (badge) {
    return getPriorityOfItem(badge);
  });

  let sumBadgePriority = badgePriorities.reduce(function (total, subtotal) {
    return total + subtotal;
  });

  let sackCompSets = sacks.map(function (sack) {
    return getCompartmentSets(sack);
  });

  let matchingItems = sackCompSets.map(function (sack) {
    return findMatchingItem(sack);
  });

  let itemPriorities = matchingItems.map(function (item) {
    return getPriorityOfItem(item);
  });

  let sumItemPriority = itemPriorities.reduce(function (total, subtotal) {
    return total + subtotal;
  });

  displayResults(sumItemPriority, sumBadgePriority);
}

function findBadgesFromSackSets(sackSets) {
  let badgeList = [];
  for (let i = 0; i < sackSets.length; i += 3) {
    for (let item of sackSets[i]) {
      if (sackSets[i + 1].has(item) && sackSets[i + 2].has(item)) {
        badgeList.push(item);
      }
    }
  }

  return badgeList;
}

function getCompartmentSets(sack) {
  let midpoint = sack.length / 2;

  let compOne = new Set(sack.slice(0, midpoint));
  let compTwo = new Set(sack.slice(midpoint));

  return [compOne, compTwo];
}

function findMatchingItem(sack) {
  for (let item of sack[0]) {
    if (sack[1].has(item)) {
      return item;
    }
  }
}

function getPriorityOfItem(letter) {
  let code = letter.charCodeAt();
  let priority;

  if (code >= "a".charCodeAt()) {
    priority = code - 96;
  } else {
    priority = code - 38;
  }

  return priority;
}
