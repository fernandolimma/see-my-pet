// scripts.js
function toggleDetails() {
    const detailsSection = document.getElementById('detailsSection');
    detailsSection.classList.toggle('hidden');
}

// scripts.js
async function fetchPetData(petId) {
    try {
        const response = await fetch(`http://localhost:5000/api/pets/${petId}`);
        if (!response.ok) {
            throw new Error('Pet not found');
        }
        const petData = await response.json();
        return petData;
    } catch (error) {
        console.error('Error fetching pet data:', error);
        return null;
    }
}

function populatePetData(petData) {
    document.getElementById('petName').textContent = petData.name;
    document.getElementById('petBreed').textContent = petData.breed;
    document.getElementById('petAge').textContent = `${petData.age} anos`;
    document.getElementById('tutorName').innerHTML = `<span class="font-medium">Tutor:</span><span class="text-blue-500">${petData.tutor}</span>`;
    document.getElementById('tutorWhatsApp').innerHTML = `<span class="font-medium">WhatsApp:</span><a href="https://wa.me/${petData.contact.whatsapp}" target="_blank" class="text-blue-500 hover:underline">${petData.contact.whatsapp}</a>`;
    document.getElementById('tutorAddress').innerHTML = `<span class="font-medium">Endereço:</span><span class="text-blue-500">${petData.contact.address}</span>`;
}

async function loadPetData() {
    const petId = 'SEU_PET_ID_AQUI'; // Substitua pelo ID do PET que você quer carregar
    const petData = await fetchPetData(petId);
    if (petData) {
        populatePetData(petData);
    } else {
        alert('Erro ao carregar os dados do PET.');
    }
}

// Carregar os dados do PET quando a página carregar
window.onload = loadPetData;

async function updatePetData(petId, updatedData) {
    try {
        const response = await fetch(`http://localhost:5000/api/pets/${petId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Adicione o token JWT aqui
            },
            body: JSON.stringify(updatedData)
        });
        if (!response.ok) {
            throw new Error('Failed to update pet data');
        }
        const updatedPet = await response.json();
        return updatedPet;
    } catch (error) {
        console.error('Error updating pet data:', error);
        return null;
    }
}

document.getElementById('editPetForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const petId = 'SEU_PET_ID_AQUI'; // Substitua pelo ID do PET que você quer editar
    const updatedData = {
        name: document.getElementById('editName').value,
        breed: document.getElementById('editBreed').value,
        age: document.getElementById('editAge').value,
        contact: {
            whatsapp: document.getElementById('editWhatsApp').value,
            address: document.getElementById('editAddress').value
        }
    };
    const updatedPet = await updatePetData(petId, updatedData);
    if (updatedPet) {
        alert('Dados atualizados com sucesso!');
        populatePetData(updatedPet);
    } else {
        alert('Erro ao atualizar os dados do PET.');
    }
});


async function loginTutor(email, password) {
    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
            throw new Error('Login failed');
        }
        const data = await response.json();
        localStorage.setItem('token', data.token); // Salvar o token no localStorage
        return data.token;
    } catch (error) {
        console.error('Error logging in:', error);
        return null;
    }
}

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const token = await loginTutor(email, password);
    if (token) {
        alert('Login successful!');
        window.location.href = '/'; // Redirecionar para a página principal
    } else {
        alert('Login failed. Please check your credentials.');
    }
});


function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/login.html'; // Redirecionar para a página de login
    }
}

// Verificar autenticação ao carregar a página
window.onload = () => {
    checkAuth();
    loadPetData();
};

async function fetchQRCode(url, elementId) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch QR code');
        }
        const data = await response.json();
        document.getElementById(elementId).src = data.qrCode;
    } catch (error) {
        console.error('Error fetching QR code:', error);
    }
}

async function loadQRCodes(petId) {
    await fetchQRCode(`http://localhost:5000/api/pets/${petId}/qr/view`, 'viewQRCode');
    await fetchQRCode(`http://localhost:5000/api/pets/${petId}/qr/edit`, 'editQRCode');
}

// Carregar os QR Codes quando a página carregar
window.onload = () => {
    checkAuth();
    loadPetData();
    const petId = 'SEU_PET_ID_AQUI'; // Substitua pelo ID do PET que você quer carregar
    loadQRCodes(petId);
};