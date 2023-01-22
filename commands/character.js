require('dotenv').config();
const { SlashCommandBuilder } = require('discord.js');
const { Configuration, OpenAIApi } = require("openai");
const StaticUtils = require('../utilities/static.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('character')
        .addStringOption(option => option.setName('race').setDescription('race or body: human|dwarf|elf'))
        .addStringOption(option => option.setName('class').setDescription('class or role: guard|wizard|farmer'))
        .addIntegerOption(option => option.setName('level').setDescription('1,2,3...'))
		.setDescription('Generate a character through AI. All parameters are optional and random by default.'),
	async execute(interaction) {
        await interaction.reply(`Generating...`);

        const openaiIsConfigured = await StaticUtils.OpenAI.IsConfigured();
        if(!openaiIsConfigured) {
            await interaction.editReply(`You need to provide a valid OpenAI Key to use this feature.\nUse /settings openai <key> or check out /help for more info.`);
            return;
        }

        const openaiKey = await StaticUtils.OpenAI.GetKey();
        const openaiConfiguration = new Configuration({apiKey: openaiKey});
        const openai = new OpenAIApi(openaiConfiguration);

        const character = {
            race: interaction.options.getString('race') ?? StaticUtils.RPG.Races.random(),
            class: interaction.options.getString('class') ?? StaticUtils.RPG.Classes.random(),
            level: interaction.options.getInteger('level') ?? StaticUtils.RPG.Levels.random()
        }

        const format = process.env.GPT3_PREFIX_PROMPT + process.env.GPT3_CHARACTER_PROMPT.replace("{class}", character.class).replace("{level}", character.level);

        const gptResponse = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: format,
            max_tokens: 256,
            temperature: 0.7,
            top_p: 0.3,
            presence_penalty: 0,
            frequency_penalty: 0.5,
        });
        await interaction.editReply(`${gptResponse.data.choices[0].text}`);
	},
};