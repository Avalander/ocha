const { fromNullable } = require('./func/maybe')
const compose = require('./func/compose')


const existsOrTrue = value =>
	(value != null
		? value
		: true
	)

const splitParam = param => param.split('=')

const paramToObject = ([name, value]) => ({ [name]: existsOrTrue(value) })

const parseParam = compose(paramToObject, splitParam)

const reduceParams = (prev, param) => ({ ...prev, ...parseParam(param) })

const parseQueryString = query_string =>
	query_string
		.map(x => x.split('&'))
		.map(x => x.reduce(reduceParams, {}))
		.fold(
			() => ({}),
			x => x
		)

const parseUrl = url =>
	({
		path: url.split('?')[0],
		query: compose(parseQueryString, fromNullable)(url.split('?')[1])
	})

module.exports = {
	parseUrl,
}