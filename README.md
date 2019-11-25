# Botkit sample ticket manager

## Setup

1. `npm install`
2. `npm start`
3. Bot is running by default on `http://localhost:3000/api/messages`
4. Copy this bot URL on a [Bot Framework emulator](https://github.com/microsoft/BotFramework-Emulator)

## Requirement

### Ticket backend

This bot uses the **ticket** API to be able to create and retrieve tickets.
Be sure **ticket** is running by following the Setup on its **README** file. 

By default the Bot is configured to call the API on the http://localhost:5000 host.
You can modify this configuration before running the bot by modifying the `config/default.json` file.

default configuration : 
```
{
  "API": {
    "host": "http://localhost",
    "port": 5000,
    "resources" : {         
      "tickets" : "/tickets"  
    }
  }
}
```

### Bot framework emulator

This bot uses the default Bot Framework adapter. 
You will need the Bot Framework Emulator to be able to interact with it. 

1. Download the 4.6.0 [Bot Framework emulator](https://github.com/microsoft/BotFramework-Emulator/releases)
2. Install it and copy the bot URL `http://localhost:3000/api/messages`
3. Start to discuss with the bot

## General Information

This bot is trigger by the following keywords : 
* **bonjour**, **salut**, **coucou** : trigger salutation message
* **création**, **créer** : trigger creation conversation
* **tickets**, **voir** : trigger listing ticket message