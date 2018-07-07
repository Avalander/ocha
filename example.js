const ocha = require('./index')

const app = ocha()

app.get('/hello', (req, res) => {
	res.setHeader('Content-Type', 'application/json')
	res.end(JSON.stringify({ text: 'Hello world!' }), 'utf8')
})

const sayHi = () => console.log('Hi!')
const sayTest = () => console.log('Test.')
const home = (req, res) => {
	res.setHeader('Content-Type', 'application/json')
	res.end(JSON.stringify({ text: 'Hello world!' }), 'utf8')
}

app.get('/', sayHi, sayTest, home)

app.start(3000, err => {
	if (err) {
		console.error(err)
		process.exit(1)
	}
	console.log('Server listening on port 3000.')
})