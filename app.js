'use strict';

const dateOfBirth = document.querySelector('#date-of-birth');
const btnCheck = document.querySelector('#btn-check');
const outputMessage = document.querySelector('#output');

const availableDateFormats = [
  'dd-mm-yyyy',
  'mm-dd-yyyy',
  'yyyy-mm-dd',
  'dd-mm-yy',
  'mm-dd-yy',
  'yy-mm-dd',
];

const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const validateFn = () => {
  if (dateOfBirth.value === '') {
    displayMessage('Please enter a valid value');
    return false;
  } else {
    return true;
  }
};

const checkPalindrome = inputStr => {
  return inputStr === inputStr.split('').reverse().join('');
};

const availableFormats = inputDate => {
  // 0 - year, 1 - month, 2- date
  const availableFormatArray = [];
  availableFormatArray.push(inputDate[2] + inputDate[1] + inputDate[0]);
  availableFormatArray.push(inputDate[1] + inputDate[2] + inputDate[0]);
  availableFormatArray.push(inputDate[0] + inputDate[1] + inputDate[2]);
  availableFormatArray.push(
    inputDate[2] + inputDate[1] + inputDate[0].substring(2)
  );
  availableFormatArray.push(
    inputDate[1] + inputDate[2] + inputDate[0].substring(2)
  );
  availableFormatArray.push(
    inputDate[0].substring(2) + inputDate[1] + inputDate[2]
  );
  return availableFormatArray;
};

const displayMessage = message => {
  outputMessage.innerText = message;
};

const isLeapYear = yearVal => {
  if (Number(yearVal) % 400 === 0) {
    return true;
  }
  if (Number(yearVal) % 100 === 0) {
    return false;
  }
  if (Number(yearVal) % 4 === 0) {
    return true;
  }
  return false;
};

const getNextDate = ([yearVal, monthVal, dayVal]) => {
  let newDayVal = 0;
  let newMonthVal = 0;
  let newYearVal = 0;
  if (isLeapYear(yearVal) && Number(monthVal) === 2) {
    if (Number(dayVal) === 28) {
      newDayVal = 29;
      newMonthVal = Number(monthVal);
      newYearVal = Number(yearVal);
    }
    if (Number(dayVal) === 29) {
      newDayVal = 1;
      newMonthVal = Number(monthVal) + 1;
      newYearVal = Number(yearVal);
    }
  } else {
    if (Number(dayVal) < daysInMonth[Number(monthVal) - 1]) {
      newDayVal = Number(dayVal) + 1;
      newMonthVal = Number(monthVal);
      newYearVal = Number(yearVal);
    } else {
      newDayVal = 1;
      if (Number(monthVal) === 12) {
        newMonthVal = 1;
        newYearVal = Number(yearVal) + 1;
      } else {
        newMonthVal = Number(monthVal) + 1;
        newYearVal = Number(yearVal);
      }
    }
  }
  newYearVal = String(newYearVal);
  if (newMonthVal < 10) {
    newMonthVal = '0' + newMonthVal;
  } else {
    newMonthVal = String(newMonthVal);
  }
  if (newDayVal < 10) {
    newDayVal = '0' + newDayVal;
  } else {
    newDayVal = String(newDayVal);
  }
  return [newYearVal, newMonthVal, newDayVal];
};

const getNextPalindromeDate = dateArray => {
  let nextDate = getNextDate(dateArray);
  let count = 0;
  let isPalindrome = false;
  while (true) {
    count++;
    const dateArray = availableFormats(nextDate);
    for (const dateItem of dateArray) {
      if (checkPalindrome(dateItem)) {
        isPalindrome = true;
        break;
      }
    }
    if (isPalindrome) {
      return [count, nextDate];
    } else {
      nextDate = getNextDate(nextDate);
    }
  }
};

const getPrevDate = ([yearVal, monthVal, dayVal]) => {
  let newDayVal = 0;
  let newMonthVal = 0;
  let newYearVal = 0;
  if (isLeapYear(yearVal) && Number(dayVal) === 1 && Number(monthVal) === 3) {
    newDayVal = 29;
    newMonthVal = Number(monthVal) - 1;
    newYearVal = Number(yearVal);
  } else if (
    isLeapYear(yearVal) &&
    Number(dayVal) === 29 &&
    Number(monthVal) === 2
  ) {
    newDayVal = 28;
    newMonthVal = Number(monthVal);
    newYearVal = Number(yearVal);
  } else {
    if (Number(dayVal) !== 1) {
      newDayVal = Number(dayVal) - 1;
      newMonthVal = Number(monthVal);
      newYearVal = Number(yearVal);
    } else {
      if (Number(monthVal) === 1) {
        newMonthVal = 12;
        newYearVal = Number(yearVal) - 1;
      } else {
        newMonthVal = Number(monthVal) - 1;
        newYearVal = Number(yearVal);
      }
      newDayVal = daysInMonth[newMonthVal - 1];
    }
  }
  newYearVal = String(newYearVal);
  if (newMonthVal < 10) {
    newMonthVal = '0' + newMonthVal;
  } else {
    newMonthVal = String(newMonthVal);
  }
  if (newDayVal < 10) {
    newDayVal = '0' + newDayVal;
  } else {
    newDayVal = String(newDayVal);
  }
  return [newYearVal, newMonthVal, newDayVal];
};

const getPrevPalindromeDate = dateArray => {
  let prevDate = getPrevDate(dateArray);
  let count = 0;
  let isPalindrome = false;
  while (true) {
    count++;
    const dateArray = availableFormats(prevDate);
    for (const dateItem of dateArray) {
      if (checkPalindrome(dateItem)) {
        isPalindrome = true;
        break;
      }
    }
    if (isPalindrome) {
      return [count, prevDate];
    } else {
      prevDate = getPrevDate(prevDate);
    }
  }
};

btnCheck.addEventListener('click', () => {
  displayMessage('');
  if (validateFn()) {
    let isPalindrome = false;
    let index = 0;
    const dateValue = dateOfBirth.value.split('-');
    const dateArray = availableFormats(dateValue);
    for (const dateItem of dateArray) {
      if (checkPalindrome(dateItem)) {
        isPalindrome = true;
        break;
      }
      index++;
    }
    if (isPalindrome) {
      displayMessage(
        `Yay! The date is a palindrome in ${availableDateFormats[index]} format`
      );
    } else {
      const [countNext, nextDate] = getNextPalindromeDate(dateValue);
      const [countPrev, prevDate] = getPrevPalindromeDate(dateValue);
      if (countNext < countPrev) {
        displayMessage(
          `Oh no! This is not a Palindrome Date.\nThe closest palindrome date is ${nextDate
            .reverse()
            .join('-')} which is ${countNext} day${
            countNext === 1 ? '' : 's'
          } away.`
        );
      } else {
        displayMessage(
          `Oh no! This is not a Palindrome Date.\nThe closest palindrome date is ${prevDate
            .reverse()
            .join('-')} which was ${countPrev} day${
            countPrev === 1 ? '' : 's'
          } back.`
        );
      }
    }
  }
});
