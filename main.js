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

    const stoneWrappers = document.querySelectorAll('.stone-wrapper');

    const showMapLink = document.getElementById('show-map');
    if (showMapLink) {
      showMapLink.addEventListener('click', function(e) {
        e.preventDefault();
        // Le modal sera géré par Bootstrap, donc pas besoin d'autre code ici
      });
    }

     // Ajouter un gestionnaire pour les liens de contact
  const contactLinks = document.querySelectorAll('a[href^="mailto:"]');
  contactLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Laisser le comportement par défaut (ouverture du client mail)
      console.log('Ouverture du formulaire de contact email');
    });
  });
    
    // Assurez-vous que les descriptions restent visibles même si la souris se déplace légèrement
    stoneWrappers.forEach(wrapper => {
      const stone = wrapper.querySelector('.stone');
      const desc = wrapper.querySelector('.stone-description');
      
      stone.addEventListener('mouseenter', () => {
        desc.style.opacity = '1';
      });
      
      stone.addEventListener('mouseleave', () => {
        setTimeout(() => {
          if (!wrapper.matches(':hover')) {
            desc.style.opacity = '0';
          }
        }, 200);
      });
    });
    
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
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 10;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
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
