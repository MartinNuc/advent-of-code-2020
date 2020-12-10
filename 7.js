const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const rules = input.split('\n');

// const bagsWithGold = getBagToContent(rules);
// console.log('Vysledek', bagsWithGold);

const bagsInShinyGold = unpackBag(rules, 'shiny gold') - 1;
console.log(bagsInShinyGold);

function unpackBag(rules, whichBag) {
  const ruleForThisBag = rules.find((rule) => rule.startsWith(whichBag));
  const [_, content] = ruleForThisBag.split(' bags contain ');
  if (content === 'no other bags.') {
    return 1;
  }
  const bagsInside = content.replace('.', '').split(', ');
  return (
    bagsInside.reduce((acc, curr) => {
      const [_, count, bagType] = curr.match(/(\d+) (.*) bag[s]{0,1}/);
      return acc + count * unpackBag(rules, bagType);
    }, 0) + 1
  );
}

/*
function getBagToContent(rules) {
  const bagsWithGold = new Map();
  let bagsWithGoldBeforeSize;
  do {
    bagsWithGoldBeforeSize = bagsWithGold.size;
    rules.forEach((rule) => {
      const [bagDescription, contentDescription] = rule.split(' bags contain ');
      if (
        contentDescription.includes('shiny gold') ||
        containsAnyBagWithGold(contentDescription, bagsWithGold)
      ) {
        bagsWithGold.set(bagDescription, calculateShinyGolds(contentDescription, bagsWithGold));
      }
    });
  } while (bagsWithGoldBeforeSize < bagsWithGold.size);
  return bagsWithGold.size;
}

function containsAnyBagWithGold(contentDescription, bagsWithGold) {
  return Array.from(bagsWithGold).reduce(
    (acc, curr) => acc || contentDescription.includes(curr),
    false
  );
}
*/
function calculateShinyGolds(contentDescription, bagsWithGold) {}

module.exports = {
  calculateShinyGolds,
};
