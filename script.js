document.addEventListener('DOMContentLoaded', function () {

    // 1. Phone Mask format for Brazil (45) 9XXXX-XXXX
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            let match = value.match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
            e.target.value = !match[2] ? match[1] : '(' + match[1] + ') ' + match[2] + (match[3] ? '-' + match[3] : '');
        });
    }

    // 2. Prevent past dates selection in medical booking
    const dateInput = document.getElementById('preferredDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    // 3. Specialty Selection directly from Specialty Cards
    const specButtons = document.querySelectorAll('.btn-select-spec');
    const specialtySelect = document.getElementById('specialty');

    specButtons.forEach(button => {
        button.addEventListener('click', function () {
            const selectedSpec = this.getAttribute('data-spec');
            if (specialtySelect) {
                specialtySelect.value = selectedSpec;
            }
            // Smooth Scroll to Agendamento
            document.getElementById('agendamento').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // 4. Clinical Booking Payload & WhatsApp Integration
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

            // Format date to DD/MM/YYYY
            const rawDate = document.getElementById('preferredDate').value.split('-');
            const formattedDate = `${rawDate[2]}/${rawDate[1]}/${rawDate[0]}`;

            const whatsappNumber = "5545991317806"; // Código 55 + DDD Toledo (45) + Número

            // Formal Clinical Message Payload in Portuguese
            const message = `🏥 *SOLICITAÇÃO DE CONSULTA MÉDICA - HOSPITAL AQUARIPET*\n` +
                `-----------------------------------------------\n` +
                `👤 *Tutor:* ${ownerName}\n` +
                `📞 *Contato:* ${phone}\n` +
                `🐾 *Paciente:* ${petName} (${petSpecies})\n` +
                `🩺 *Especialidade:* ${specialty}\n` +
                `🚨 *Nível de Urgência:* ${urgencyLevel}\n` +
                `📅 *Data Solicitada:* ${formattedDate}\n` +
                `⏰ *Horário:* ${preferredTime}\n` +
                `📝 *Sintomas / Notas:* ${clinicalNotes}\n` +
                `-----------------------------------------------\n` +
                `_Aguardando confirmação de agenda médica._`;

            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
        });
    }

    // 5. FAQ Accordion Behavior
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