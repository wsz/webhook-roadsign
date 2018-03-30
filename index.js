/* eslint-disable no-console, consistent-return */
const express = require('express')
const bodyParser = require('body-parser')
const hashwords = require('hashwords')
const config = require('./config')

process.on('SIGINT', () => {
  process.exit()
})

const app = express()
const hw = hashwords({
  salt: 'salt',
  wordLength: [3, 7],
})
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

function slugifyWords(words) {
  return words.join('-').toLowerCase()
}

Object.keys(config.routes).forEach((routeName) => {
  /* eslint-disable global-require, import/no-dynamic-require */
  const route = config.routes[routeName]
  let slug = ''
  if (!route.resource) {
    const words = hw.hash(JSON.stringify(route))
    slug = slugifyWords(words)
  } else {
    slug = route.resource
  }
  const Router = require(`./routers/${route.class}`)
  const router = new Router(route.options)

  console.log(`Route "${routeName}" listens at ${config.baseUrl}/${slug}`)

  app.post(`/${slug}`, (request, response) => {
    response.setHeader('Content-Type', 'application/json')
    router.process(request.body)
    response.status(204).send()
  })
})

app.listen(port, (err) => {
  if (err) {
    return console.error('Something bad happened', err)
  }

  console.log(`Server is listening on ${port}`)
})
