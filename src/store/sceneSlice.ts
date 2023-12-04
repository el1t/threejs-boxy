import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { Box } from './Box'
import { createBox } from './Box'
import { useAppSelector } from './hooks'

type BoxConfig = Parameters<typeof createBox>[0]

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
		addBox: (state, action: PayloadAction<BoxConfig>) => {
			state.objects.push(createBox(action.payload))
		},
		deleteBox: (state, action: PayloadAction<Box['id']>) => {
			const index = state.objects.findIndex(obj => obj.id === action.payload)
			if (index < 0) {
				return
			}
			state.objects.splice(index, 1)
		},
		updateSelectedBox: (state, action: PayloadAction<BoxConfig>) => {
			const targetIndex = state.objects.findIndex(obj => obj.isSelected)
			if (targetIndex < 0) {
				// nothing is selected
				return
			}
			state.objects[targetIndex] = {
				...state.objects[targetIndex],
				...action.payload,
			}
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

export const { addBox, deleteBox, updateSelectedBox, selectBox } =
	sceneSlice.actions

export const useSceneObjects = () =>
	useAppSelector(state => state.scene.objects)

export const useSelectedObject = () =>
	useAppSelector(state => state.scene.objects.find(obj => obj.isSelected))

export default sceneSlice.reducer
