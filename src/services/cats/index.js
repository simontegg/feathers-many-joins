const db = require('../../../data')
const path = require('path')
const service = require('feathers-knex')
const hooks = require('./hooks')

module.exports = function(){
  const app = this

  let options = {
    Model: db,
    name: 'cats',
    paginate: {
      default: 5,
      max: 25
    }
  }

  // Initialize our service with any options it requires
  app.use('/cats', service(options))

  // Get our initialize service to that we can bind hooks
  const catsService = app.service('/cats')

  // Set up our before hooks
  catsService.before(hooks.before)

  // Set up our after hooks
  catsService.after(hooks.after)
}
