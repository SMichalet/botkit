/**
 * Salutation botkit message.
 * Reply a salutation message when hearing words 'hello', 'salut' or 'coucou'
 * @param controller
 */
module.exports = (controller) => {
  controller.hears(['hello', 'salut', 'coucou'], 'message,direct_message', async (bot, message) => {
    await bot.reply(message, 'Hello :) ! what can I do for you ?')
  })
}