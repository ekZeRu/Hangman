let answer = '';
let answerState = [];
let mistakesCount = 0;
let lettersState;

startGame();

function startGame() {
  mistakesCount = 0;
  setDefaultKeyboard();
  drawPerson(0);
  drawBoard(lettersState);
  generateWord();
}

function generateWord() {
  answer = dictionary[Math.floor(Math.random() * dictionary.length)]
  answerState = [];
  for (let i = 0; i < answer.length; i++) {
    answerState.push(' _ ');
  }
  drawAnswerState(answerState);
}

function onKeyClick(letter) {
  if (mistakesCount >= 7) {
    alert('Вы проиграли! Ответ: ' + answer);
    startGame();
    return;
  }
  let letterFromState;
  for (let i = 0; i < lettersState.length; i++) {
    if (lettersState[i].char === letter) {
      letterFromState = lettersState[i];
      break;
    }
  }
  if (!answer.includes(letter) && !letterFromState.error) {
    letterFromState.error = true;
    mistakesCount += 1;
  }
  if (answer.includes(letter) && !letterFromState.success) {
    letterFromState.success = true;
    for (let i = 0; i < answer.length; i++) {
      if (answer[i] === letter) {
        answerState[i] = letter;
      }
    }
  }
  drawPerson(mistakesCount);
  drawBoard(lettersState);
  drawAnswerState(answerState);
  if (answerState.join('') === answer) {
    winGame()
  }
}