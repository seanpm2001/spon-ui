import { init } from '@rematch/core'
import createRematchPersist from '@rematch/persist'
import * as models from './models/index'
import router from './models/router'

const persistPlugin = createRematchPersist({
	whitelist: ['cart'],
	throttle: 1000
})

const store = init({
	models: {
		...models,
		router: router(),
		loader: {
			state: {
				store: {}
			},
			reducers: {
				addModule: (state, key) => {
					const { store } = state
					return {
						...state,
						store: {
							...store,
							[key]: key
						}
					}
				},
				removeModule: (state, key) => {
					delete state.store[key]
					return state
				}
			}
		}
	}
	// plugins: [persistPlugin]
})

export default store
