
export class AftermathItem extends Item {

	prepareData() {
		super.prepareData();
		// nothing really to do here yet
	}

	async attack() {
		const item = this.data;
		const actorData = this.actor ? this.actor.data.data : {};
		const itemData = item.data;

		let ammo = itemData.ammo.value;
		console.log("Found ammo count", itemData.ammo.value);
		itemData.ammo.value--;
		console.log("New ammo count", itemData.ammo.value);
		super.update(item);

		let roll = new Roll('2d10+@skills.firearms.value', actorData);
		let label = 'Rolling ${item.name}';
		roll.roll().toMessage({
			speaker: ChatMessage.getSpeaker({actor: this.actor}),
			flavor: label
		});
	}

	performReload() {
		console.log("reloading");
		// at some point, check the owning actor's inventory for bullets
		let data = this.data;
		data.data.ammo.value = data.data.ammo.max;
		super.update(data);
	}

}