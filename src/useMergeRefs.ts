import { MutableRefObject, useCallback } from 'react'

const useMergeRefs = <T>(...refs: React.Ref<T>[]): React.RefCallback<T> => {
	return useCallback(
		(newRef: T) => {
			for (const ref of refs) {
				if (ref == null) {
					continue
				} else if (typeof ref === 'object') {
					const mutableRef = ref as MutableRefObject<T>
					mutableRef.current = newRef
				} else if (typeof ref === 'function') {
					ref(newRef)
				}
			}
		},
		// This is okay because we expect refs as the args
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[...refs],
	)
}

export default useMergeRefs
