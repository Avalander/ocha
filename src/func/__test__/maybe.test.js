const test = require('tape')

const { Maybe, Just, Nothing, fromNullable } = require('func/maybe')


// Just

test('Just(value) should return an instance of Maybe.', t => {
	t.plan(1)
	
	const actual = Just(3)
	t.equal(actual.prototype, Maybe.prototype)
})

test('Just.map should apply transformation and return new Just().', t => {
	t.plan(2)

	const first = Just(3)
	const second = first.map(x => x * 2)

	t.equal(first.inspect(), 'Just(3)')
	t.equal(second.inspect(), 'Just(6)')
})

test('Just.chain should apply transformation and unwrap value.', t => {
	t.plan(1)

	const actual = Just('Twilight').chain(x => Just(`${x} Sparkle`))
	t.equal(actual.inspect(), 'Just(Twilight Sparkle)')
})

test('Just.chain should throw when transformation does not return an instance of Maybe.', t => {
	t.plan(1)

	t.throws(() => {
		Just(3).chain(x => x * 2)
	})
})

test('Just.fold should apply right transformation.', t => {
	t.plan(1)

	const x = Just(3)
	x.fold(
		() => t.fail('Invoked left function instead.'),
		y => t.equal(y, 3)
	)
})


// Nothing

test('Nothing() should return an instance of Maybe.', t => {
	t.plan(1)

	const actual = Nothing()
	t.equal(actual.prototype, Maybe.prototype)
})

test('Nothing.map should return Nothing.', t => {
	t.plan(1)

	const actual = Nothing().map(x => 3)
	t.equal(actual.inspect(), 'Nothing()')
})

test('Nothing.chain should return Nothing.', t => {
	t.plan(1)

	const actual = Nothing().chain(x => Just(3))
	t.equal(actual.inspect(), 'Nothing()')
})

test('Nothing.fold should apply the left transformation.', t => {
	t.plan(1)

	const x = Nothing()
	x.fold(
		() => t.pass('Invoked left function.'),
		() => t.fail('Invoked right function instead.')
	)
})


// fromNullable

test('fromNullable should return Nothing when called with undefined.', t => {
	t.plan(1)

	const actual = fromNullable(undefined)
	t.equal(actual.inspect(), 'Nothing()')
})

test('fromNullable should return Nothing when called with null.', t => {
	t.plan(1)

	const actual = fromNullable(null)
	t.equal(actual.inspect(), 'Nothing()')
})

test('fromNullable should return Just when called with false.', t => {
	t.plan(1)

	const actual = fromNullable(false)
	t.equal(actual.inspect(), 'Just(false)')
})

test('fromNullable should return Just when called with 0.', t => {
	t.plan(1)

	const actual = fromNullable(0)
	t.equal(actual.inspect(), 'Just(0)')
})

test('fromNullable should return Just when called with empty string.', t => {
	t.plan(1)

	const actual = fromNullable('')
	t.equal(actual.inspect(), 'Just()')
})

test('fromNullable should return Just when called with truthy value.', t => {
	t.plan(1)

	const actual = fromNullable('Twilight Sparkle')
	t.equal(actual.inspect(), 'Just(Twilight Sparkle)')
})
