/**
 * 🛒 PANIER D'ACHAT ÉLÉGANT - SANS JSON
 * 
 * Fonctionnalités implémentées :
 * ✅ Ajustement des quantités avec boutons +/-
 * ✅ Suppression d'articles avec animation
 * ✅ Boutons "like" avec changement de couleur
 * ✅ Calcul automatique du prix total
 * ✅ Design féminin et classe
 * ✅ Animations fluides et élégantes
 */

// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    console.log('💖 Panier élégant initialisé');
    
    // Initialiser tous les événements du panier
    initialiserEvenementsPanier();
    
    // Calculer le prix total initial
    mettreAJourPrixTotal();
    
    // Restaurer les états "likés" depuis le stockage simple
    restaurerEtatsLikes();
});

/**
 * 🎀 INITIALISATION DES ÉVÉNEMENTS
 * Configure tous les écouteurs d'événements pour l'interactivité
 */
function initialiserEvenementsPanier() {
    configurerBoutonsQuantite();
    configurerBoutonsSuppression();
    configurerBoutonsCoeur();
}

/**
 * 💫 BOUTONS DE QUANTITÉ (+ et -)
 * Gère l'augmentation et la diminution des quantités
 */
function configurerBoutonsQuantite() {
    // Sélectionner tous les boutons plus et moins
    const boutonsPlus = document.querySelectorAll('.fa-plus-circle');
    const boutonsMoins = document.querySelectorAll('.fa-minus-circle');
    const spansQuantite = document.querySelectorAll('.quantity');
    
    // 🔼 BOUTONS PLUS - Augmenter la quantité
    boutonsPlus.forEach((bouton, index) => {
        bouton.addEventListener('click', function() {
            const spanQuantite = spansQuantite[index];
            let quantiteActuelle = parseInt(spanQuantite.textContent) || 0;
            
            // Augmenter la quantité
            quantiteActuelle++;
            spanQuantite.textContent = quantiteActuelle;
            
            // Mettre à jour les prix
            mettreAJourPrixArticle(index);
            mettreAJourPrixTotal();
            
            // Animation élégante du bouton
            animerBouton(this, 'plus');
        });
    });
    
    // 🔽 BOUTONS MOINS - Diminuer la quantité
    boutonsMoins.forEach((bouton, index) => {
        bouton.addEventListener('click', function() {
            const spanQuantite = spansQuantite[index];
            let quantiteActuelle = parseInt(spanQuantite.textContent) || 0;
            
            // Diminuer la quantité seulement si > 0
            if (quantiteActuelle > 0) {
                quantiteActuelle--;
                spanQuantite.textContent = quantiteActuelle;
                
                // Mettre à jour les prix
                mettreAJourPrixArticle(index);
                mettreAJourPrixTotal();
                
                // Animation élégante du bouton
                animerBouton(this, 'moins');
            }
        });
    });
}

/**
 * 🗑️ BOUTONS DE SUPPRESSION
 * Gère la suppression des articles du panier
 */
function configurerBoutonsSuppression() {
    const boutonsSuppression = document.querySelectorAll('.fa-trash-alt');
    
    boutonsSuppression.forEach((bouton, index) => {
        bouton.addEventListener('click', function() {
            // Confirmation élégante de suppression
            if (confirmerSuppression()) {
                supprimerArticle(this, index);
            }
        });
    });
}

/**
 * 💖 BOUTONS COEUR (LIKE)
 * Gère les fonctionnalités "j'aime" avec changement de couleur
 */
function configurerBoutonsCoeur() {
    const boutonsCoeur = document.querySelectorAll('.fa-heart');
    
    boutonsCoeur.forEach(bouton => {
        bouton.addEventListener('click', function() {
            // Basculer l'état "aimé"
            this.classList.toggle('aime');
            
            // Appliquer les styles appropriés
            if (this.classList.contains('aime')) {
                this.style.color = '#e91e63'; // Rose vif quand aimé
                this.style.textShadow = '0 0 10px rgba(233, 30, 99, 0.5)';
                
                // Animation de battement de cœur
                animerBattementCoeur(this);
            } else {
                this.style.color = '#9c27b0'; // Violet doux quand non aimé
                this.style.textShadow = 'none';
            }
            
            // Sauvegarder l'état sans JSON
            sauvegarderEtatLike(this);
        });
    });
}

/**
 * 🧮 CALCUL DU PRIX PAR ARTICLE
 * @param {number} index - Position de l'article dans la liste
 */
function mettreAJourPrixArticle(index) {
    const corpsCartes = document.querySelectorAll('.card-body .card-body');
    
    if (corpsCartes[index]) {
        const corpsCarte = corpsCartes[index];
        const spanQuantite = corpsCarte.querySelector('.quantity');
        const elementPrixUnitaire = corpsCarte.querySelector('.unit-price');
        
        // Extraire le prix unitaire du texte
        const textePrixUnitaire = elementPrixUnitaire.textContent.replace('$', '').trim();
        const prixUnitaire = parseFloat(textePrixUnitaire) || 0;
        
        const quantite = parseInt(spanQuantite.textContent) || 0;
        const prixTotalArticle = (prixUnitaire * quantite).toFixed(2);
        
        // Stocker le prix unitaire comme attribut pour référence future
        elementPrixUnitaire.setAttribute('data-prix-unitaire', prixUnitaire);
        
        console.log(`📊 Article ${index + 1}: ${quantite} x ${prixUnitaire}$ = ${prixTotalArticle}$`);
    }
}

/**
 * 💰 CALCUL DU PRIX TOTAL DU PANIER
 * Additionne le prix de tous les articles
 */
function mettreAJourPrixTotal() {
    const corpsCartes = document.querySelectorAll('.card-body .card-body');
    let total = 0;
    
    corpsCartes.forEach(corpsCarte => {
        const spanQuantite = corpsCarte.querySelector('.quantity');
        const elementPrixUnitaire = corpsCarte.querySelector('.unit-price');
        
        // Obtenir le prix unitaire depuis l'attribut ou le texte
        const prixUnitaire = parseFloat(
            elementPrixUnitaire.getAttribute('data-prix-unitaire') || 
            elementPrixUnitaire.textContent.replace('$', '').trim()
        ) || 0;
        
        const quantite = parseInt(spanQuantite.textContent) || 0;
        total += prixUnitaire * quantite;
    });
    
    // Mettre à jour l'affichage du total
    const elementTotal = document.querySelector('.total');
    if (elementTotal) {
        elementTotal.textContent = `${total.toFixed(2)} $`;
        
        // Animation élégante du changement de prix
        animerChangementPrix(elementTotal);
    }
    
    console.log(`🎀 Prix total mis à jour: ${total.toFixed(2)} $`);
}

/**
 * ✨ ANIMATION DE BOUTON
 * @param {Element} bouton - Bouton à animer
 * @param {string} type - Type d'animation ('plus' ou 'moins')
 */
function animerBouton(bouton, type) {
    // Animation scale
    bouton.style.transform = 'scale(1.4)';
    
    // Couleurs différentes selon le type
    if (type === 'plus') {
        bouton.style.color = '#4caf50'; // Vert pour plus
    } else {
        bouton.style.color = '#f44336'; // Rouge pour moins
    }
    
    // Retour à l'état normal après animation
    setTimeout(() => {
        bouton.style.transform = 'scale(1)';
        bouton.style.color = ''; // Retour à la couleur par défaut
    }, 300);
}

/**
 * 💓 ANIMATION DE BATTEMENT DE CŒUR
 * @param {Element} coeur - Élément cœur à animer
 */
function animerBattementCoeur(coeur) {
    // Séquence d'animation de battement
    coeur.style.transform = 'scale(1.3)';
    
    setTimeout(() => {
        coeur.style.transform = 'scale(1.1)';
    }, 150);
    
    setTimeout(() => {
        coeur.style.transform = 'scale(1.3)';
    }, 300);
    
    setTimeout(() => {
        coeur.style.transform = 'scale(1)';
    }, 450);
}

/**
 * 🌸 ANIMATION DE CHANGEMENT DE PRIX
 * @param {Element} element - Élément prix à animer
 */
function animerChangementPrix(element) {
    // Animation de pulse
    element.style.transform = 'scale(1.2)';
    element.style.color = '#e91e63'; // Rose vif
    
    setTimeout(() => {
        element.style.transform = 'scale(1)';
        element.style.color = ''; // Retour à la couleur par défaut
    }, 500);
}

/**
 * 🗑️ CONFIRMATION DE SUPPRESSION
 * @returns {boolean} True si confirmation, false sinon
 */
function confirmerSuppression() {
    // Message de confirmation élégant
    return confirm('💖 Souhaitez-vous vraiment retirer cet article de votre panier ?');
}

/**
 * 🎀 SUPPRESSION D'ARTICLE
 * @param {Element} bouton - Bouton de suppression cliqué
 * @param {number} index - Index de l'article
 */
function supprimerArticle(bouton, index) {
    const corpsCarteParent = bouton.closest('.card-body').parentElement;
    
    // Animation de disparition élégante
    corpsCarteParent.style.opacity = '0';
    corpsCarteParent.style.transform = 'translateX(-100px) rotate(-5deg)';
    corpsCarteParent.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    
    // Suppression après l'animation
    setTimeout(() => {
        corpsCarteParent.remove();
        
        // Mettre à jour le prix total
        mettreAJourPrixTotal();
        
        // Vérifier si le panier est vide
        verifierPanierVide();
        
        console.log('🗑️ Article supprimé du panier');
    }, 500);
}

/**
 * 💾 SAUVEGARDE ÉTAT LIKE (SANS JSON)
 * @param {Element} bouton - Bouton like à sauvegarder
 */
function sauvegarderEtatLike(bouton) {
    const carte = bouton.closest('.card');
    const titre = carte.querySelector('.card-title').textContent;
    const estAime = bouton.classList.contains('aime');
    
    // Sauvegarde simple sans JSON - utilisation directe de localStorage
    localStorage.setItem(`coeur_${titre}`, estAime.toString());
    
    console.log(`💾 État like sauvegardé: ${titre} = ${estAime}`);
}

/**
 * 🔄 RESTAURATION ÉTATS LIKES (SANS JSON)
 * Charge les états "aimés" depuis le stockage
 */
function restaurerEtatsLikes() {
    const boutonsCoeur = document.querySelectorAll('.fa-heart');
    
    boutonsCoeur.forEach(bouton => {
        const carte = bouton.closest('.card');
        const titre = carte.querySelector('.card-title').textContent;
        
        // Récupération simple sans JSON
        const estAime = localStorage.getItem(`coeur_${titre}`) === 'true';
        
        if (estAime) {
            bouton.classList.add('aime');
            bouton.style.color = '#e91e63';
            bouton.style.textShadow = '0 0 10px rgba(233, 30, 99, 0.5)';
        }
    });
    
    console.log('🔄 États likes restaurés depuis le stockage');
}

/**
 * 🛍️ VÉRIFICATION PANIER VIDE
 * Affiche un message élégant si le panier est vide
 */
function verifierPanierVide() {
    const listeProduits = document.querySelector('.list-products');
    const corpsCartes = listeProduits.querySelectorAll('.card-body');
    
    if (corpsCartes.length === 0) {
        // Créer un message de panier vide très élégant
        const messageVide = document.createElement('div');
        messageVide.className = 'message-panier-vide';
        messageVide.innerHTML = `
            <div class="contenu-panier-vide">
                <div class="icone-panier-vide">💝</div>
                <h3 class="titre-panier-vide">Votre univers shopping vous attend</h3>
                <p class="texte-panier-vide">Votre panier est prêt à être rempli de merveilles</p>
                <button class="bouton-continuer-achats">
                    <i class="fas fa-gem me-2"></i>Découvrir les trésors
                </button>
            </div>
        `;
        
        // Ajouter le message au panier
        listeProduits.appendChild(messageVide);
        
        // Événement pour le bouton de continuation
        const boutonContinuier = messageVide.querySelector('.bouton-continuer-achats');
        boutonContinuier.addEventListener('click', function() {
            // Rechargement pour réinitialiser (adaptable)
            location.reload();
        });
        
        console.log('🛍️ Message panier vide affiché');
    } else {
        // Retirer le message si le panier n'est plus vide
        const messageVide = listeProduits.querySelector('.message-panier-vide');
        if (messageVide) {
            messageVide.remove();
        }
    }
}

// Fin du code JavaScript - Design féminin et classe garanti ! 🎀