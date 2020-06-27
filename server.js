const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
app.disable('x-powered-by')



app.use(express.static(__dirname + '/build'))

app.listen(PORT, err => console.log(err || `Web-vote-app-server is running at PORT:${PORT}`))

// app.get('/login', (req, res) => {
//   res.status(200).send('login')
// })


// app.post('/login', (req, res) => {
//   res.status(200)
//   res.end()
// })