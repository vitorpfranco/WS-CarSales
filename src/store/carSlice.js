import { createSlice } from '@reduxjs/toolkit'
import fixCarValue from '../utils/fixCarValue'
export const carSlice = createSlice({
    name: 'cars',
    initialState: {
        value: {
            cars: [],
            filteredCars: [],
            filterApplied: ''
        }
    },
    reducers: {
        setCars: (state, action) => {
            state.value.cars = action.payload
            state.value.filteredCars = action.payload
        },
        filterNewCars: (state) => {
            const cars = state.value.cars
            cars.sort((x, y) => { return Number(y.timestamp_cadastro) - Number(x.timestamp_cadastro) })
            const newCars = cars.slice(0, 5)
            state.value.filteredCars = newCars
            state.value.filterApplied = "NewCars"
        },
        filterByYear: (state, action) => {
            const cars = state.value.cars
            const filteredCars = cars.filter((car) => {
                return car.ano < action.payload
            })
            state.value.filteredCars = filteredCars
            state.value.filterApplied = 'ByYear'

        },
        filterCarsOnSale: (state) => {
            const cars = state.value.cars
            cars.sort((x, y) => { return fixCarValue(x.valor_fipe) - fixCarValue(y.valor_fipe) })
            const carsOnSale = cars.slice(0, 3)
            state.value.filteredCars = carsOnSale
            state.value.filterApplied = 'OnSale'
        },
        searchFilter: (state, action) => {
            const cars = state.value.cars
            const search = action.payload.toLowerCase()
            const filteredCars = cars.filter((car) => {
                if (search === '') { return car }
                else if (car.nome_modelo.toLowerCase().includes(search) || car.marca_nome.toLowerCase().includes(search)) {
                    return car
                }
            })
            state.value.filteredCars = filteredCars
            state.value.filterApplied = ''

        },
        resetFilters: (state) => {
            state.value.filteredCars = state.value.cars
            state.value.filterApplied = ''

        }
    },
})
export const { setCars, filterNewCars, filterByYear, resetFilters, filterCarsOnSale, searchFilter } = carSlice.actions

export default carSlice.reducer