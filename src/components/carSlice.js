import { createSlice } from '@reduxjs/toolkit'
export const carSlice = createSlice({
    name: 'cars',
    initialState: {
        value: {
            cars: [],
            filteredCars: []
        }
    },
    reducers: {
        setCars: (state, action) => {
            state.value.cars = action.payload
            state.value.filteredCars = action.payload
        }
    },
})
export const { setCars } = carSlice.actions

export default carSlice.reducer