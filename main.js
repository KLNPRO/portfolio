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
    
    // Fonction pour fixer la navbar lors du défilement (si tu veux garder cette fonctionnalité)
    function fixNavbar() {
      if (window.scrollY > 100) {
        navbar.classList.add('fixed-top');
        document.body.classList.add('has-fixed-nav');
      } else {
        navbar.classList.remove('fixed-top');
        document.body.classList.remove('has-fixed-nav');
      }
    }
    
    // Défilement fluide pour les liens de navigation
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Enregistrer l'événement pour fixer la navbar (seulement si tu veux garder cette fonctionnalité)
    window.addEventListener('scroll', fixNavbar);
    
    // Initialiser la fonction au chargement de la page
    fixNavbar();
  });