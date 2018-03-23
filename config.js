module.exports = {
  baseUrl: process.env.BASE_URL,
  routes: {
    'USAePay notifications for LMS LTO team': {
      class: 'StatusIoToSlack',
      options: {
        service: 'USAePay',
        webhook: process.env.USAEPAY_WEBHOOK,
        channel: process.env.USAEPAY_CHANNEL,
        username: 'USAePay webhook',
        iconEmoji: ':hammer_and_wrench:',
      },
    },
  },
}
