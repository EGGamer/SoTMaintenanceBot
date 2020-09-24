// eslint-disable-next-line no-unused-vars
const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/Command.js');
const config = require('../../../config.json');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['mistop'],
			description: 'Comando para avisar periódicamente de un mantenimiento.',
			category: 'Mantenimientos',
			usage: '[intervalo en segundos] [fecha] [zonaHoraria] [horaInicio] [horaFinal] <nota>'
		});
	}

	// eslint-disable-next-line consistent-return
	async run(message) {
		if (this.client.owners.includes(message.author.id)) {
			config.intervalWorking = 'no';
			message.channel.send(`Se han parado todos los mensajes programados. Para iniciar otro, ejecuta el comando de iniciar de nuevo.`);
		}
	}

};
