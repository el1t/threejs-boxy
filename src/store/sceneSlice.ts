import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { Box } from './Box'
import { createBox } from './Box'
import { useAppSelector } from './hooks'

interface SceneState {
	objects: readonly Box[]
}

const initialState: SceneState = {
	objects: [],
}

const sceneSlice = createSlice({
	initialState,
	name: 'scene',
	reducers: {
		addBox: (state, action: PayloadAction<Readonly<Partial<Box>>>) => {
			state.objects.push(createBox(action.payload))
		},
		selectBox: (state, action: PayloadAction<Box['id']>) => {
			for (const obj of state.objects) {
				if (action.payload === obj.id) {
					obj.isSelected = true
				} else if (obj.isSelected) {
					obj.isSelected = false
				}
			}
		},
	},
})

export const { addBox, selectBox } = sceneSlice.actions

export const useSceneObjects = () =>
	useAppSelector(state => state.scene.objects)

export const useSelectedObject = () =>
	useAppSelector(state => state.scene.objects.find(obj => obj.isSelected))

export default sceneSlice.reducer
