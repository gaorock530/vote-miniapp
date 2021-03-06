const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3001
app.disable('x-powered-by')

const publicPath = path.join(__dirname, '..', 'build')

app.use(express.static(publicPath))

app.listen(PORT, err => console.log(err || `Web-vote-app-server is running at PORT:${PORT}`))


app.get('*', (req, res) => {
  res.sendFile(publicPath + '/index.html')
})