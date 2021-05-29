//Import Modules
import { AftermathActorSheet } from "./actor-sheet.js";
import { AftermathActor } from "./actor.js";

Hooks.once('init', async function() {
	game.aftermath = {
		AftermathActor
	};

	console.log("oh hi");

	// Define custom Entity classes
	CONFIG.Actor.entityClass = AftermathActor;

	// Register sheet application classes
	Actors.unregisterSheet("core", ActorSheet)
	Actors.registerSheet("aftermath", AftermathActorSheet, {makeDefault: true});

});