require('dotenv').config();
const { SlashCommandBuilder } = require('discord.js');
const { Configuration, OpenAIApi } = require("openai");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('character')
        .addStringOption(option => option.setName('class').setDescription('class or role: guard|wizard|farmer'))
        .addIntegerOption(option => option.setName('level').setDescription('1,2,3...'))
		.setDescription('Generate a character.'),
	async execute(interaction) {
        interaction.reply(`Generating...`);

        const configuration = new Configuration({apiKey: process.env.OPENAI_API_KEY});
        const openai = new OpenAIApi(configuration);
        const format = process.env.GPT3_CHARACTER_PROMPT.trim().replace("{class}", interaction.options.getString('class') ?? '').replace("{level}", interaction.options.getInteger('level') ?? '1');

        const gptResponse = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: format,
            max_tokens: 100,
            temperature: 0.7,
            top_p: 0.3,
            presence_penalty: 0,
            frequency_penalty: 0.5,
        });
        interaction.editReply(`${gptResponse.data.choices[0].text}`);
	},
};