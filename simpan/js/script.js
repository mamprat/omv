document.addEventListener("DOMContentLoaded", () => {
    updateTime();
    loadOperators();
    document.getElementById('ok-button').addEventListener('click', saveData);
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
    const currentDate = `${month}/${day}/${year}`;

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

function saveData() {
    const group = document.getElementById('group').value;
    const operator1 = document.getElementById('operator1').value;
    const operator2 = document.getElementById('operator2').value;
    const line = document.getElementById('line').value;
    const color = document.getElementById('color').value;

    const data = {
        group,
        operator1,
        operator2,
        line,
        color,
        timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formData.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    alert('Data berhasil disimpan!');
}
