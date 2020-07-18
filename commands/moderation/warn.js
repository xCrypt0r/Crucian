const Command = require('../../structures/Command.js');
const MemberModel = require('../../models/Member.js');

class Warn extends Command {
    constructor(...args) {
        super(...args);
    }

    async run(message, args) {
        if (!message.member.hasPermission('MANAGE_GUILD')) {
            message.reply(bot.lang.lackOfPermission.random());

            return;
        }

        let member = message.mentions.members.first();

        if (!member) {
            message.reply(bot.lang.cantFindUser);

            return;
        }

        if (!member.manageable || member.hasPermission('MANAGE_MESSAGES')) {
            message.reply(bot.lang.lackOfPermission.random());

            return;
        }

        let reason = args.slice(1).join(' '),
            { warnings } = await member.info;

        warnings++;

        if (warnings >= 3) {
            member
                .kick(reason)
                .then(() => {
                    message.channel.send(bot.lang.kickSuccess.random().format(member.user.username, reason));
                })
                .catch(bot.logger.error);
        } else {
            await MemberModel.updateOne(
                { fullId: member.fullId },
                { $set: { warnings: warnings } }
            );
            message.channel.send(bot.lang.warning.format(reason, member, warnings));
        }
    }
}

module.exports = Warn;