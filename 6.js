const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const groups = input.split('\n\n');
const sum = groups.reduce((acc, curr) => acc + countQuestions(curr), 0);
console.log(sum);

function countQuestions(group) {
  const people = group.split('\n');
  const numberOfPeople = people.length;
  const responseCounts = people.reduce((acc, curr) => {
    const responses = getResponses(curr);
    responses.forEach((response) => {
      if (acc[response] !== undefined) {
        acc[response]++;
      } else {
        acc[response] = 1;
      }
    });
    return acc;
  }, {});
  let everyoneRespondedYesCount = 0;
  for (let question in responseCounts) {
    if (responseCounts[question] === numberOfPeople) {
      everyoneRespondedYesCount++;
    }
  }
  return everyoneRespondedYesCount;
}

function getResponses(person) {
  return person.split('');
}
