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

    const iconsRow = document.querySelector('.icons-row');
    const cercles = document.querySelectorAll('.cercle');
  const leftControl = document.querySelector('.left-control');
  const rightControl = document.querySelector('.right-control');
  
   
  // Position courante dans le carrousel
  let currentPosition = 0;
  
  // Nombre total d'icônes
  const totalIcons = cercles.length;
  
  // Définir la largeur des cercles et l'espacement
  const cercleWidth = 48; // Largeur approximative en pixels 
  const cercleMargin = 16; // Marge entre les cercles (8px de chaque côté)
  
  // Nombre d'icônes visibles à la fois (5 comme dans ton exemple)
  const visibleIcons = 5;
  
  // Marquer l'élément du milieu comme actif initialement
  let activeIndex = Math.floor(visibleIcons / 2);
  cercles[activeIndex].classList.add('active');
  
  // Ajuster la position initiale pour montrer les 5 premières icônes avec l'icône active au milieu
  adjustIcons();
  
  // Animer légèrement les cercles lorsqu'on passe le curseur sur l'un d'eux
  cercles.forEach((cercle, index)=> {
    cercle.addEventListener('mouseenter', function() {
      // Mettre en valeur le cercle survolé
      this.style.transform = 'scale(1.15)';
      this.style.zIndex = '10';
    });
    cercle.addEventListener('click', function() {
        // Ne rien faire si l'icône est déjà active
        if (cercle.classList.contains('active')) return;
             // Mettre à jour l'index actif
            activeIndex = index;
        
        // Calculer la distance entre l'icône cliquée et l'icône active
        const activeIndex = Array.from(cercles).findIndex(el => el.classList.contains('active'));
        const distance = index - activeIndex;
        
        // Mettre à jour la position du carrousel
        currentPosition += distance;
        
        // S'assurer que la position est dans les limites
        if (currentPosition < 0) currentPosition = 0;
        if (currentPosition > totalIcons - visibleIcons) currentPosition = totalIcons - visibleIcons;
        
        // Mettre à jour l'affichage
        updateActiveIcon(index);
        adjustIcons();
      });
    
    cercle.addEventListener('mouseleave', function() {
      // Retour à l'état initial
      this.style.transform = '';
      this.style.zIndex = '';
    });
  });

leftControl.addEventListener('click', function() {
    navigateCarousel(-1);
  });
  
  rightControl.addEventListener('click', function() {
    navigateCarousel(1);
  });


   // Fonction pour naviguer dans le carrousel (1 = droite, -1 = gauche)
   function navigateCarousel(direction) {
    // Mise à jour de l'index actif avec défilement circulaire
    activeIndex = (activeIndex + direction + totalIcons) % totalIcons;
    
    // Mettre à jour l'affichage
    updateActiveIcon(activeIndex);
    adjustIcons();
  }


// Fonction pour mettre à jour l'icône active
function updateActiveIcon(newActiveIndex) {
    // Retirer la classe active de tous les cercles
    cercles.forEach(c => c.classList.remove('active'));
    
    // Ajouter la classe active au nouveau cercle actif
    cercles[newActiveIndex].classList.add('active');
  }

  function adjustIcons() {
    const sideCount = Math.floor(visibleIcons / 2);
    let displayOrder = [];
    for (let i = 0; i < sideCount + 1; i++) {
        let index = (activeIndex + i) % totalIcons;
        displayOrder.push(index);
      }
      for (let i = 1; i <= sideCount; i++) {
        let index = (activeIndex - i + totalIcons) % totalIcons;
        displayOrder.unshift(index);
      }


    // Trouver l'index de l'icône active
    const activeIndex = Array.from(cercles).findIndex(el => el.classList.contains('active'));
    
    // Calculer la position pour centrer l'icône active
    const activePosition = activeIndex - Math.floor(visibleIcons / 2);
    
    // Ajuster la position si nécessaire
    if (activePosition >= 0 && activePosition + visibleIcons <= totalIcons) {
      currentPosition = activePosition;
    } else if (activePosition < 0) {
      currentPosition = 0;
    } else {
      currentPosition = totalIcons - visibleIcons;
    }


    function updateControlsVisibility() {
        // Afficher/masquer le contrôle gauche
        if (currentPosition <= 0) {
          leftControl.style.opacity = '0.5';
          leftControl.style.pointerEvents = 'none';
        } else {
          leftControl.style.opacity = '1';
          leftControl.style.pointerEvents = 'auto';
        }
        
        // Afficher/masquer le contrôle droit
        if (currentPosition >= totalIcons - visibleIcons) {
          rightControl.style.opacity = '0.5';
          rightControl.style.pointerEvents = 'none';
        } else {
          rightControl.style.opacity = '1';
          rightControl.style.pointerEvents = 'auto';
        }
      }

      function updateSkillInfo(skillName) {
        // Ajoute des informations sur la compétence sélectionnée si nécessaire
        console.log('Compétence sélectionnée:', skillName);
      }
      
      // Initialiser l'affichage
      updateControlsVisibility();
    
    // Appliquer la transformation pour positionner les icônes
    const translateX = -currentPosition * (cercleWidth + cercleMargin);
    iconsRow.style.transform = `translateX(${translateX}px)`;
    
    // Mettre à jour la visibilité des contrôles de navigation
    updateControlsVisibility();
  }

  // Effet d'animation légère pour les cercles au chargement
  cercles.forEach((cercle, index) => {
    const displayIndex = displayOrder.indexOf(index);
    setTimeout(() => {
      cercle.style.transform = 'scale(1.08)';
      setTimeout(() => {
        cercle.style.transform = '';
      }, 300);
    }, index * 150);
    if (displayIndex !== -1) {
        // L'icône est visible dans la vue actuelle
        const offset = (displayIndex - sideCount) * (cercleWidth + cercleMargin);
        cercle.style.transform = `translateX(${offset}px)`;
        cercle.style.opacity = '1';
        cercle.style.pointerEvents = 'auto';
      } else {
        // L'icône est hors de la vue - la cacher
        cercle.style.opacity = '0';
        cercle.style.pointerEvents = 'none';
        
        // Positionner d'un côté ou de l'autre pour préparer l'animation d'entrée
        const distanceFromActive = (index - activeIndex + totalIcons) % totalIcons;
        
        if (distanceFromActive > totalIcons / 2) {
          // Positionner à gauche (pour entrer de la gauche)
          cercle.style.transform = `translateX(${-3 * (cercleWidth + cercleMargin)}px)`;
        } else {
          // Positionner à droite (pour entrer de la droite)
          cercle.style.transform = `translateX(${3 * (cercleWidth + cercleMargin)}px)`;
        }
      }
    
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

    cercles.forEach(cercle => {
        cercle.style.transition = 'transform 0.4s ease-in-out, opacity 0.4s ease-in-out';
        cercle.style.position = 'absolute';
        cercle.style.left = '50%';
        cercle.style.transform = 'translateX(-50%)';
      });
      
      // Définir la hauteur de l'iconsRow pour maintenir la structure
      iconsRow.style.height = `${Math.max(...Array.from(cercles).map(c => c.offsetHeight))}px`;
      iconsRow.style.position = 'relative';
  });
