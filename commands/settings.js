const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setting')
        .addStringOption(option => option.setName('openai').setDescription('Setup an OpenAI key for some features to work.'))
		.setDescription('Setup commands, optionals.'),
	async execute(interaction) {
		await interaction.reply(`\`\`\`diff\n+ Ready to use.\n\`\`\``);
	},
};
