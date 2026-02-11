const API_URL = 'http://localhost:3000/books';
const statusSelect = document.getElementById('status');
const rateContainer = document.getElementById('rateContainer');

if (statusSelect) {
    statusSelect.addEventListener('change', () => {
        rateContainer.style.display = statusSelect.value === 'Completed' ? 'block' : 'none';
    });
}

const bookForm = document.getElementById('bookForm');
if (bookForm) {
    bookForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            title: document.getElementById('title').value,
            author: document.getElementById('author').value,
            status_reading: statusSelect.value,
            rate: document.getElementById('rate').value || 0
        };
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (res.ok) window.location.href = 'library.html';
        } catch (err) { console.error("Error:", err); }
    });
}

async function fetchBooks() {
    const list = document.getElementById('libraryList');
    if (!list) return;
    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
            list.innerHTML = data.map(b => `
                <tr>
                    <td>${b.title}</td>
                    <td>${b.author}</td>
                    <td><span class="tag">${b.status_reading}</span></td>
                    <td>${b.rate > 0 ? b.rate + '/10' : '-'}</td>
                    <td><button class="btn-del" onclick="deleteBook(${b.id})">Remove</button></td>
                </tr>
            `).join('');
        } else {
            list.innerHTML = "<tr><td colspan='5' style='text-align:center;'>Empty collection.</td></tr>";
        }
    } catch (err) { list.innerHTML = "<tr><td colspan='5' style='text-align:center;'>Server error.</td></tr>"; }
}

async function deleteBook(id) {
    if (confirm('Remove this book?')) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchBooks();
    }
}