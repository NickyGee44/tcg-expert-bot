const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

// Check if Discord token exists
if (!process.env.DISCORD_TOKEN) {
    console.error('Error: DISCORD_TOKEN is not set in environment variables');
    process.exit(1);
}

// Create a new Discord client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

// Function to get answer from the API
async function getAnswerFromAI(question) {
    try {
        console.log('Sending request to API:', question);
        const response = await fetch('https://tcgbotwits.hf.space/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: question }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Received response from API');
        return data.answer || "Sorry, I couldn't process that question. Please try again!";
    } catch (error) {
        console.error('Error in getAnswerFromAI:', error);
        return "Sorry, I couldn't process that question. Please try again!";
    }
}

// Log when the bot is online
client.once('ready', () => {
    console.log(`Bot is online! Logged in as ${client.user.tag}`);
    console.log('Bot is in the following servers:');
    client.guilds.cache.forEach(guild => {
        console.log(`- ${guild.name} (${guild.id})`);
    });
});

// Log errors
client.on('error', error => {
    console.error('Discord client error:', error);
});

// Log when the bot is disconnected
client.on('disconnect', () => {
    console.log('Bot has disconnected from Discord');
});

// Listen for messages and respond to the !ask command
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith('!ask')) {
        console.log('Received question:', message.content);
        const question = message.content.slice(5).trim();
        const answer = await getAnswerFromAI(question);
        message.reply(answer);
    }
});

// Log in to Discord
console.log('Attempting to log in to Discord...');
client.login(process.env.DISCORD_TOKEN).catch(error => {
    console.error('Failed to log in to Discord:', error);
    process.exit(1);
});