const { DiceRoller, DiscordRollRenderer } = require('dice-roller-parser');
const { Client, Collection, Events, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
        .addStringOption(option => option.setRequired(true).setName('roll').setDescription('ex. 2d6+1 or 1d20'))
		.setDescription('Roll dices ex. 2d6+1 or 1d20'),
	async execute(interaction) {
        const diceRoller = new DiceRoller();
        const renderer = new DiscordRollRenderer();

        const param = interaction.options.getString('roll');
        const roll = diceRoller.rollParsed(diceRoller.parse(param));

		await interaction.reply(`\`\`\`\n${param}: \n---\n## ${renderer.render(roll)} \n\`\`\` 🎲 **${roll.value.toString()}**`);
	},
};
