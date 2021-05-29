
export class AftermathActor extends Actor {
	
	// @Override
	prepareData() {
		super.prepareData();

		const actorData = this.data;

		console.log("preparingData");
		this._prepareCharacterData(actorData);
	}

	_prepareCharacterData(actorData) {
		const data = actorData.data;

		data.attributes.health.value = 2;

		console.log("test value is %d", data.skills.fitness.value)

		data.attributes.health.max = 10 + data.skills.fitness.value;
		data.attributes.resolve.max = 10 + data.skills.willpower.value;
	}
}