const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const COLOR_DELAY = 1000;

stopBtn.setAttribute('disabled', 'true');

startBtn.addEventListener('click', () => {
//   console.log('Это кнопка START');

  startBtn.setAttribute('disabled', 'true');
  stopBtn.removeAttribute('disabled');

  const changeColor = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, COLOR_DELAY);

  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, 0)}`;
  }

  stopBtn.addEventListener('click', () => {
    // console.log('Это кнопка STOP');

    stopBtn.setAttribute('disabled', 'true');
    startBtn.removeAttribute('disabled');

    clearInterval(changeColor);
  });
});
