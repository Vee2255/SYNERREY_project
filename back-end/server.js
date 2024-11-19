const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

// Middleware
app.use(cors())
app.use(bodyParser.json())

// Routes
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from Node.js!' })
})

app.post('/api/data', (req, res) => {
  const { data } = req.body
  res.json({ received: data })
})

// Start the server
const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
