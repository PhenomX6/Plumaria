// Aguarda o documento HTML ser completamente carregado
document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA PARA AS ANIMAÇÕES DE SCROLL ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    });
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));


    // --- LÓGICA PARA O MENU HAMBÚRGUER ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const primaryNav = document.querySelector('.primary-navigation');
    
    // Verifica se o botão do menu existe antes de adicionar o listener
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
            const isVisible = primaryNav.getAttribute('data-visible') === 'true';
    
            if (!isVisible) {
                primaryNav.setAttribute('data-visible', true);
                mobileNavToggle.setAttribute('data-open', true);
            } else {
                primaryNav.setAttribute('data-visible', false);
                mobileNavToggle.setAttribute('data-open', false);
            }
        });
    }


    // --- LÓGICA PARA O EFEITO SPOTLIGHT ---
    const heroSection = document.getElementById('hero');

    // A CORREÇÃO: SÓ RODA ESTE CÓDIGO SE A SEÇÃO 'hero' EXISTIR NA PÁGINA
    if (heroSection) {
        const spotlight = document.getElementById('spotlight-overlay');
        heroSection.addEventListener('mousemove', (e) => {
            spotlight.style.setProperty('--mouse-x', e.clientX + 'px');
            spotlight.style.setProperty('--mouse-y', e.clientY + 'px');
        });
    }


    // --- LÓGICA PARA HEADER FIXO AO ROLAR ---
    const header = document.querySelector('header');

    // Verifica se o header existe antes de adicionar o listener de scroll
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        });
    }
});

