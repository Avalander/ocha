function Either () {}

const makeEither = obj => {
	const proto = Object.create(Either)
	return Object.assign(proto, obj)
}

const ensureIsEither = obj => {
	if (obj.prototype === Either.prototype) {
		return obj
	}
	throw new Error('fn in Either.chain(fn) must return an instance of Left or Right.')
}

const Left = value =>
	makeEither({
		map: fn => Left(value),
		chain: fn => Left(value),
		fold: (fnLeft, fnRight) => fnLeft(value),
		inspect: () => `Left(${value})`,
	})

const Right = value =>
	makeEither({
		map: fn => Right(fn(value)),
		chain: fn => ensureIsEither(fn(value)),
		fold: (fnLeft, fnRight) => fnRight(value),
		inspect: () => `Right(${value})`,
	})

const tryCatch = (fn, ...args) => {
	try {
		return Right(fn.apply(null, args))
	} catch (e) {
		return Left(e)
	}
}

const conditional = (pred, reason) => value =>
	(pred(value)
		? Right(value)
		: Left(reason)
	)


module.exports = {
	Either,
	Left,
	Right,
	tryCatch,
	conditional
}
