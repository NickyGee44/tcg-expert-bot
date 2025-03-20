---
title: Tcgbotwits
emoji: 🚀
colorFrom: blue
colorTo: green
sdk: docker
pinned: false
short_description: Create powerful AI models without code
hf_oauth: true
hf_oauth_expiration_minutes: 36000
hf_oauth_scopes:
- read-repos
- write-repos
- manage-repos
- inference-api
- read-billing
tags:
- autotrain
license: apache-2.0
---

# Docs

https://huggingface.co/docs/autotrain

# Citation

@misc{thakur2024autotrainnocodetrainingstateoftheart,
      title={AutoTrain: No-code training for state-of-the-art models}, 
      author={Abhishek Thakur},
      year={2024},
      eprint={2410.15735},
      archivePrefix={arXiv},
      primaryClass={cs.AI},
      url={https://arxiv.org/abs/2410.15735}, 
}

# TCG Expert Bot

A Discord bot powered by a fine-tuned GPT-2 model that answers questions about the TCG game, its lore, characters, and mechanics.

## Features

- Responds to questions about the TCG game using the `!ask` command
- Powered by a custom-trained AI model
- Provides detailed answers about game mechanics, lore, and characters

## Usage

To ask the bot a question, use the `!ask` command followed by your question:

```
!ask What is the mana system?
!ask Who is Centurio?
!ask Tell me about the game mechanics
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with your Discord bot token:
```
DISCORD_TOKEN=your_token_here
```

3. Start the bot:
```bash
npm start
```

## Technology Stack

- Discord.js for bot functionality
- Custom GPT-2 model hosted on Hugging Face Spaces
- Node.js backend
