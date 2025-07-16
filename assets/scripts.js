// -------- FUNCIONALIDADES GLOBALES --------
document.addEventListener('DOMContentLoaded', function() {
    // Efecto scroll suave para todos los enlaces
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Actualizar año en el footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

// -------- INDEX.HTML - Efectos Especiales --------
if (document.querySelector('.hero-section')) {
    // Parallax en el hero
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        document.querySelector('.hero-section').style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    });

    // Animación de colecciones al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__fadeInUp');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.collection-card').forEach(card => {
        observer.observe(card);
    });
}

// -------- PRODUCTOS.HTML - Funcionalidades Avanzadas --------
if (document.getElementById('mesaForma')) {
    // Calculadora de tallas interactiva
    const calcularTallas = () => {
        const forma = document.getElementById('mesaForma').value;
        const largo = parseFloat(document.getElementById('mesaLargo').value) || 0;
        const ancho = parseFloat(document.getElementById('mesaAncho').value) || 0;
        let resultado = '';

        if (forma === 'rectangular' || forma === 'ovalada') {
            const mantelLargo = largo + 60;
            const mantelAncho = ancho + 40;
            resultado = `Recomendación: Mantel ${mantelLargo}x${mantelAncho}cm`;
        } else if (forma === 'redonda') {
            const diametro = largo + 50;
            resultado = `Recomendación: Mantel redondo Ø${diametro}cm`;
        } else {
            const lado = largo + 40;
            resultado = `Recomendación: Mantel cuadrado ${lado}x${lado}cm`;
        }

        document.getElementById('resultadoCalculadora').innerHTML = `
            <div class="alert alert-success mt-3">
                <h5>${resultado}</h5>
                <p class="mb-0">Para una caída elegante de 30cm</p>
            </div>
        `;
    };

    // Event listeners
    document.getElementById('mesaForma').addEventListener('change', calcularTallas);
    document.getElementById('mesaLargo').addEventListener('input', calcularTallas);
    document.getElementById('mesaAncho').addEventListener('input', calcularTallas);

    // Filtros interactivos
    document.querySelectorAll('.color-filter .color-dot').forEach(dot => {
        dot.addEventListener('click', function() {
            this.classList.toggle('active');
            // Lógica para filtrar productos (simulación)
            console.log('Filtrando por color:', this.style.backgroundColor);
        });
    });
}

// -------- CONTACTO.HTML - Validación Avanzada --------
if (document.getElementById('contactForm')) {
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validación personalizada
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        
        if (nombre.length < 3) {
            showError('nombre', 'El nombre debe tener al menos 3 caracteres');
            return;
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError('email', 'Ingresa un correo electrónico válido');
            return;
        }
        
        // Simulación de envío exitoso
        document.getElementById('contactForm').reset();
        showModal('¡Mensaje enviado!', 'Nuestro equipo te responderá en menos de 24 horas.');
    });
}

// -------- FUNCIONES UTILITARIAS --------
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    field.classList.add('is-invalid');
    field.nextElementSibling.textContent = message;
}

function showModal(title, message) {
    const modal = new bootstrap.Modal(document.createElement('div'));
    document.body.appendChild(modal._element);
    
    modal._element.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-gold text-white">
                    <h5 class="modal-title">${title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <p>${message}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-gold" data-bs-dismiss="modal">Entendido</button>
                </div>
            </div>
        </div>
    `;
    
    modal.show();
}

// -------- ANIMACIONES DE PRODUCTOS --------
if (document.querySelectorAll('.product-card').length > 0) {
    const productObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.product-card').forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        productObserver.observe(card);
    });
}