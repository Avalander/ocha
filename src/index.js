const http = require('http')

const { parseUrl } = require('./path')
const Response = require('./response')


module.exports = () => {
	const route_handlers = []

	const handler = ({ method, path }, handlers) => {
		route_handlers.push({
			method,
			path,
			handlers
		})
	}

	const get = (path, ...handlers) => handler({ path, method: 'GET' }, handlers)
	const post = (path, ...handlers) => handler({ path, method: 'POST' }, handlers)

	const makeRequestHandler = route_handlers => (request, node_response) => {
		const { path, query } = parseUrl(request.url)
		request.path = path
		request.query = query
		const { handlers } = route_handlers.find(({ method, path }) => path === request.path && method === request.method)
		const response = Response(node_response)
		handlers.forEach(h => h(request, response))
		response.finish()
	}

	const start = (port, callback) => {
		const server = http.createServer(makeRequestHandler(route_handlers))
		server.listen(port, callback)
	}

	return {
		get,
		post,
		start,
	}
}
