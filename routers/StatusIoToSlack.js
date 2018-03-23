const BaseRouter = require('./BaseRouter')

class StatusIoToSlack extends BaseRouter {
  constructor(options) {
    super(options.webhook)
    this.options = options
  }

  parse(data) {
    let attachment = {}
    const base = {
      channel: this.options.channel,
      username: this.options.username,
      icon_emoji: this.options.iconEmoji,
    }
    const baseAttachment = {
      pretext: data.current_status,
      author_name: `${this.options.service} Status Page`,
      author_link: data.status_page_url,
      text: data.details,
      fields: [
        {
          title: 'Components',
          value: data.components.map(component => component.name).join('\n'),
          short: true,
        },
        {
          title: 'Locations',
          value: data.containers.map(container => container.name).join('\n'),
          short: true,
        },
      ],
      footer: this.options.service,
      ts: Date.parse(data.datetime) / 1000,
    }
    const isMaitenance = typeof data.maintenance_url !== 'undefined'
    if (isMaitenance) {
      attachment = {
        ...baseAttachment,
        fallback: `New ${this.options.service} Maitenance info`,
        color: 'warning',
        title: `${this.options.service} Maitenance`,
        title_link: data.maintenance_url,
      }
    } else {
      attachment = {
        ...baseAttachment,
        fallback: `New ${this.options.service} Incident info`,
        color: 'danger',
        title: `${this.options.service} Incident`,
        title_link: data.incident_url,
        fields: [
          ...baseAttachment.fields,
          {
            title: 'Previous state',
            value: data.previous_state,
            short: true,
          },
          {
            title: 'Current state',
            value: data.current_state,
            short: true,
          },
        ],
      }
    }

    return {
      ...base,
      attachments: [
        attachment,
      ],
    }
  }
}

module.exports = StatusIoToSlack
