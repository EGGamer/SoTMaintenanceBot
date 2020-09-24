// eslint-disable-next-line no-unused-vars
const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/Command.js');
const { maintenanceAnnouncementChannel } = require('../../../config.json');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['mst'],
			description: 'Comando para avisar de mantenimientos iniciados.',
			category: 'Mantenimientos',
			usage: '<nota>'
		});
	}

	// eslint-disable-next-line consistent-return
	async run(message, args) {
		if (this.client.owners.includes(message.author.id)) {
			const note = args.slice(0).join(' ');

			const embed = new MessageEmbed()
				.setColor('RED')
				.setTitle('MANTENIMIENTO INICIADO')
				.setThumbnail('https://imgur.com/thnBAkZ.png')
				.setDescription(`¡El mantenimiento ya ha comenzado y no se podrá jugar al juego hasta que termine. Os seguiremos informando.`)
				.setImage('https://imgur.com/UWxcGaX.jpg');

			if (args[0] !== undefined) {
				embed.addField(`Nota:`, `${note}`, false);
			}

			const announcementChannel = message.guild.channels.cache.get(maintenanceAnnouncementChannel);
			announcementChannel.send(embed);
			announcementChannel.send('@everyone');
			if (!note) {
				message.channel.send(`Se ha enviado un anuncio de mantenimiento iniciado.`);
			} else if (note) {
				message.channel.send(`Se ha enviado un anuncio de mantenimiento iniciado:\n**Nota:** ${note}`);
			}

			this.client.user.setStatus('dnd');
		}
	}


};
