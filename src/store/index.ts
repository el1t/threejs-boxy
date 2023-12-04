import { configureStore } from '@reduxjs/toolkit'

import sceneReducer from './sceneSlice'

const store = configureStore({
	reducer: {
		scene: sceneReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
