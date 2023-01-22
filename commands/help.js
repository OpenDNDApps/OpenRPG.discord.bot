const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Provides information about the commands.'),
	async execute(interaction) {
		const commands = [];
		const dirPath = path.resolve(__dirname, '../commands');
		const commandFiles = fs.readdirSync(dirPath).filter(file => file.endsWith('.js'));
		
		for (const file of commandFiles) {
			const command = require(`${dirPath}/${file}`);
			commands.push(command.data.toJSON());
		}

		let message = "Commands: \n";
		for (const command of commands) {
			message += `\n**\/${command.name}**\n*${command.description}*\n`;
		}
		await interaction.reply(message);
	},
};