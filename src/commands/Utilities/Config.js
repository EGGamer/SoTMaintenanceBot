/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const Command = require('../../structures/Command.js');
const conf = require('../../../config.json');


module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['conf']
		});
	}

	async run(message) {
		const pr = conf.prefix.toString();
		const own = conf.owners.toString();
		const mAnnCh = conf.maintenanceAnnouncementChannel.toString();
		const mAnnRol = conf.maintenanceAnnouncementRole.toString();
		const mSchAnnCh = conf.maintenanceScheduledMsgChannel.toString();

		const msg = await message.channel.send(`**Prefix:** ${pr}\n**Owner:** <@${own}>\n**Maintenance announcement channel:** <#${mAnnCh}>\n**Maintenance announcement role:** <@&${mAnnRol}>\n**Maintenance scheduled channel:** <#${mSchAnnCh}>`);
	}

};
