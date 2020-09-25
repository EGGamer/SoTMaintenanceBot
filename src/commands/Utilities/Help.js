const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/Command.js');
const config = require('../../../config.json');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['ayuda'],
			description: 'Muestra todos los comandos y como usarlos.',
			category: 'Utilidades',
			usage: '[command]'
		});
	}

	// eslint-disable-next-line consistent-return
	async run(message, [command]) {
		if (message.member.hasPermission('MANAGE_MESSAGES')) {
			const embed = new MessageEmbed()
				.setColor('BLUE')
				.setAuthor(`${message.guild.name} Menú de ayuda`, message.guild.iconURL({ dynamic: true }))
				.setThumbnail(this.client.user.displayAvatarURL())
				.setFooter(`Pedido por ${message.author.username}. ${config.botVersion}`, message.author.displayAvatarURL({ dynamic: true }))
				.setTimestamp();

			if (command) {
				const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));

				if (!cmd) return message.channel.send(`Comándo inválido. \`${command}\``);

				embed.setAuthor(`${this.client.utils.capitalise(cmd.name)} Ayuda del comando`, this.client.user.displayAvatarURL());
				embed.setDescription([
					`**❯ Aliases:** ${cmd.aliases.length ? cmd.aliases.map(alias => `\`${alias}\``).join(' ') : 'No Aliases'}`,
					`**❯ Descripción:** ${cmd.description}`,
					`**❯ Categoría:** ${cmd.category}`,
					`**❯ Uso:** ${cmd.usage}`
				]);

				return message.channel.send(embed);
			} else {
				embed.setDescription([
					`Estos son los comandos disponibles para ${message.guild.name}`,
					`El prefijo del bot es: ${this.client.prefix}`,
					`Parámetros de los comandos: \`<>\` significa opcional, \`[]\` significa obligatorio y \`{}\` significa condicional.`
				]);
				let categories;
				if (!this.client.owners.includes(message.author.id)) {
					categories = this.client.utils.removeDuplicates(this.client.commands.filter(cmd => cmd.category !== 'Dueño').map(cmd => cmd.category));
				} else {
					categories = this.client.utils.removeDuplicates(this.client.commands.map(cmd => cmd.category));
				}

				for (const category of categories) {
					embed.addField(`**${this.client.utils.capitalise(category)}**`, this.client.commands.filter(cmd =>
						cmd.category === category).map(cmd => `\`${cmd.name}\``).join(' '));
				}
				return message.channel.send(embed);
			}
		}
	}

};
