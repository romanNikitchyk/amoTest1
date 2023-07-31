const inputEl = document.querySelector('input');
    const buttonEl = document.querySelector('button');
    const timerEl = document.querySelector('span');

    const formatTime = (time) => {
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60)
      const seconds = time % 60
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    };

    const createTimerAnimator = () => {
      let timerId
      return (seconds) => {
        if (timerId) {
          clearInterval(timerId)
        }

        const updateTimer = () => {
          timerEl.textContent = formatTime(seconds)

          if (seconds <= 0) {
            clearInterval(timerId)
          } else {
            seconds--
          }
        };

        updateTimer();
        timerId = setInterval(updateTimer, 1000);
      }
    }

    const animateTimer = createTimerAnimator();

    inputEl.addEventListener('input', () => {
      inputEl.value = inputEl.value.replace(/[^\d:]/g, '')
    });

    buttonEl.addEventListener('click', () => {
      const timeArray = inputEl.value.split(':')
      const hours = parseInt(timeArray[0], 10)
      const minutes = parseInt(timeArray[1], 10)
      const seconds = parseInt(timeArray[2], 10)

      if (timeArray.length === 3 && !isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
        if (hours >= 0 && minutes >= 0 && seconds >= 0) {
          const totalSeconds = hours * 3600 + minutes * 60 + seconds
          animateTimer(totalSeconds)
        }
      }
      inputEl.value = ''
    });