module.exports = {
  baseUrl: 'http://hostname',
  routes: {
    'USAePay notifications for LMS LTO team': {
      class: 'StatusIoToSlack',
      options: {
        service: 'USAePay',
        webhook: 'http://localhost:8080/',
        channel: '#sky_lmslto',
        username: 'USAePay webhook',
        iconEmoji: ':hammer_and_wrench:',
      },
    },
  },
}
