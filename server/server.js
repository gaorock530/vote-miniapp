const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3001
app.disable('x-powered-by')

const publicPath = path.join(__dirname, '..', 'build')
console.log(publicPath)
app.use(express.static(publicPath))

app.listen(PORT, err => console.log(err || `Web-vote-app-server is running at PORT:${PORT}`))

// app.get('/', (req, res) => {

// })

// app.get('/vote/:id', (req, res) => {
//   const id = req.params.id
//   res.sendFile(publicPath + '/index.html')
// })

app.get('*', (req, res) => {
  res.status(404)
  res.sendFile(__dirname + '/404.html')
})