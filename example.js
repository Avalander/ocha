const ocha = require('./src/index')

const app = ocha()


const sayHi = () => console.log('Hi!')
const sayTest = () => console.log('Test.')
const printPath = req => console.log(`Path: ${req.path}`)
const printQuery = req => console.log(`Query: ${JSON.stringify(req.query)}`)
const home = (req, res) => res.setBody('Hello world!')

app.get('/hello', home)

app.get('/test', sayHi, printPath, printQuery, home)

app.post('/test', sayHi, home)

app.get('/echo', printQuery, (req, res) => res.setBody(req.query))

app.start(3000, err => {
	if (err) {
		console.error(err)
		process.exit(1)
	}
	console.log('Server listening on port 3000.')
})