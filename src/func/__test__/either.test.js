const test = require('tape')

const { Either, Left, Right, tryCatch, conditional } = require('func/either')


// Left

test('Left should be an instance of Either.', t => {
	t.plan(1)

	const actual = Left(3)
	t.equal(actual.prototype, Either.prototype)
})

test('Left.map should not transform value.', t => {
	t.plan(1)

	const actual = Left(3).map(x => x * 2)
	t.equal(actual.inspect(), 'Left(3)')
})

test('Left.chain should not transform value.', t => {
	t.plan(1)

	const actual = Left(3).chain(x => Right(x + 2))
	t.equal(actual.inspect(), 'Left(3)')
})

test('Left.fold should invoke left function.', t => {
	t.plan(1)

	const left = Left(3)
	left.fold(
		x => t.pass('Invoked left function.'),
		x => t.fail('Invoked right function.')
	)
})

test('Left.fold should invoke left function with value.', t => {
	t.plan(1)

	const left = Left(3)
	left.fold(
		x => t.equal(x, 3),
		x => t.fail('Invoked right function.')
	)
})


// Right

test('Right should be an instance of Either.', t => {
	t.plan(1)

	const actual = Right(3)
	t.equal(actual.prototype, Either.prototype)
})

test('Right.map should apply transformation to value', t => {
	t.plan(1)

	const actual = Right(3).map(x => x * 2)
	t.equal(actual.inspect(), 'Right(6)')
})

test('Right.chain should apply transformationa and unwrap value.', t => {
	t.plan(1)
	
	const actual = Right(3).chain(x => Left(x * 2))
	t.equal(actual.inspect(), 'Left(6)')
})

test('Right.fold should invoke right function.', t => {
	t.plan(1)

	const right = Right(3)
	right.fold(
		x => t.fail('Invoked left function.'),
		x => t.pass('Invoked right function.')
	)
})

test('Right.fold should invoke right function with value.', t => {
	t.plan(1)

	const right = Right(3).map(x => x + 4)
	right.fold(
		x => t.fail('Invoked left function.'),
		x => t.equal(x, 7)
	)
})


// tryCatch

const throwIfEven = x => {
	if (x % 2 === 0) throw new Error(`I don't like even numbers`)
	return x
}

test('tryCatch should return Right with value when function does not throw.', t => {
	t.plan(2)

	const actual = tryCatch(throwIfEven, 3)
	t.equal(actual.prototype, Either.prototype)
	t.equal(actual.inspect(), 'Right(3)')
})

test('tryCatch should return Left with error when function throws.', t => {
	t.plan(2)

	const actual = tryCatch(throwIfEven, 4)
	t.equal(actual.prototype, Either.prototype)
	t.equal(actual.inspect(), `Left(Error: I don't like even numbers)`)
})


// conditional

const isEven = conditional(value => value % 2 === 0, 'Value is not even')

test('conditional should return Right with value when it fulfills the condition.', t => {
	t.plan(2)

	const actual = isEven(4)
	t.equal(actual.prototype, Either.prototype)
	t.equal(actual.inspect(), 'Right(4)')
})

test('conditional should return Left with reason when it does not fulfill the condition.', t => {
	t.plan(2)

	const actual = isEven(3)
	t.equal(actual.prototype, Either.prototype)
	t.equal(actual.inspect(), 'Left(Value is not even)')
})
