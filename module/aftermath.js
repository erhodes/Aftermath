//Import Modules
import { AftermathActorSheet } from "./actor-sheet.js";
import { AftermathActor } from "./actor.js";
import { AftermathItemSheet } from "./item-sheet.js";
import { AftermathItem } from "./item.js";

Hooks.once('init', async function() {
	game.aftermath = {
		AftermathActor,
		AftermathItem
	};

	console.log("oh hi");

	// Define custom Entity classes
	CONFIG.Actor.entityClass = AftermathActor;
	CONFIG.Item.entityClass = AftermathItem;

	// Register sheet application classes
	Actors.unregisterSheet("core", ActorSheet)
	Actors.registerSheet("aftermath", AftermathActorSheet, {makeDefault: true});
	Items.unregisterSheet("core", ItemSheet);
	Items.registerSheet("aftermath", AftermathItemSheet, { makeDefault: true});

});