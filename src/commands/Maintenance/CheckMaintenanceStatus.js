// eslint-disable-next-line no-unused-vars
const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/Command.js');
const config = require('../../../config.json');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['checkMantSt'],
			description: 'Comprobar el estado actual del mantenimiento.',
			category: 'Utilidades',
			usage: '<args>'
		});
	}

	// eslint-disable-next-line consistent-return
	async run(message) {
		if (message.member.hasPermission('MANAGE_MESSAGES')) {
			message.channel.send(`El estado actual del mantenimiento es: ${config.maintenanceStatus.toUpperCase()}.`);
		}
	}

};
