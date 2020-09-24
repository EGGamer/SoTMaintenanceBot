// eslint-disable-next-line no-unused-vars
const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/Command.js');
const config = require('../../../config.json');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Test command.',
			category: 'Utilidades',
			usage: '<args>'
		});
	}

	// eslint-disable-next-line consistent-return
	async run(message) {
		if (this.client.owners.includes(message.author.id)) {
			message.channel.send(`El estado actual del mantenimiento es: ${config.maintenanceStatus.toUpperCase()}.`);
		}
	}

};
