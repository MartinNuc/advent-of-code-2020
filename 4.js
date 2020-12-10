const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

const passports = input
  .split('\n\n')
  .map((row) => row.replace(/\n/g, ' '))
  .map((row) => row.split(' '))
  .map((row) =>
    row
      .map((keyValue) => keyValue.split(':'))
      .reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: value,
        }),
        {}
      )
  );

let offset = 0;

const validCount = passports.reduce((totalValid, passport) => {
  // if (isValidPassport(passport)) {
  //   offset++;
  //   if (offset === 134) {
  //     console.log(passport);
  //     process.exit();
  //   }
  // }
  return totalValid + isValidPassport(passport);
}, 0);
console.log(validCount);

function isValidPassport(passport) {
  return hasRequiredFields(passport) && fieldsAreValid(passport);
}

function hasRequiredFields(passport) {
  const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  return requiredFields.reduce((acc, curr) => acc && curr in passport, true);
}

function fieldsAreValid(passport) {
  const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  const validators = {
    byr: (value) => +value >= 1920 && +value <= 2002,
    iyr: (value) => +value >= 2010 && +value <= 2020,
    eyr: (value) => +value >= 2020 && +value <= 2030,
    hgt: (value) => hgtValidator(value),
    hcl: (value) => /#[0-9a-f]{6}/.test(value),
    ecl: (value) =>
      ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value),
    pid: (value) => /^\d{9}$/.test(value),
  };
  return requiredFields.reduce((acc, field) => {
    const fieldValidator = validators[field];
    const fieldValue = passport[field];
    return acc && fieldValidator(fieldValue);
  }, true);
}

function hgtValidator(input) {
  try {
    const [_, value, unit] = input.match(/(\d+)(cm|in)/);
    switch (unit) {
      case 'cm':
        return +value >= 150 && +value <= 193;
      case 'in':
        return +value >= 59 && +value <= 76;
      default:
        throw new Error(`unknown unit: ${unit}`);
    }
  } catch (e) {
    return false;
  }
}
