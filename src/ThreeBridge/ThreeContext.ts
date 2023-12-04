import { createContext, useContext } from 'react'

interface ThreeContextType {
	readonly scene: THREE.Scene
}

export const ThreeContext = createContext<ThreeContextType | undefined>(
	undefined,
)

const useThreeContext = (): ThreeContextType => {
	const context = useContext(ThreeContext)
	if (context == null) {
		throw new Error('ThreeContext cannot be null!')
	}
	return context
}

export const useScene = (): THREE.Scene => useThreeContext().scene
