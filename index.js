const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

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
    return data.answer || "Sorry, I couldn't process that question. Please try again!";
  } catch (error) {
    console.error(error);
    return "Sorry, I couldn't process that question. Please try again!";
  }
}

// Log when the bot is online
client.once('ready', () => {
  console.log('Bot is online!');
});

// Listen for messages and respond to the !ask command
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith('!ask')) {
    const question = message.content.slice(5).trim();
    const answer = await getAnswerFromAI(question);
    message.reply(answer);
  }
});

// Log in to Discord
client.login(process.env.DISCORD_TOKEN);