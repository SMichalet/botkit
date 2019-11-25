const config = require('config')

/**
 * Salutation botkit message.
 * Reply a salutation message when hearing words 'bonjour', 'salut' or 'coucou'
 * @param controller
 */
module.exports = (controller) => {
  controller.hears(config.get('bot.keywords.salutation'), 'message,direct_message', async (bot, message) => {
    await bot.reply(message, 'Bonjour Wikit ! Que puis-je faire pour vous ?')
  })
}