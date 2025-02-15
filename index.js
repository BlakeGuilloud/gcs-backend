const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()
const port = 3000
const service = require('./service')
const cors = require('cors')

require('dotenv').config()

app.use(express.json())
app.use(cors())

app.get('/groceries', async (_, res) => {
  const list = await service.fetchAll()

  res.send(list)
})

app.get('/groceries/:id', async (req, res) => {
  const one = await service.fetchOne(req.params.id)

  res.send(one)
})

app.post('/groceries', async (req, res) => {
  const one = await service.postOne(req.body)

  res.send(one)
})

app.patch('/groceries/:id', async (req, res) => {
  const one = await service.patchOne(req.params.id, req.body)

  res.send(one)
})

app.delete('/groceries/:id', async (req, res) => {
  await service.deleteOne(req.params.id)

  res.send('Success')
})

app.delete('/groceries', async (req, res) => {
  await service.deleteMany(req.body)

  res.send('Success delete many')
})

app.listen(port, () => {
  console.log(`GCS app listening on port ${port}`)
  mongoose.connect(process.env.CONNECTION_STRING)
})