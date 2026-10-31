document.addEventListener('DOMContentLoaded', function () {

    // Mobile Hamburger Menu Toggle
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // Dark / Light Mode Toggle
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const bodyElement = document.body;

    const savedTheme = localStorage.getItem('aquaripet_theme');
    if (savedTheme === 'light') {
        bodyElement.classList.add('light-mode');
        if (themeToggleBtn) themeToggleBtn.textContent = '☀️';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            bodyElement.classList.toggle('light-mode');
            
            if (bodyElement.classList.contains('light-mode')) {
                localStorage.setItem('aquaripet_theme', 'light');
                themeToggleBtn.textContent = '☀️';
            } else {
                localStorage.setItem('aquaripet_theme', 'dark');
                themeToggleBtn.textContent = '🌙';
            }
        });
    }

    // Phone Mask
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            let match = value.match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
            e.target.value = !match[2] ? match[1] : '(' + match[1] + ') ' + match[2] + (match[3] ? '-' + match[3] : '');
        });
    }

    // Min Date
    const dateInput = document.getElementById('preferredDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    // Specialty Selection
    const specButtons = document.querySelectorAll('.btn-select-spec');
    const specialtySelect = document.getElementById('specialty');

    specButtons.forEach(button => {
        button.addEventListener('click', function () {
            const selectedSpec = this.getAttribute('data-spec');
            if (specialtySelect) {
                specialtySelect.value = selectedSpec;
            }
            document.getElementById('agendamento').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Booking Form & WhatsApp
    const clinicalForm = document.getElementById('clinicalBookingForm');
    if (clinicalForm) {
        clinicalForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const ownerName = document.getElementById('ownerName').value;
            const phone = document.getElementById('phone').value;
            const petName = document.getElementById('petName').value;
            const petSpecies = document.getElementById('petSpecies').value;
            const specialty = document.getElementById('specialty').value;
            const urgencyLevel = document.getElementById('urgencyLevel').value;
            const preferredTime = document.getElementById('preferredTime').value;
            const clinicalNotes = document.getElementById('clinicalNotes').value || 'Nenhuma observação prévia.';

            const rawDate = document.getElementById('preferredDate').value.split('-');
            const formattedDate = `${rawDate[2]}/${rawDate[1]}/${rawDate[0]}`;

            const whatsappNumber = "5545991317806";

            const message = `🏥 *SOLICITAÇÃO DE CONSULTA - AQUARIPET*\n` +
                `-----------------------------------\n` +
                `👤 *Tutor:* ${ownerName}\n` +
                `📞 *Contato:* ${phone}\n` +
                `🐾 *Paciente:* ${petName} (${petSpecies})\n` +
                `🩺 *Especialidade:* ${specialty}\n` +
                `🚨 *Urgência:* ${urgencyLevel}\n` +
                `📅 *Data:* ${formattedDate}\n` +
                `⏰ *Horário:* ${preferredTime}\n` +
                `📝 *Notas:* ${clinicalNotes}\n` +
                `-----------------------------------\n` +
                `_Aguardando confirmação._`;

            window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        header.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isOpen) item.classList.add('active');
        });
    });
});
