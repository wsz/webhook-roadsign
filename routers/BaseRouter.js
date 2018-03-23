const request = require('request-promise-native')

class BaseRouter {
  constructor(webhook) {
    this.webhook = webhook
  }

  process(data) {
    this.send(this.parse(data))
  }

  async send(payload) {
    return request({
      uri: this.webhook,
      method: 'POST',
      body: payload,
      json: true,
    })
  }
}

module.exports = BaseRouter
