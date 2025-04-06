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

    //nouveau 
    const iconsRow = document.querySelector('.icons-row');
    const leftControl = document.querySelector('.left-control');
    const rightControl = document.querySelector('.right-control');
    const allSkills = document.querySelectorAll('.cercle');
    const skillDescriptionContainer = document.querySelector('.skill-description');
    //fin nouveau

    //nouveau2
 // Descriptions des compétences
  const skillDescriptions = {
    html: {
      title: "HTML5",
      description: "Language de balisage utilisé pour la création et la structure des pages web."
    },
    css: {
      title: "CSS3",
      description: "Language de style utilisé pour la mise en forme et la présentation des pages web."
    },
    js: {
      title: "JavaScript",
      description: "Language de programmation qui permet d'implémenter des fonctionnalités complexes sur les pages web."
    },
    php: {
      title: "PHP",
      description: "Language de programmation côté serveur, principalement utilisé pour le développement web dynamique."
    },
    python: {
      title: "Python",
      description: "Language de programmation polyvalent utilisé pour le développement web, l'analyse de données, et l'IA."
    },
    mysql: {
      title: "MySQL",
      description: "Système de gestion de base de données relationnelle open-source."
    },
    github: {
      title: "GitHub",
      description: "Plateforme de développement collaboratif pour héberger et réviser du code."
    },
    kotlin: {
      title: "Kotlin",
      description: "Language de programmation moderne pour le développement d'applications Android."
    }
    
  };
  //fin nouveau2
   //nouveau 3
  // Définir la compétence active initiale (celle du milieu)
  let currentIndex = 0;
  const totalSkills = allSkills.length;
  const visibleSkills = 5; // Nombre de compétences visibles à la fois
  //fin nouveau 3

  //nouveau 4
   // Cloner les éléments pour le défilement infini
   function setupInfiniteScroll() {
    // Cloner les premiers et derniers éléments pour créer l'illusion d'un défilement infini
    const skillsToClone = Array.from(allSkills);
    
    // Ajouter les clones à la fin
    skillsToClone.forEach(skill => {
      const clone = skill.cloneNode(true);
      iconsRow.appendChild(clone);
    });

    //fin nouveau 4

    //nouveau 5
      // Ajouter les clones au début (dans l'ordre inverse)
      skillsToClone.reverse().forEach(skill => {
        const clone = skill.cloneNode(true);
        iconsRow.insertBefore(clone, iconsRow.firstChild);
      });

      //fin nouveau 5

      //nouveau 6
      updateSkillsReference();
      //fin nouveau 6

      //fait parti de nouveau 4
    }
    //fin de parti de nouveau 4

    // nouveau 7
    function updateSkillsReference() {
      const allSkillsUpdated = document.querySelectorAll('.cercle');
      
      // Positionnement initial
      positionCarousel(totalSkills);
      
      // Définir l'élément actif initial
      setActiveSkill(totalSkills);
      
      // Ajouter un événement de clic à toutes les compétences
      allSkillsUpdated.forEach((skill, index) => {
        skill.addEventListener('click', () => {
          const diff = index - (currentIndex + totalSkills);
          moveCarousel(diff);
        });
      });
    }
    //fin de nouveau 7

    //nouveau 8

    // Positionner le carrousel initialement
  function positionCarousel(position) {
    iconsRow.style.transform = `translateX(calc(-${position * 72}px + 50% - 36px))`;
  }
  // Vous pouvez également ajouter une fonction d'auto-défilement puisque nous supprimons les contrôles
//function setupAutoScroll() {
  // Défilement automatique toutes les 3 secondes
  //setInterval(() => {
    //moveCarousel(1); // Avance d'une position
  //}, 3000);
//}
  
  // Définir la compétence active et mettre à jour la description
  function setActiveSkill(position) {
    const allSkillsUpdated = document.querySelectorAll('.cercle');
    
    // Retirer la classe active de toutes les compétences
    allSkillsUpdated.forEach(skill => skill.classList.remove('active'));
    
    // Ajouter la classe active à la compétence du milieu
    const activeSkill = allSkillsUpdated[position];
    activeSkill.classList.add('active');
    
    // Mettre à jour la description
    updateDescription(activeSkill.getAttribute('data-skill'));
  }

  //fin de nouveau 8

    //nouveau 9
   // Mettre à jour la description en fonction de la compétence active
   function updateDescription(skillType) {
    if (skillDescriptionContainer && skillDescriptions[skillType]) {
      skillDescriptionContainer.innerHTML = `
        <p class="text-lg">${skillDescriptions[skillType].title}</p>
        <p class="text-sm">${skillDescriptions[skillType].description}</p>
      `;
      
      // Animer le changement de description
      skillDescriptionContainer.classList.add('fade-in');
      setTimeout(() => {
        skillDescriptionContainer.classList.remove('fade-in');
      }, 500);
    }
  }
  //fin de nouveau 9

   // nouveau 10

  // Déplacer le carrousel
  function moveCarousel(steps) {
    currentIndex += steps;
    
    // Animation pour une transition fluide
    iconsRow.style.transition = 'transform 0.4s ease-in-out';
    positionCarousel(currentIndex + totalSkills);
    setActiveSkill(currentIndex + totalSkills);
    
    // Vérifier si nous devons réinitialiser la position sans animation
    if (currentIndex < -totalSkills + 2 || currentIndex > totalSkills - 3) {
      setTimeout(() => {
        // Réinitialiser la position sans animation
        iconsRow.style.transition = 'none';
        currentIndex = currentIndex < 0 ? currentIndex + totalSkills : currentIndex - totalSkills;
        positionCarousel(currentIndex + totalSkills);
      }, 400);
    }
  }
  //fin de nouveau 10 
  //nouveau 11
   // Initialiser
   setupInfiniteScroll();
  
   // Écouteurs d'événements pour les contrôles
   leftControl.addEventListener('click', () => moveCarousel(-1));
   rightControl.addEventListener('click', () => moveCarousel(1));
    // Fonction pour fixer la navbar lors du défilement
    //fin de nouveau 11

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
