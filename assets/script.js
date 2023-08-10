let slideNumber = 1;

const slides = [
	{
		"image":"slide1.jpg",
		"tagLine":"Impressions tous formats <span>en boutique et en ligne</span>"
	},
	{
		"image":"slide2.jpg",
		"tagLine":"Tirages haute définition grand format <span>pour vos bureaux et events</span>"
	},
	{
		"image":"slide3.jpg",
		"tagLine":"Grand choix de couleurs <span>de CMJN aux pantones</span>"
	},
	{
		"image":"slide4.png",
		"tagLine":"Autocollants <span>avec découpe laser sur mesure</span>"
	}
]

// Attendre le chargement de la page
document.addEventListener('DOMContentLoaded', function () {

	// On appelle la fonction qui va générer les points en bas du slider
	generateDots();

	// On affiche l'image n°1 (car variable définis de base à 1)
	displaySlide(slideNumber);

	// On récupère toutes les flèches (la gauche et la droite) grâce à leur classe en commun
	const arrows = document.querySelectorAll('.arrow');

	// Une fois les éléments récupérés ont leur ajoute l'EventListener de click
	// pour l'execution de notre fonction.
	arrows.forEach(function (elem) {
		elem.addEventListener('click', () => {
			changeSlide(elem);
		});
	});
});

// Fonction executée lors du clique sur une flèche
function changeSlide(elem) {

	// Pour savoir quelle flèche c'est on regarde dans la liste de ces classes
	// si elle contient arrow_left, si oui c'est forcément la flèche de gauche
	// sinon la flèche de droite
	if (elem.classList.contains('arrow_left')) {

		console.log('Clique sur la flèche de gauche.')

		// Si on est pas sur la première slide on affiche la slide précédente
		// sinon on affiche la dernière.
		if (slideNumber > 1) {

			slideNumber--;

		} else {

			slideNumber = slides.length;

		}

	} else {

		console.log('Clique sur la flèche de droite.')

		// Si on est pas sur la dernière slide on affiche la slide suivante
		// sinon on affiche la première.
		if (slideNumber < slides.length) {

			slideNumber++;

		} else {

			slideNumber = 1;

		}

	}

	// Affichage de la nouvelle slide.
	displaySlide(slideNumber);

}

// Fonction qui sert à générer les points sur le slider
function generateDots() {

	// On compte le nombre de slide du tableau
	const slideCount = slides.length;

	// On récupère le container pour les points
	const container = document.getElementById('dotsContainer');

	// On affiche autant de points que de slides disponibles dans le tableau
	for (let i = 0; i < slideCount; i++) {

		const html = '<div class="dot"></div>';

		// On ajoute le code HTML du point au container
		container.innerHTML += html;

	}
}

// Fonction permettant l'affichage des slides
function displaySlide(slideNumber) {

	// Comme les tableaux débutent pas à 1 mais à 0 il faut enlever 1 au numéro de la slide
	// pour avoir les données correspondantes
	const imageNumber = slideNumber - 1;

	// On récupère les données dans le tableau slides
	const data = slides[imageNumber];

	// Ici on récupère le container pour le texte et pour l'image
	const taglineContainer = document.getElementById('tagline');
	const bannerContainer= document.querySelector('.banner-img');

	// On modifie dynamiquement le texte grâce aux données récupérées dans le tableau
	taglineContainer.innerHTML = data['tagLine'];

	// On modifie dynamiquement la source (champ src) de l'image grâce aux données récupérées dans le tableau
	bannerContainer.src = "./assets/images/slideshow/" + data['image'];

	// On récupère ici tous les points générés en bas du slider
	const allDots = document.querySelectorAll('.dot');

	// Puis on boucle sur chacun
	allDots.forEach(function (elem, index) {

		// Pour enlever la class selected si ce n'est plus la bonne slide d'affichée
		// ou, à l'inverse, lui ajouter la class.
		// Pour savoir si c'est la bonne slide, on regarde la position du point dans le code
		// HTML (le premier point correspond à la première slide) et on compare cette
		// position au numéro de l'image en cours d'affichage.
		if (elem.classList.contains('dot_selected') && (index !== imageNumber)) {

			elem.classList.remove('dot_selected');

		} else if (!elem.classList.contains('dot_selected') && (index === imageNumber)) {

			elem.classList.add('dot_selected');

		}

	});
}