// eslint-disable-next-line no-unused-vars
const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/Command.js');
const { maintenanceAnnouncementChannel } = require('../../../config.json');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['ma'],
			description: 'Comando para avisar de mantenimiento.',
			category: 'Mantenimientos',
			usage: '[fecha] [zonaHoraria] [horaInicio] [horaFinal] <nota>'
		});
	}

	// eslint-disable-next-line consistent-return
	async run(message, args) {
		if (this.client.owners.includes(message.author.id)) {
			const date = args[0];
			const timeZone = args[1];
			const startHour = args[2];
			const endHour = args[3];
			const note = args.slice(4).join(' ');

			// Comprobación de argumentos
			if (!date) return message.channel.send('Debes indicar una fecha.');
			if (!timeZone) return message.channel.send('Debes indicar una zona horaria.');
			if (!startHour) return message.channel.send('Debes de indicar una hora de inicio');
			if (!endHour) return message.channel.send('Debes de indicar una hora *aproximada* de finalización');

			const embed = new MessageEmbed()
				.setColor('ORANGE')
				.setTitle('AVISO DE MANTENIMIENTO')
				.setThumbnail('https://imgur.com/DYjA5ss.png')
				.setDescription(`**¡Planead bien vuestras aventuras para este día!**`)
				.setFooter(`Aviso: La hora de finalización es una estimación, no es una hora definitiva.`, message.guild.iconURL({ dynamic: true }))
				.setImage('https://cdn.discordapp.com/attachments/580447725162856468/753525546746380318/MantProgramado.jpg')
				.addField(`Fecha:`, ` ${date}`, false)
				.addField(`Hora de inicio:`, `${startHour} ${timeZone}`, true)
				.addField(`Hora de finalización:`, `Al rededor de las ${endHour} ${timeZone}`, true);


			if (args[4] !== undefined) {
				embed.addField(`Nota:`, `${note}`, false);
			}
			embed.addField(`\u200B`, `__**Tened un ojo a este canal para recibir más noticias sobre el mantenimiento.**__`);

			const announcementChannel = message.guild.channels.cache.get(maintenanceAnnouncementChannel);
			announcementChannel.send(embed);
			announcementChannel.send('@everyone');
			if (!note) {
				message.channel.send(`Se ha enviado un anuncio de mantenimiento programado:\n**Fecha:** ${date}\n**Hora de inicio:** ${startHour} **Hora de finalización:** ${endHour}`);
			} else if (note) {
				message.channel.send(`Se ha enviado un anuncio de mantenimiento programado:\n**Fecha:** ${date}\n**Hora de inicio:** ${startHour} **Hora de finalización:** ${endHour}\n**Nota:** ${note}`);
			}

			this.client.user.setStatus('idle');
		}
	}

};
