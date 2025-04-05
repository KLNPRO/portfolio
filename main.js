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
    // Sélectionner les éléments nécessaires
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('#navbar .nav-link');
    const sections = document.querySelectorAll('section');
    
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
    
    // Fonction pour le scrollspy
    function handleScrollSpy() {
      // Obtenir la position actuelle de défilement avec un peu de marge
      const currentPosition = window.scrollY + 200;
      
      // Vérifier quelle section est visible
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (currentPosition >= sectionTop && currentPosition < sectionBottom) {
          // Retirer la classe active de tous les liens
          navLinks.forEach(navLink => {
            navLink.classList.remove('active');
          });
          
          // Ajouter la classe active au lien correspondant
          const correspondingLink = document.querySelector(`#navbar .nav-link[href="#${sectionId}"]`);
          if (correspondingLink) {
            correspondingLink.classList.add('active');
          }
        }
      });
    }
    
    // Défilement fluide pour les liens de navigation
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const navHeight = navbar.offsetHeight;
          const targetPosition = targetSection.offsetTop - navHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Enregistrer les événements
    window.addEventListener('scroll', fixNavbar);
    window.addEventListener('scroll', handleScrollSpy);
    
    // Initialiser les fonctions au chargement de la page
    fixNavbar();
    handleScrollSpy();
  });