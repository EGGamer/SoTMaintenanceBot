// eslint-disable-next-line no-unused-vars
const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/Command.js');
const config = require('../../../config.json');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['mistart'],
			description: 'Comando para avisar periódicamente de un mantenimiento.',
			category: 'Mantenimientos',
			usage: '[intervalo en segundos] [fecha] [zonaHoraria] [horaInicio] [horaFinal] <nota>'
		});
	}

	// eslint-disable-next-line consistent-return
	async run(message, args) {
		if (message.member.hasPermission('MANAGE_MESSAGES')) {
			if (config.maintenanceStatus === 'announced') {
				const intervalSecs = args[0];
				if (!intervalSecs) return message.channel.send('Debes indicar un intervalo en segundos.');

				const intervalMili = intervalSecs * 1000;

				const date = args[1];
				if (!date) return message.channel.send('Debes indicar una fecha.');

				const timeZone = args[2];
				if (!timeZone) return message.channel.send('Debes indicar una zona horaria.');

				const startHour = args[3];
				if (!startHour) return message.channel.send('Debes de indicar una hora de inicio');

				const endHour = args[4];
				if (!endHour) return message.channel.send('Debes de indicar una hora *aproximada* de finalización');

				const note = args.slice(5).join(' ');

				const intervalAnnounceChannel = message.guild.channels.cache.get(config.maintenanceScheduledMsgChannel);

				if (config.intervalWorking === 'no') {
					config.intervalWorking = 'yes';
				}

				var interval = setInterval(() => {
					if (config.intervalWorking === 'no') {
						clearInterval(interval);
					} else if (config.intervalWorking === 'yes') {
						const embed = new MessageEmbed()
							.setColor('ORANGE')
							.setTitle('AVISO DE MANTENIMIENTO')
							.setThumbnail('https://imgur.com/DYjA5ss.png')
							.setDescription(`**¡Planead bien vuestras aventuras para este día!**`)
							.setFooter(`Aviso: La hora de finalización es una estimación, no es una hora definitiva.`, message.guild.iconURL({ dynamic: true }))
							.setImage('https://imgur.com/yOdjwus.jpg')
							.addField(`Fecha:`, ` ${date}`, false)
							.addField(`Hora de inicio:`, `${startHour} ${timeZone}`, true)
							.addField(`Hora de finalización:`, `Al rededor de las ${endHour} ${timeZone}`, true);

						if (args[5] !== undefined) {
							embed.addField(`Nota:`, `${note}`, false);
						}
						embed.addField(`\u200B`, `__**Tened un ojo al canal <#${config.maintenanceAnnouncementChannel}> para recibir más noticias sobre el mantenimiento.**__`);

						intervalAnnounceChannel.send(embed);
					}
				}, intervalMili);

				message.channel.send(`Se ha comenzado el intervalo de recordatorio de mantenimiento con un intervalo de ${intervalSecs} segs. Usa el comando para para intervalos para terminar el intervalo.`);
			} else { return message.channel.send(`No se ha podido iniciar el intervalo. El estado del mantenimiento es ${config.maintenanceStatus.toUpperCase()}. Requiere: **ANNOUNCED**.`); }
		}
	}

};
