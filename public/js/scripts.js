// scripts.js
function toggleDetails() {
    const detailsSection = document.getElementById('detailsSection');
    detailsSection.classList.toggle('hidden');
}

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
    const petId = '679aa395df4ac7f68b9f0a3c'; // Substitua pelo ID do PET que você quer carregar
    const petData = await fetchPetData(petId);
    if (petData) {
        populatePetData(petData);
    } else {
        alert('Erro ao carregar os dados do PET.');
    }
}

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

// Carregar os dados do PET e QR Codes quando a página carregar
window.onload = () => {
    loadPetData();
    const petId = '679aa395df4ac7f68b9f0a3c'; // Substitua pelo ID do PET que você quer carregar
    loadQRCodes(petId);
};