function Maybe () {}

const makeMaybe = obj => {
	const proto = Object.create(Maybe)
	return Object.assign(proto, obj)
}

const ensureIsMaybe = obj => {
	if (obj.prototype === Maybe.prototype) {
		return obj
	}
	throw new Error('fn in Maybe.chain(fn) must return an instance of either Just or Nothing.')
}

const Just = value =>
	makeMaybe({
		map: fn => Just(fn(value)),
		chain: fn => ensureIsMaybe(fn(value)),
		fold: (fnLeft, fnRight) => fnRight(value),
		inspect: () => `Just(${value})`
	})

const Nothing = () =>
	makeMaybe({
		map: fn => Nothing(),
		chain: fn => Nothing(),
		fold: (fnLeft, fnRight) => fnLeft(),
		inspect: () => `Nothing()`
	})

const fromNullable = value =>
	(value != null
		? Just(value)
		: Nothing()
	)

module.exports = {
	Maybe,
	Just,
	Nothing,
	fromNullable,
}