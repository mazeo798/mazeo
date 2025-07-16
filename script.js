document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const startStopBtn = document.getElementById('startStopBtn');
    const resetBtn = document.getElementById('resetBtn');
    const lapList = document.getElementById('lapList');

    let timer = null;
    let startTime = 0;
    let elapsedTime = 0;
    let isRunning = false;
    let lapCounter = 0;

    function formatTime(ms) {
        const date = new Date(ms);
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');
        const milliseconds = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
        return `${minutes}:${seconds}:${milliseconds}`;
    }

    function updateDisplay() {
        const now = Date.now();
        elapsedTime = now - startTime;
        display.textContent = formatTime(elapsedTime);
    }

    function startStop() {
        if (isRunning) {
            clearInterval(timer);
            isRunning = false;
            startStopBtn.textContent = '刻み始め'; // ボタンテキストを元に戻す
            startStopBtn.classList.remove('stop');
            startStopBtn.classList.add('start');
            const lapBtn = document.getElementById('lapBtn');
            if (lapBtn) {
                lapBtn.remove();
            }
        } else {
            startTime = Date.now() - elapsedTime;
            timer = setInterval(updateDisplay, 10);
            isRunning = true;
            startStopBtn.textContent = '時を止める'; // ボタンテキストをファンタジー風に変更
            startStopBtn.classList.remove('start');
            startStopBtn.classList.add('stop');
            addLapButton();
        }
    }

    function addLapButton() {
        if (!document.getElementById('lapBtn')) {
            const lapBtn = document.createElement('button');
            lapBtn.id = 'lapBtn';
            lapBtn.className = 'button lap';
            lapBtn.textContent = '時を刻む'; // ラップボタンのテキストをファンタジー風に変更
            lapBtn.addEventListener('click', recordLap);
            const controlsDiv = document.querySelector('.controls');
            controlsDiv.insertBefore(lapBtn, resetBtn);
        }
    }

    function recordLap() {
        if (isRunning) {
            lapCounter++;
            const lapTime = formatTime(elapsedTime);
            const li = document.createElement('li');
            li.textContent = `古の刻 ${lapCounter}: ${lapTime}`; // ラップ表示をファンタジー風に変更
            lapList.prepend(li);
        }
    }

    function reset() {
        clearInterval(timer);
        isRunning = false;
        startTime = 0;
        elapsedTime = 0;
        display.textContent = '00:00:00';
        startStopBtn.textContent = '刻み始め'; // ボタンテキストを元に戻す
        startStopBtn.classList.remove('stop');
        startStopBtn.classList.add('start');
        lapList.innerHTML = '';
        lapCounter = 0;
        const lapBtn = document.getElementById('lapBtn');
        if (lapBtn) {
            lapBtn.remove();
        }
    }

    startStopBtn.addEventListener('click', startStop);
    resetBtn.addEventListener('click', reset);
});