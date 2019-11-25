const { BotkitConversation } = require('botkit')
const config = require('config')
const ticketService = require('../services/TicketService')
const os = require('os')

/**
 * Listing ticket botkit conversation.
 * Allow to list ticket when hearing 'tickets' or 'voir'
 *
 * @param controller botkit controller
 */
module.exports = (controller) => {

  const TICKET_DISPLAY = 'ticket-display-dialog'

  controller.hears(config.get('bot.keywords.tickets.listing'), 'message,direct_message', async (bot, message) => {
    await bot.beginDialog(TICKET_DISPLAY)
  })

  let listConvo = new BotkitConversation(TICKET_DISPLAY, controller)

  //STEP : list tickets message
  // -- get ticket from API before
  listConvo.before('tickets', async (convo, bot) => {
    try {
      let tickets = await ticketService.findAll()
      await convo.setVar('tickets', tickets)
    } catch (e) {
      console.error('error when trying to retrieve tickets', e.errno)
      await bot.say('Désolé je ne peux pas récupérer la liste des tickets pour le moment, merci de réessayer.')
      await convo.stop()
    }
  })
  // -- list tickets
  listConvo.addMessage(
    'Voici votre liste de tickets :' + os.EOL +
    '{{#vars.tickets}} ' +
    '* **{{title}}** - {{description}}' + os.EOL +
    '{{/vars.tickets}}',
    'tickets')
  listConvo.addAction('tickets')

  controller.addDialog(listConvo)
}