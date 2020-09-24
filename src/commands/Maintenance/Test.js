// eslint-disable-next-line no-unused-vars
const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/Command.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Test command.',
			category: 'Utilidades',
			usage: '<args>'
		});
	}

	// eslint-disable-next-line consistent-return
	async run(message, args) {
		if (this.client.owners.includes(message.author.id)) {
			message.channel.send(`Argument 1: ${args[0]}, Argument 2: ${args[1]}, Argument 3: ${args[2]}`);
		}
	}

};
