// header and footer
// Fonction pour définir le lien actif dans la navigation
function setActiveNavLink() {
    // Obtenir le chemin de la page actuelle
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Sélectionner tous les liens de navigation
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Retirer la classe 'active' de tous les liens
    navLinks.forEach(link => {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
    });
    
    // Ajouter la classe 'active' au lien correspondant à la page actuelle
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
}

// Applique le style "actif" au chargement et lors des changements de hash
document.addEventListener('DOMContentLoaded', setActiveNavLink);
window.addEventListener('hashchange', setActiveNavLink);
 //loadComponent('footer.html', 'footer');
// Fonction pour ajouter un fond au header lors du défilement

document.addEventListener('DOMContentLoaded', function() {
    // Éléments et variables
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('#navbar .nav-link');
    const sections = document.querySelectorAll('section');
    const navHeight = navbar.getBoundingClientRect().height;
    
    // Fonction pour fixer la navbar lors du défilement
    function fixNavbar() {
      if (window.scrollY > 100) {
        navbar.classList.add('fixed-top');
        document.body.classList.add('has-fixed-nav');
      } else {
        navbar.classList.remove('fixed-top');
        document.body.classList.remove('has-fixed-nav');
      }
    }
    
    // Fonction pour le scrollspy (mettre en surbrillance l'élément actif)
    function scrollSpy() {
        const scrollY = window.pageYOffset;
      
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            // Vérifie si nous sommes dans cette section (avec une marge de tolérance)
            if (scrollY >= sectionTop - navHeight - 50 && scrollY < sectionTop + sectionHeight - navHeight) {
              // Retire la classe active de tous les liens
              navLinks.forEach(link => link.classList.remove('active'));
              
              // Ajoute la classe active au lien correspondant
              const activeLink = document.querySelector(`#navbar .nav-link[href="#${sectionId}"]`);
              if (activeLink) {
                activeLink.classList.add('active');
              }
            }
          });
    }
    
    // Gestion du défilement fluide vers les sections
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
          top: targetSection.offsetTop - navHeight,
          behavior: 'smooth'
        });
      });
    });
    
    // Attacher les écouteurs d'événements
    window.addEventListener('scroll', fixNavbar);
    window.addEventListener('scroll', scrollSpy);
    
    // Initialiser l'état de la navbar
    fixNavbar();
    scrollSpy();
  });
