function createCard(id, name, price, release, picture) {
	var card = document.createElement('div');
	card.id = id + '-card';
	// card.style.backgroundImage = 'url(' + picture + ')';
	card.className += 'demo-cell mdc-layout-grid__cell mdc-layout-grid__cell--span-2 mdc-card demo-card demo-card--bg-demo mdc-elevation-transition';

	var media = document.createElement('section');
	media.className += 'mdc-card__media card-bg';
	media.style.backgroundImage = 'url(' + picture + ')';

	card.appendChild(media);

	var section = document.createElement('section');
	section.className += 'mdc-card__primary';

	var h1 = document.createElement('h1');
	h1.className += 'mdc-card__title';
	var cardName = document.createTextNode(name);
	h1.appendChild(cardName);

	var h2 = document.createElement('h2');
	h2.className += 'mdc-card__subtitle';
	var cardPrice;
	if (price == null) {
		cardPrice = document.createTextNode(release);
	} else {
		cardPrice = document.createTextNode('$' + price);
	}
	h2.appendChild(cardPrice);

	document.getElementById('card-grid').appendChild(card).appendChild(section).appendChild(h1);
	document.getElementById('card-grid').appendChild(card).appendChild(section).appendChild(h2);
}