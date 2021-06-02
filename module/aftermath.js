//Import Modules
import { AftermathActorSheet } from "./actor-sheet.js";
import { AftermathActor } from "./actor.js";
import { AftermathItemSheet } from "./item-sheet.js";
import { AftermathItem } from "./item.js";

Hooks.once('init', async function() {
	game.aftermath = {
		AftermathActor,
		AftermathItem,
		attackMacro
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

Hooks.once("ready", async function() {
	Hooks.on("hotbarDrop", (bar, data, slot) => createAttackMacro(data, slot));
});

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {Object} data     The dropped data
 * @param {number} slot     The hotbar slot to use
 * @returns {Promise}
 */
async function createAttackMacro(data, slot) {
	console.log("createAttackMacro for ", data);
	// if (data.type !== "Item") return;
	// if (!("data" in data)) return ui.notifications.warn("You can only create macro buttons for owned items");

	// Create the macro command

	const item = game.items.find(i => (i.name === data.name));

	const command = `game.aftermath.attackMacro("${item.name}");`;
	let macro = game.macros.entities.find(m => (m.name === item.name) && (m.command === command));
	if (!macro) {
		macro = await Macro.create({
			name: data.name,
			type: "script",
			img: item.img,
			command: command,
			flags: {"aftermath.itemMacro": true }
		});
	}
	game.user.assignHotbarMacro(macro, slot);
	return false;
}

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {string} itemName
 * @return {Promise}
 */
 function attackMacro(itemName) {
 	const speaker = ChatMessage.getSpeaker();
 	let actor;
 	if (speaker.token) actor = game.actors.tokens[speaker.token];
 	if (!actor) actor = game.actors.get(speaker.actor);
 	const item = actor ? actor.items.find(i => i.name === itemName) : null;
 	if (!item) return ui.notifications.warn(`Your controlled Actor does not have an item named ${itemName}`);

 	return item.attack();
 }