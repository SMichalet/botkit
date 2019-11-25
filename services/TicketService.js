const axios = require('axios')

/**
 * Ticket Service use to request ticket API to :
 * - create a ticket
 * - find all tickets
 */
class TicketService {
  /**
   * Create a ticket
   * @param ticket {title, description} ticket
   * @returns created ticket
   */
  async create (ticket) {
    let response = await axios.post('http://localhost:5000/tickets', ticket)
    return response.data
  }

  /**
   * Find all tickets
   * @returns tickets
   */
  async findAll () {
    let response = await axios.get('http://localhost:5000/tickets')
    return response.data
  }
}

let ticketService = new TicketService()

module.exports = ticketService