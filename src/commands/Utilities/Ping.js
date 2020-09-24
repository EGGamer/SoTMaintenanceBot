const Command = require('../../structures/Command.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['lat']
		});
	}

	async run(message) {
		const msg = await message.channel.send('Pinging...');

		const latency = msg.createdTimestamp - message.createdTimestamp;
		const choices = ['¿Es este mi ping?', '¿Es ésto correcto? ¡No puedo mirar!', '¡Espero que no sea malo!'];
		const response = choices[Math.floor(Math.random() * choices.length)];

		msg.edit(`${response} - Latencia del bot: \`${latency}ms\`, Latencia de la API: \`${Math.round(this.client.ws.ping)}ms\``);
	}

};
