export class AftermathItemSheet extends ItemSheet {

	/** @override */
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			classes: ["boilerplate", "sheet", "item"],
			width: 520,
			height: 480,
			tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
		});
	}

	/** @override */
	get template() {
		return "systems/aftermath/templates/item-sheet.html";
	}

	activateListeners(html) {
		super.activateListeners(html);

		console.log("activateListeners for Item");
		super.item.prepareData();
		html.find('.rollable').click(this._onRoll.bind(this));
		html.find('.action').click(this._onAction.bind(this));
	}

	_onAction(event) {
		console.log("reloading");
		super.item.performReload();
	}

	/**
	Handle clickable rolls.
	@param {Event} event The originating event
	@private
	*/
	_onRoll(event) {
		// I wrote this while figuring stuff out, but Item.attack() supercedes it.
		let data = super.getData();
		let ammo = data.data.ammo.value;
		console.log("Found ammo count", data.data.ammo.value);
		data.data.ammo.value--;
		console.log("New ammo count", data.data.ammo.value);

		super.item.update(data);

		let roll = new Roll("2d10 +5");
		let label = "Pew Pew";
		console.log(label);
		roll.roll().toMessage({
			speaker: ChatMessage.getSpeaker({actor: this.actor}),
			flavor: label
		});
	}
}