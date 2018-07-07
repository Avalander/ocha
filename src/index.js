const http = require('http')


//const parseQueryString = query_string =>
const parseUrl = url =>
	({
		path: url.split('?')[0]
	})

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

	const makeRequestHandler = route_handlers => (request, response) => {
		request.path = parseUrl(request.url).path
		const { handlers } = route_handlers.find(({ method, path }) => path === request.path && method === request.method)
		handlers.forEach(h => h(request, response))
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
