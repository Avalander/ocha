const test = require('tape')

const compose = require('func/compose')


test('compose() should apply functions from right to left.', t => {
	t.plan(1)
	
	const calledFunctions = []
	const a = x => {
		calledFunctions.push('a')
		return x + 1
	}
	const b = x => {
		calledFunctions.push('b')
		return x + 2
	}
	const c = x => {
		calledFunctions.push('c')
		return x + 3
	}
	const f = compose(c, b, a)
	f(0)

	t.deepEqual(calledFunctions, [ 'a', 'b', 'c' ])
})