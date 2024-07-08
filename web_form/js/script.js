function saveData() {
    const nama = document.getElementById('nama').value;
    const email = document.getElementById('email').value;
    const pesan = document.getElementById('pesan').value;

    const data = {
        nama: nama,
        email: email,
        pesan: pesan
    }
    const jsonData = JSON.stringify(data);

    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'formData.json';
    a.click();
    URL.revokeObjectURL(url);

    alert("Terima kasih, data pesan Anda telah terkirim!");
}