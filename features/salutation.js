/**
 * Salutation botkit message.
 * Reply a salutation message when hearing words 'bonjour', 'salut' or 'coucou'
 * @param controller
 */
module.exports = (controller) => {
  controller.hears(['bonjour', 'salut', 'coucou'], 'message,direct_message', async (bot, message) => {
    await bot.reply(message, 'Bonjour Wikiat ! Que puis-je faire pour vous ?')
  })
}