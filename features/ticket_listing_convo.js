const { BotkitConversation } = require('botkit')
const os = require('os')
const ticketService = require('../services/TicketService')

/**
 * Listing ticket botkit conversation.
 * Allow to list ticket when hearing 'tickets' or 'voir'
 *
 * @param controller botkit controller
 */
module.exports = (controller) => {

  const TICKET_DISPLAY = 'ticket-display-dialog'

  controller.hears(['tickets', 'voir'], 'message,direct_message', async (bot, message) => {
    await bot.beginDialog(TICKET_DISPLAY)
  })

  let listConvo = new BotkitConversation(TICKET_DISPLAY, controller)

  //STEP : list tickets message
  // -- get ticket from API before listing ticket
  listConvo.before('tickets', async (convo, bot) => {
    try {
      let tickets = await ticketService.findAll()
      await convo.setVar('tickets', tickets)
    } catch (e) {
      console.error(e)
      await bot.say('Sorry, an error occurred, thanks to try later')
    }
  })
  // -- list tickets
  listConvo.addMessage(
    'Here is the current ticket list :' + os.EOL +
    '{{#vars.tickets}} ' +
    '* **{{title}}** - {{description}}' + os.EOL +
    '{{/vars.tickets}}',
    'tickets')
  listConvo.addAction('tickets')

  controller.addDialog(listConvo)
}