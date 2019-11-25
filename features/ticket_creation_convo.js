const { BotkitConversation } = require('botkit')
const ticketService = require('../services/TicketService')

/**
 * Ticket creation botkit conversation.
 * Allow to create ticket when hearing 'create' or 'creation'
 *
 * @param controller botkit controller
 */
module.exports = (controller) => {

  const TICKET_CREATION = 'ticket-creation-dialog'

  controller.hears(['create', 'creation'], 'message,direct_message', async (bot, message) => {
    await bot.beginDialog(TICKET_CREATION)
  })

  let creationConvo = new BotkitConversation(TICKET_CREATION, controller)

  //STEP : ask for Title
  creationConvo.ask('What is the title of the ticket you want to create ?', async (response, ticketConversation, bot) => {
    //nothing to do
  }, 'title')

  //STEP : ask for Description
  creationConvo.ask('And the description ?', async (response, ticketConversation, bot) => {
    //nothing to do
  }, 'description')

  //STEP: ask for confirmation - create ticket if spell 'yes'
  creationConvo.ask('Do you confirm you want to create the ticket **{{vars.title}}** ?', [{
      pattern: new RegExp('yes|oui|y'),
      handler: async (response, convo, bot) => {
        try {
          await ticketService.create({
            'title': convo.vars.title,
            'description': convo.vars.description
          })
          await bot.say('The ticket has been created.')
        } catch (e) {
          console.error(e)
          await bot.say('Sorry, an error occurred, thanks to try later')
        }
      }
    }, {
      default: true,
      handler: async (response, convo, bot) => {
        await bot.say('The ticket will not be created.')
      }
    }]
  )

  controller.addDialog(creationConvo)
}