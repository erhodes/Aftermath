/**
 *  An extension of the base ActorSheet with system specific modifications.
 */
export class AftermathActorSheet extends ActorSheet {

	/** @Override */
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			classes: ["aftermath", "sheet", "actor"],
			template: "systems/aftermath/templates/actor-sheet.html",
			width: 600,
			height: 600,
			tabs: [{}]
		});
	}

	/** @override */
	activateListeners(html) {
		super.activateListeners(html);

		// if (!this.options.editable) return;

		console.log("activateListeners");
		html.find('.rollable').click(this._onRoll.bind(this));
		html.find('.action').click(this._onAction.bind(this));
	}

	_onAction(event) {
		event.preventDefault();
		const element = event.currentTarget;
		const dataset = element.dataset;
		const action = dataset.action;
		const itemName = dataset.item;
		const item = this.actor.items.find(i => i.name === itemName);

		if (action == "attack") {
			item.attack();
		} else if (action == "reload") {
			item.performReload();
		}
	}

	/**
		Handle clickable rolls.
		@param {Event} event The originating event
		@private
		*/
	_onRoll(event) {
		console.log('onRoll')
		event.preventDefault();
		const element = event.currentTarget;
		const dataset = element.dataset;

		// if (dataset.roll) {
			let modifier = dataset.roll;
			console.log(modifier)
			let roll = new Roll("2d10 + @mod", {mod: modifier});
			let label = dataset.label ? `Rolling ${dataset.label}` : '';
			console.log(label);
			roll.roll().toMessage({
				speaker: ChatMessage.getSpeaker({actor: this.actor}),
				flavor: label
			});
		// }
	}
}