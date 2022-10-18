import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import CarCard from "./CarCard";
import { setCars, filterNewCars, filterByYear, resetFilters, filterCarsOnSale } from './carSlice'

export default function CarList() {
    const cars = useSelector((state) => state.cars.value.filteredCars)
    const dispatch = useDispatch()

    const fetchCars = async () => {
        const res = await axios.get('/cars.json')
        dispatch(setCars(res.data))
    }

    useEffect(() => {
        fetchCars()
    }, [])
    return (

        <div className="App">
            <button type="button" onClick={() => { dispatch(filterNewCars()) }}>Recent Cars</button>
            <button type="button" onClick={() => { dispatch(filterByYear(2005)) }}>Filter old cars</button>
            <button type="button" onClick={() => { dispatch(filterCarsOnSale()) }}> Filter cars on sale</button>
            <button type="button" onClick={() => { dispatch(resetFilters()) }}>Reset filters</button>

            {cars.map((car) => (<div key={car.id}>
                <CarCard car={car}></CarCard>
            </div>))}
        </div>
    );
}