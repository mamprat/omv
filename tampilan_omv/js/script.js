document.addEventListener("DOMContentLoaded", () => {
    updateTime();
    loadOperators();
    document.getElementById('ok-button').addEventListener('click', startProcess);
    document.getElementById('next1').addEventListener('click', startStep1);
    document.getElementById('next2').addEventListener('click', startStep2);
    document.getElementById('finish').addEventListener('click', startStep3);
});

function updateTime() {
    const now = new Date();
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const currentTime = `${hours}:${minutes}:${seconds}`;

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero indexed
    const year = now.getFullYear();
    const currentDate = `${day}/${month}/${year}`;

    timeElement.textContent = currentTime;
    dateElement.textContent = currentDate;

    setTimeout(updateTime, 1000);
}

function loadOperators() {
    fetch('operator.txt')
        .then(response => response.text())
        .then(data => {
            const operators = data.split('\n').map(name => name.trim()).filter(name => name);
            const operator1Select = document.getElementById('operator1');
            const operator2Select = document.getElementById('operator2');

            operators.forEach(operator => {
                const option1 = document.createElement('option');
                option1.value = operator;
                option1.textContent = operator;
                operator1Select.appendChild(option1);

                const option2 = document.createElement('option');
                option2.value = operator;
                option2.textContent = operator;
                operator2Select.appendChild(option2);
            });
        })
        .catch(error => console.error('Error loading operators:', error));
}

function startProcess() {
    document.getElementById('selectedColor').textContent = document.getElementById('color').value;
}

function startStep1() {
    document.getElementById('next1').disabled = true;
    let countdown = 10; // 10 in seconds
    const countdownElement = document.getElementById('countdown1');
    countdownElement.textContent = `${countdown} seconds remaining`;
    const interval = setInterval(() => {
        if (countdown === 0) {
            clearInterval(interval);
            document.getElementById('next2').disabled = false;
        } else {
            countdown--;
            countdownElement.textContent = `${countdown} seconds remaining`;
        }
    }, 1000);
}

function startStep2() {
    document.getElementById('next2').disabled = true;
    let countdown = 5; // 5 in seconds
    const countdownElement = document.getElementById('countdown2');
    countdownElement.textContent = `${countdown} seconds remaining`;
    const interval = setInterval(() => {
        if (countdown === 0) {
            clearInterval(interval);
            document.getElementById('finish').disabled = false;
        } else {
            countdown--;
            countdownElement.textContent = `${countdown} seconds remaining`;
        }
    }, 1000);
}

function startStep3() {
    document.getElementById('finish').disabled = true;
    let countdown = 10; // 10 in seconds
    const countdownElement = document.getElementById('countdown3');
    countdownElement.textContent = `${countdown} seconds remaining`;
    const interval = setInterval(() => {
        if (countdown === 0) {
            clearInterval(interval);
            finishProcess();
        } else {
            countdown--;
            countdownElement.textContent = `${countdown} seconds remaining`;
        }
    }, 1000);
}

function finishProcess() {
    const group = document.getElementById('group').value;
    const operator1 = document.getElementById('operator1').value;
    const operator2 = document.getElementById('operator2').value;
    const line = document.getElementById('line').value;
    const color = document.getElementById('color').value;

    const data = {
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        group,
        operator1,
        operator2,
        line,
        color
    };

    console.log('Process finished:', JSON.stringify(data));
}
