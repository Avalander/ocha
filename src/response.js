module.exports = node_response => {
	let headers = {
		'Content-Type': 'application/json'
	}
	let statusCode = 200
	let body = ''

	const setHeader = (name, value) => headers[name] = value
	const setBody = value => body = value
	const setStatus = code => statusCode = code
	const finish = () => {
		const content = typeof body === 'string' ? body : JSON.stringify(body)

		node_response.writeHead(statusCode, headers)
		node_response.end(content)
	}

	return {
		setHeader,
		setBody,
		setStatus,
		finish
	}
}
