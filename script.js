document.getElementById('fetchMonster').addEventListener('click', function() {
    const searchInput = document.getElementById('searchInput').value;
    const url = `https://mhw-db.com/monsters`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let monster;
            // Cek apakah input adalah angka (ID) atau string (nama)
            if (!isNaN(searchInput) && searchInput.trim() !== '') {
                // Mencari monster berdasarkan ID
                const monsterId = parseInt(searchInput);
                monster = data.find(m => m.id === monsterId);
            } else {
                // Mencari monster berdasarkan nama
                monster = data.find(m => m.name.toLowerCase() === searchInput.toLowerCase());
            }

            const resultDiv = document.getElementById('result');
            if (monster) {
                resultDiv.innerHTML = `
                    <h2>${monster.name}</h2>
                    <p><strong>Deskripsi:</strong> ${monster.description}</p>
                    <p><strong>Jenis:</strong> ${monster.type}</p>
                    <p><strong>Spesies:</strong> ${monster.species}</p>
                `;
            } else {
                resultDiv.innerHTML = `<p style="color: red;">Monster tidak ditemukan!</p>`;
            }
        })
        .catch(error => {
            document.getElementById('result').innerHTML = `<p style="color: red;">Terjadi kesalahan: ${error.message}</p>`;
        });
});