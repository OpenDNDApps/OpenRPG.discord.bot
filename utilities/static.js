const { range } = require("discord.js");
require('dotenv').config();

// These are used for default random values, feel free to add more but commands should support any/more values.
module.exports = { 
    RPG: {
        Classes: {
            items: ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard'],
            random: function() { return Math.floor(Math.random() * this.items.length); }
        },

        Races: {
            items: ['Dwarf', 'Elf', 'Gnome', 'Galf-Elf', 'Halfling', 'Half-Orc', 'Human'],
            random: function() { return Math.floor(Math.random() * this.items.length); }
        },

        Levels: {
            items: range(1, 20),
            random: function() { return Math.floor(Math.random() * (this.items[this.items.length-1] - this.items[0] + 1)) + this.items[0]; }
        }
    },

    OpenAI:{
        async IsConfigured() {
            if(process.env.OPENAI_REQUEST_KEY !== 'TRUE')  {
                return true;
            }

            return false;
        },
        async GetKey() {
            if(process.env.OPENAI_REQUEST_KEY !== 'TRUE' || true)  {
                return process.env.OPENAI_API_KEY;
            }
            
            // Get Key from DB
            return "";
        }
    }
};