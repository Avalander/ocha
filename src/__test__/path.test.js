const test = require('tape')

const { parseUrl } = require('../path')


test('parseUrl() should parse the url\'s path.', t => {
	t.plan(1)

	const actual = parseUrl('/test/some/path?param=a').path
	t.equal(actual, '/test/some/path')
})

test('parseUrl() should return empty query object when query string is empty.', t => {
	t.plan(1)

	const actual = parseUrl('/test/path').query
	t.deepEqual(actual, {})
})

test('parseUrl() should parse query string with one parameter.', t => {
	t.plan(1)

	const actual = parseUrl('/test/path?param=ponies').query
	t.deepEqual(actual, { param: 'ponies' })
})

test('parseUrl() should parse query string with multiple parameters.', t => {
	t.plan(1)

	const actual = parseUrl('/test/path?param=ponies&name=Fluttershy&type=pegasus').query
	t.deepEqual(actual, { param: 'ponies', name: 'Fluttershy', type: 'pegasus' })
})

test('parseUrl() should parse params without value as \'true\'.', t => {
	t.plan(1)

	const actual = parseUrl('/test/path?ponies').query
	t.deepEqual(actual, { ponies: true })
})
