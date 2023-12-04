import { css } from '@emotion/react'

/** Given an object `{className: {...styles}}`, call `css()` on each `styles` object */
const create = <
	T extends { readonly [name: string]: Parameters<typeof css>[0] },
	R extends { readonly [name in keyof T]: ReturnType<typeof css> },
>(
	classNames: T,
): R => {
	const stylesheet: Record<string, unknown> = {}
	for (const [key, value] of Object.entries(classNames)) {
		stylesheet[key] = css(value)
	}
	return stylesheet as R
}

export default {
	create,
}
