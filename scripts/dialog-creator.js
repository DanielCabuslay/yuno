function createDialog(id, id_data) {

	//create aside tag
	var dialog = document.createElement('aside');

	dialogId = id + '-dialog';
	dialog.id = dialogId;
	dialog.className += 'mdc-dialog phone-dialog';

	var role = document.createAttribute('role');
	role.value = 'alertdialog';

	var ariaHidden = document.createAttribute('aria-hidden');
	ariaHidden.value = 'true';

	var ariaLabelledBy = document.createAttribute('aria-labelledby');
	ariaLabelledBy.value = 'mdc-dialog-default-label';

	var ariaDescribedBy = document.createAttribute('aria-describedby');
	ariaDescribedBy.value = 'mdc-dialog-default-description';

	dialog.setAttributeNode(role);
	dialog.setAttributeNode(ariaHidden);
	dialog.setAttributeNode(ariaLabelledBy);
	dialog.setAttributeNode(ariaDescribedBy);

	//create div tag
	var div = document.createElement('div');
	div.className += 'mdc-dialog__surface';

	//create header tag
	var header = document.createElement('header');
	header.className += 'mdc-dialog__header phone-dialog-header';

	//create header title
	var titleElement = document.createElement('h2');
	titleElement.className += 'mdc-typography--title';
	var title = document.createTextNode(id_data['name']);
	titleElement.appendChild(title);

	//create section tag
	var section = document.createElement('section');
	section.className += 'mdc-dialog__body mdc-dialog__body--scrollable phone-dialog-body';

	var specTitleDiv = document.createElement('div');
	specTitleDiv.className += 'phone-dialog-specs-row';

	var specTitle = document.createElement('div');
	specTitle.className += 'phone-dialog-specs-title phone-dialog-subheader mdc-typography--title';

	var title = document.createTextNode('Specs');
	specTitle.appendChild(title);
	specTitleDiv.appendChild(specTitle);

	// create notes section
	var notesDiv = document.createElement('div');
	notesDiv.className += 'phone-dialog-specs-row';

	var notesTitleDiv = document.createElement('div');
	notesTitleDiv.className += 'phone-dialog-specs-title-purchase phone-dialog-subheader mdc-typography--title';

	var notesTitle = document.createTextNode('Daniel\'s Notes');
	notesTitleDiv.appendChild(notesTitle);

	var notes = document.createElement('div');
	var notesText = document.createTextNode(id_data['notes']);

	notes.appendChild(notesText);
	notesDiv.appendChild(notesTitleDiv);
	notesDiv.appendChild(notes);

	//create footer tag
	var footer = document.createElement('footer');
	footer.className += 'mdc-dialog__footer';

	var footerButton = document.createElement('button');
	footerButton.className += 'mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--cancel';

	var footerButtonType = document.createAttribute('type');
	footerButtonType.value = 'button';

	var footerButtonLabel = document.createTextNode('Close');
	footerButton.setAttributeNode(footerButtonType);
	footerButton.appendChild(footerButtonLabel);

	footer.appendChild(footerButton);

	document.getElementsByClassName('demo-main')[0].appendChild(dialog).appendChild(div).appendChild(header).appendChild(titleElement);
	div.appendChild(section);
	createPurchaseRow(section, id_data);
	section.appendChild(specTitleDiv);
	createSpecsRow(section, id_data);
	section.appendChild(notesDiv);
	div.appendChild(footer);
}

function createPurchaseRow(section, id_data) {
	var vendors = 3; // change when vendors are added to spreadsheet

	//create Purchase section
	var purchaseDiv = document.createElement('div');
	purchaseDiv.className += 'phone-dialog-specs-row';

	//create purchase title
	var purchaseTitleDiv = document.createElement('div');
	purchaseTitleDiv.className += 'phone-dialog-specs-title-purchase phone-dialog-subheader mdc-typography--title';
 
	var purchaseTitle = document.createTextNode('Purchase Links');
	purchaseTitleDiv.appendChild(purchaseTitle);

	purchaseDiv.appendChild(purchaseTitleDiv);

	section.appendChild(purchaseDiv);

	if (id_data['price1'] != null) {
		for (i = 0; i < vendors; i++) {
			var csvVendor = 'vendor' + (i + 1);
			var csvLink = 'link' + (i + 1);
			var csvPrice = 'price' + (i + 1);
			var csvSale = 'sale' + (i + 1);

			if (id_data[csvVendor] != null) {
				//create Purchase section
				var purchaseButtonsRowDiv = document.createElement('div');
				purchaseButtonsRowDiv.className += 'phone-dialog-specs-row';

				// create purchase button
				var purchaseButtonsDiv = document.createElement('div');
				purchaseButtonsDiv.className += 'phone-dialog-specs-purchase-buttons';

				var purchaseButtons = document.createElement('a');
				purchaseButtons.className += 'mdc-button mdc-button--raised purchase-button ' + id_data[csvVendor] + '-store-button';

				var target = document.createAttribute('target');
				target.value = '_blank';

				var href = document.createAttribute('href');
				href.value = id_data[csvLink];

				purchaseButtons.setAttributeNode(target);
				purchaseButtons.setAttributeNode(href);

				var purchasePrice = document.createElement('div');
				purchasePrice.className += 'phone-dialog-specs-spec';

				var priceString = 'From $' + id_data[csvPrice];
				if (id_data[csvSale] != null) {
					priceString += "*";
				}
				var price = document.createTextNode(priceString);
				purchasePrice.appendChild(price);

				purchaseButtonsDiv.appendChild(purchaseButtons);
				purchaseButtonsRowDiv.appendChild(purchaseButtonsDiv);
				purchaseButtonsRowDiv.appendChild(purchasePrice);

				section.appendChild(purchaseButtonsRowDiv);
			}
		}
	} else { // no listings
		var purchaseButtonsRowDiv = document.createElement('div');
		purchaseButtonsRowDiv.className += 'phone-dialog-specs-row';
		var noListingsDiv = document.createElement('div');
		noListingsDiv.className += 'phone-dialog-specs-spec';
		var noListingsText = document.createTextNode('No listings.');
		noListingsDiv.appendChild(noListingsText);
		purchaseButtonsRowDiv.appendChild(noListingsDiv);
		section.appendChild(purchaseButtonsRowDiv);
	}
}

function createSpecsRow(section, id_data) {
	var specs = ['Release', 'Processor', 'RAM', 'Storage', 'Battery', 'Fast Charging', 'Display', 'Main Camera', 'Secondary Camera', 'Front Camera', 'Water Resistance'];
	var storageSizes = ['16', '32', '64', '128', '256'];
	var specsDivs = [];
	$.each(specs, function(ind, specTitle) {
		//create spec div
		var specRowDiv = document.createElement('div');
		specRowDiv.className += 'phone-dialog-specs-row';

		//create spec title div
		var specRowTitle = document.createElement('div');
		specRowTitle.className += 'phone-dialog-specs-title mdc-typography--body2';

		var title = document.createTextNode(specTitle);
		specRowTitle.appendChild(title);

		//create spec data div
		var dataDiv = document.createElement('div');
		dataDiv.className += 'phone-dialog-specs-spec';

		var data;

		switch(specTitle) {
			case 'Release':
				data = id_data['release'];
				addToSpecRow(specRowDiv, specRowTitle, dataDiv, data);
				break;
			case 'Processor':
				data = id_data['processor'];
				addToSpecRow(specRowDiv, specRowTitle, dataDiv, data);
				break;
			case 'RAM':
				data = id_data['ram'] + ' GB';
				addToSpecRow(specRowDiv, specRowTitle, dataDiv, data);
				break;
			case 'Storage':
				var data = [];
				$.each(storageSizes, function(i, size) {
					if (id_data[size + 'gb'] == 'Y') {
						data.push(size + ' GB');
					}
				});
				if (id_data['expandable'] == 'Y') {
					data.push('Expandable via microSD card');
				}
				if (data.length == 1) {
					addToSpecRow(specRowDiv, specRowTitle, dataDiv, data[0]);
				} else {
					addToSpecRowWithBreaks(specRowDiv, specRowTitle, dataDiv, data);
				}
				
				break;
			case 'Battery':
				data = id_data['battery'] + ' mAh';
				addToSpecRow(specRowDiv, specRowTitle, dataDiv, data);
				break;
			case 'Fast Charging':
				if (id_data['fast_charging'] != null) {
					data = id_data['fast_charging'];
					addToSpecRow(specRowDiv, specRowTitle, dataDiv, data);
				}
				break;
			case 'Display':
				var size = id_data['display_size'] + ' inches';
				var res = id_data['display_res'];
				var type = id_data['display_type'];
				data = [size, res, type];
				addToSpecRowWithBreaks(specRowDiv, specRowTitle, dataDiv, data);
				break;
			case 'Main Camera':
				var res = id_data['camera_res'] + ' MP';
				data = [res];
				if (id_data['camera_aperture'] != null) {
					var aperture = 'f/' + id_data['camera_aperture'];
					if(id_data['camera_aperture'] % 1 == 0) {
						aperture += '.0';
					}
					data.push(aperture);
				}

				if (id_data['camera_stabilization'] == 'O') {
					data.push('Optical Image Stabilization');
				} else if (id_data['camera_stabilization'] == 'E') {
					data.push('Electronic Image Stabilization');
				}

				if (id_data['camera_af'].includes('L')) {
					data.push('Laser autofocus');
				}
				if (id_data['camera_af'].includes('P')) {
					data.push('Phase detection autofocus');
				}
				if (id_data['dual_flash'] != null) {
					data.push('Dual tone flash');
				}
				addToSpecRowWithBreaks(specRowDiv, specRowTitle, dataDiv, data);
				break;
			case 'Secondary Camera':
				if (id_data['camera2_res'] != null || id_data['camera2_aperture'] != null) {
					if (id_data['camera2_res'] != null) {
						var res = id_data['camera2_res'] + ' MP';
						data = [res]
					} 
					if (id_data['camera2_aperture'] != null) {
						var aperture = 'f/' + id_data['camera2_aperture'];
						if(id_data['camera2_aperture'] % 1 == 0) {
							aperture += '.0';
						}
						data.push(aperture);
					}
					data.push(id_data['camera2_type']);
					addToSpecRowWithBreaks(specRowDiv, specRowTitle, dataDiv, data);
				}
				break;
			case 'Front Camera':
				var res = id_data['camera_f_res'] + ' MP';
				data = [res];
				if (id_data['camera_f_aperture'] != null) {
					var aperture = 'f/' + id_data['camera_f_aperture'];
					if(id_data['camera_f_aperture'] % 1 == 0) {
						aperture += '.0';
					}
					data.push(aperture);
				}
				addToSpecRowWithBreaks(specRowDiv, specRowTitle, dataDiv, data);
				break;
			case 'Water Resistance':
				if (id_data['water'] != null) {
					data = 'IP' + id_data['water'];
					if (id_data['water'] == '53') {
						data += "**";
					}
					addToSpecRow(specRowDiv, specRowTitle, dataDiv, data);
				}
				break;
			default:
				break;
		}
		section.appendChild(specRowDiv);
	});
	
}

function addToSpecRow(specRowDiv, specRowTitle, dataDiv, data) {
	var specData = document.createTextNode(data);
	dataDiv.appendChild(specData);
	specRowDiv.appendChild(specRowTitle);
	specRowDiv.appendChild(dataDiv);
}

function addToSpecRowWithBreaks(specRowDiv, specRowTitle, dataDiv, data) {
	$.each(data, function(ind, spec) {
		var specData = document.createTextNode(spec);
		dataDiv.appendChild(specData);
		if (ind + 1 != data.length) {
			var br = document.createElement('br');
			dataDiv.appendChild(br);
		}
	});
	specRowDiv.appendChild(specRowTitle);
	specRowDiv.appendChild(dataDiv);
}
