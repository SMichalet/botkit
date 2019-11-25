const { BotkitConversation } = require('botkit')
const config = require('config')
const ticketService = require('../services/TicketService')

/**
 * Ticket creation botkit conversation.
 * Allow to create ticket when hearing 'création' or 'créer'
 *
 * @param controller botkit controller
 */
module.exports = (controller) => {

  const TICKET_CREATION = 'ticket-creation-dialog'

  controller.hears(config.get('bot.keywords.tickets.create'), 'message,direct_message', async (bot, message) => {
    await bot.beginDialog(TICKET_CREATION)
  })

  let creationConvo = new BotkitConversation(TICKET_CREATION, controller)

  //STEP : ask for Title
  creationConvo.ask('Quel est le titre du ticket que vous voulez créer ?', async (response, ticketConversation, bot) => {
    //nothing to do
  }, 'title')

  //STEP : ask for Description
  creationConvo.ask('Et la description ?', async (response, ticketConversation, bot) => {
    //nothing to do
  }, 'description')

  //STEP: ask for confirmation - create ticket if spell 'yes'
  creationConvo.ask('Confirmez-vous la création du ticket **{{vars.title}}** ?', [{
      pattern: new RegExp('yes|oui|confirmé|confirm'),
      handler: async (response, convo, bot) => {
        try {
          await ticketService.create({
            'title': convo.vars.title,
            'description': convo.vars.description
          })
          await bot.say('Le ticket a bien été créé.')
        } catch (e) {
          console.error('error when trying to create a ticket', e.errno)
          await bot.say('Désolé je ne peux pas créer de ticket pour le moment, merci de réessayer.')
          await convo.stop()
        }
      }
    }, {
      pattern: new RegExp('no|non|annulé|cancel'),
      handler: async (response, convo, bot) => {
        await bot.say('Le ticket n\'a pas été créé.')
      }
    }, {
      default: true,
      handler: async (response, convo, bot) => {
        await bot.say('Je n\'ai pas compris votre message.')
        await convo.repeat()
      }
    }]
  )

  controller.addDialog(creationConvo)
}