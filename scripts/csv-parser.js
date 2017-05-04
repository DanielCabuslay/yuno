function fetchRecommendations(callback) {
	var temp = $.getJSON('data/phone-data.json', function(json) {
		var ids = [];
		var id_data = [];
	    $.each( json, function( id, data ) {
			ids.push(id);
			id_data.push(data);
		});
		console.log(ids);
		console.log(id_data);
		callback([ids, id_data]);
	});
}

$(document).ready(function() {
	console.log('ready');
	fetchRecommendations(function(data) {
		var ids = data[0];
		var id_data = data[1];

		$.each(ids, function(ind) {
			createCard(ids[ind], id_data[ind]['name'], id_data[ind]['price1'], id_data[ind]['release'], id_data[ind]['pic_url']);
			createDialog(ids[ind], id_data[ind]);
			console.log(ids[ind]);
			var query = '#' + ids[ind] + '-dialog';
			var cardID = '#' + ids[ind] + '-card';
			var dialog = new mdc.dialog.MDCDialog(document.querySelector(query));
			document.querySelector(cardID).addEventListener('click', function (event) {
		      dialog.show();
		    });
		    var card = document.getElementById(ids[ind] + '-card');
			card.addEventListener('mouseenter', function() {
		      this.classList.add('mdc-elevation--z8');
		    });
		    card.addEventListener('mouseleave', function() {
		      this.classList.remove('mdc-elevation--z8');
		    });
		});
	});
	(function() {
        mdc.dialog.MDCDialog.attachTo(document.querySelector('.mdc-dialog'));
        const demoWrapper = document.querySelector('.demo-body');
    });
	document.getElementById('loading').style.display = 'none';
	console.log('done');
});