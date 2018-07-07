const http = require('http')

const requestHandler = (req, res) => res.end('Hello world!')

const server = http.createServer(requestHandler)
server.listen(3000, err => {
	if (err) return console.error(err)
	console.log('Server listening on port 3000.')
})

/*
// content of index.js
const http = require('http')
const port = 3000

const requestHandler = (request, response) => {
  console.log(request.url)
  response.end('Hello Node.js Server!')
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
*/