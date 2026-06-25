document.addEventListener('DOMContentLoaded', () => {

  // Mobile nav toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      
      // Bonus: Toggle hamburger icon state
      const spans = hamburger.getElementsByTagName('span');
      if (isOpen) {
        spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
          const spans = hamburger.getElementsByTagName('span');
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      });
    });
  }

  // FAQ Toggle
  const faqItems = document.querySelectorAll('.faq-q');
  faqItems.forEach(item => {
    item.addEventListener('click', () => {
      const parent = item.parentElement;
      parent.classList.toggle('open');
      const icon = item.querySelector('.faq-icon');
      icon.textContent = parent.classList.contains('open') ? '-' : '+';
    });
  });

  // Booking Form Toggle
  const bookButton = document.querySelector('.btn-white');
  const bookingForm = document.getElementById('bookingForm');
  if (bookButton && bookingForm) {
    bookButton.addEventListener('click', () => {
      bookingForm.classList.toggle('visible');
      if (bookingForm.classList.contains('visible')) {
        bookingForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  // Booking Form Submission
  const submitBtn = document.querySelector('.form-submit');
  if(submitBtn) {
    submitBtn.addEventListener('click', async (event) => {
      event.preventDefault(); // Prevent default form submission

      // 1. Gather form data
      const fname = document.getElementById('fname').value;
      const lname = document.getElementById('lname').value;
      const femail = document.getElementById('femail').value;
      const fphone = document.getElementById('fphone').value;
      const ftype = document.getElementById('ftype').value;
      const fspec = document.getElementById('fspec').value;
      const fmsg = document.getElementById('fmsg').value;
      const lgpd = document.getElementById('lgpd').checked;

      // 2. Basic validation
      if (fname.trim() === '' || lname.trim() === '' || femail.trim() === '' || !lgpd) {
        alert('Por favor, preencha nome, sobrenome, e-mail e aceite os termos da LGPD.');
        return;
      }

      // 3. Construct payload
      const formData = { fname, lname, femail, fphone, ftype, fspec, fmsg };

      try {
        // 4. Send data to backend
        const response = await fetch('http://localhost:3000/api/booking', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          // 5. Show success message on UI
          document.getElementById('formContent').style.display = 'none';
          document.getElementById('formSuccess').classList.add('visible');
        } else {
          // 6. Handle server errors
          const errorData = await response.json();
          alert(`Erro ao enviar: ${errorData.error || 'Tente novamente mais tarde.'}`);
        }
      } catch (error) {
        // 7. Handle network errors
        console.error('Failed to send booking request:', error);
        alert('Falha na comunicação com o servidor. Verifique sua conexão e tente novamente.');
      }
    });
  }


  // Lead Magnet Form
  const leadButton = document.querySelector('.lead-form button');
  if (leadButton) {
    leadButton.addEventListener('click', () => {
      const emailInput = document.getElementById('leadEmail');
      if (emailInput.value.trim() !== '') {
        alert(`Obrigado! O guia foi enviado para ${emailInput.value}.`);
        emailInput.value = '';
      } else {
        alert('Por favor, insira seu e-mail.');
      }
    });
  }

  // Reveal on scroll
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
});

// These functions are now part of the event listeners above,
// but I'll leave them here in case you need to call them from somewhere else.
// If not, they can be safely removed.
function toggleFaq(element) {
  const parent = element.parentElement;
  parent.classList.toggle('open');
  const icon = element.querySelector('.faq-icon');
  icon.textContent = parent.classList.contains('open') ? '-' : '+';
}

function toggleBooking() {
  const bookingForm = document.getElementById('bookingForm');
  bookingForm.classList.toggle('visible');
  if (bookingForm.classList.contains('visible')) {
      bookingForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function submitForm() {
    const name = document.getElementById('fname').value;
    const email = document.getElementById('femail').value;
    const lgpd = document.getElementById('lgpd').checked;

    if (name.trim() === '' || email.trim() === '' || !lgpd) {
      alert('Por favor, preencha nome, e-mail e aceite os termos da LGPD.');
      return;
    }
    document.getElementById('formContent').style.display = 'none';
    document.getElementById('formSuccess').classList.add('visible');
}

function handleLead() {
  const emailInput = document.getElementById('leadEmail');
  if (emailInput.value.trim() !== '') {
    alert(`Obrigado! O guia foi enviado para ${emailInput.value}.`);
    emailInput.value = '';
  } else {
    alert('Por favor, insira seu e-mail.');
  }
}
