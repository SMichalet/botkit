const { Botkit } = require('botkit')

const controller = new Botkit({
  webhook_uri: '/api/messages'
})

controller.ready(() => {
  controller.loadModules(__dirname + '/features')
})
