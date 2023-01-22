require('dotenv').config();
const { SlashCommandBuilder } = require('discord.js');
const { Configuration, OpenAIApi } = require("openai");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('character')
        .addStringOption(option => option.setName('race').setDescription('race or body: human|dwarf|elf'))
        .addStringOption(option => option.setName('class').setDescription('class or role: guard|wizard|farmer'))
        .addIntegerOption(option => option.setName('level').setDescription('1,2,3...'))
		.setDescription('Generate a character through AI. All parameters are optional and random by default.'),
	async execute(interaction) {
        interaction.reply(`Generating...`);

        const configuration = new Configuration({apiKey: process.env.OPENAI_API_KEY});
        const openai = new OpenAIApi(configuration);
        const character = {
            race: interaction.options.getString('race') ?? getRandomRace(),
            class: interaction.options.getString('class') ?? getRandomClass(),
            level: interaction.options.getInteger('level') ?? getRandomNumber(1, 10)
        }
        const format = process.env.GPT3_CHARACTER_PROMPT.replace("{class}", character.class).replace("{level}", character.level);

        const gptResponse = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: format,
            max_tokens: 170,
            temperature: 0.7,
            top_p: 0.3,
            presence_penalty: 0,
            frequency_penalty: 0.5,
        });
        interaction.editReply(`${gptResponse.data.choices[0].text}`);
	},
};

function getRandomClass() {
    const classes = ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard'];
    return getRandomFromList(classes);
}

function getRandomRace() {
    const races = ['Dwarf', 'Elf', 'Gnome', 'Galf-Elf', 'Halfling', 'Half-Orc', 'Human'];
    return getRandomFromList(races);
}

function getRandomFromList(list) {
    return Math.floor(Math.random() * list.length);
}

function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}