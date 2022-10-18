import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import fixCarValue from "../utils/fixCarValue";
import { setCars } from './carSlice'

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
            {cars.map((car) => (<div key={car.id}>
                <p>{car.nome_modelo}</p>
                <p>{fixCarValue(car.valor_fipe)}</p>
                <p>{car.timestamp_cadastro}</p>
                <hr></hr>
            </div>))}
        </div>
    );
}