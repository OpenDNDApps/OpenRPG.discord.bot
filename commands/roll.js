const { DiceRoller, DiscordRollRenderer } = require('dice-roller-parser');
const { Client, Collection, Events, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
        .addStringOption(option => option.setRequired(true).setName('roll').setDescription('ex. 2d6+1 or 1d20'))
		.setDescription('ex. 2d6+1 or 1d20'),
	async execute(interaction) {
        const diceRoller = new DiceRoller();
        const param = interaction.options.getString('roll');
        const parsedInput = diceRoller.parse(param);
        const roll = diceRoller.rollParsed(parsedInput);
        const renderer = new DiscordRollRenderer();
        const render = renderer.render(roll);
		await interaction.reply(`### 🎲 ${param} : \n ## ${render}`);
	},
};
