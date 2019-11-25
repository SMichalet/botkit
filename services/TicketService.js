const axios = require('axios')
const config = require('config')

/**
 * Ticket Service use to request ticket API to manage ticket
 */
class TicketService {

  constructor () {
    this.resourceUri = config.get('API.host') + ':' + config.get('API.port') + config.get('API.resources.tickets')
  }

  /**
   * Create a ticket
   * @param ticket {title, description} ticket
   * @returns created ticket
   */
  async create (ticket) {
    let response = await axios.post(this.resourceUri, ticket)
    return response.data
  }

  /**
   * Find all tickets
   * @returns tickets
   */
  async findAll () {
    let response = await axios.get(this.resourceUri)
    return response.data
  }
}

let ticketService = new TicketService()

module.exports = ticketService