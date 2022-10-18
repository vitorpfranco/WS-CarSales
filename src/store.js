import { configureStore } from '@reduxjs/toolkit'
import carReducer from './components/carSlice'
export default configureStore({
    reducer: {
        cars: carReducer,
    },
})