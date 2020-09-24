// eslint-disable-next-line no-unused-vars
const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/Command.js');
const { maintenanceAnnouncementChannel } = require('../../../config.json');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['me'],
			description: 'Comando para avisar de mantenimientos finalizados.',
			category: 'Mantenimientos',
			usage: '[hayUpdate] {pesoSteam} {pesoW10} {pesoXB1} {pesoXBX} <nota>'
		});
	}

	// eslint-disable-next-line consistent-return
	async run(message, args) {
		if (this.client.owners.includes(message.author.id)) {
			const hayUpdate = args[0];

			if (hayUpdate === 'si') {
				const steamSize = args[1];
				const w10Size = args[2];
				const xb1Size = args[3];
				const xbxSize = args[4];
				const note = args.slice(5).join(' ');

				// Comprobación de argumentos
				if (!steamSize) return message.channel.send('Debes de indicar un peso de actualización para Steam.');
				if (!w10Size) return message.channel.send('Debes de indicar un peso de actualización Windows10.');
				if (!xb1Size) return message.channel.send('Debes de indicar un peso de actualización Xbox One.');
				if (!xbxSize) return message.channel.send('Debes de indicar un peso de actualización Xbox One X.');


				const embed = new MessageEmbed()
					.setColor('GREEN')
					.setTitle('MANTENIMIENTO FINALIZADO')
					.setThumbnail('https://imgur.com/5G0Cs9A.png')
					.setDescription(`¡El mantenimiento ya ha finalizado y ya se puede jugar al juego! Recordad que tenéis que descargar la actualización antes de jugar.`)
					.setImage('https://cdn.discordapp.com/attachments/580447725162856468/753569265830854736/MantFinalizado.jpg')
					.addField(`\u200B`, `\u200B`)
					.addField(`Steam:`, `${steamSize} GB`, true)
					.addField(`Microsoft Store:`, `${w10Size} GB`, true)
					.addField(`Xbox One:`, `${xb1Size} GB`, true)
					.addField(`Xbox One X:`, `${xbxSize} GB`, true);


				if (args[5] !== undefined) {
					embed.addField(`Nota:`, `${note}`, false);
				}

				const announcementChannel = message.guild.channels.cache.get(maintenanceAnnouncementChannel);
				announcementChannel.send(embed);
				announcementChannel.send('@everyone');
				if (!note) {
					message.channel.send(`Se ha enviado un anuncio de mantenimiento finalizado:\n**Steam:** ${steamSize} **Win10:** ${w10Size} **Xb1:** ${xb1Size} **Xbx:** ${xbxSize}`);
				} else if (note) {
					message.channel.send(`Se ha enviado un anuncio de mantenimiento finalizado:\n**Steam:** ${steamSize} **Win10:** ${w10Size} **Xb1:** ${xb1Size} **Xbx:** ${xbxSize}\n**Nota:** ${note}`);
				}

				this.client.user.setStatus('online');
			} else if (hayUpdate === 'no') {
				const note = args.slice(1).join(' ');

				const embed = new MessageEmbed()
					.setColor('GREEN')
					.setTitle('MANTENIMIENTO FINALIZADO')
					.setThumbnail('https://imgur.com/5G0Cs9A.png')
					.setDescription(`¡El mantenimiento ya ha finalizado y ya se puede jugar al juego!`)
					.setImage('https://imgur.com/jfRMUqA.jpg');

				if (args[1] !== undefined) {
					embed.addField(`Nota:`, `${note}`, false);
				}

				const announcementChannel = message.guild.channels.cache.get(maintenanceAnnouncementChannel);
				announcementChannel.send(embed);
				announcementChannel.send('@everyone');
				if (!note) {
					message.channel.send(`Se ha enviado un anuncio de mantenimiento finalizado.`);
				} else if (note) {
					message.channel.send(`Se ha enviado un anuncio de mantenimiento finalizado:\n**Nota:** ${note}`);
				}

				this.client.user.setStatus('online');
			}
		}
	}

};
