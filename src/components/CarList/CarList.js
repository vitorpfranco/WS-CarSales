import styles from './CarList.module.scss'

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { setCars } from '../../store/carSlice'

import carService from "../../services/carService"
import brandService from "../../services/brandService";

import CarCard from "../CarCard/CarCard";

export default function CarList() {
    const cars = useSelector((state) => state.cars.value.filteredCars)
    const [brands, setBrands] = useState([])

    const dispatch = useDispatch()

    const fetchBrands = async () => {
        const brands = await brandService.getBrands()
        setBrands(brands)
    }
    const fetchCars = async () => {
        const cars = await carService.getCars()
        dispatch(setCars(cars))
    }
    useEffect(() => {
        fetchBrands();
        fetchCars();
    }, [])

    function verifyExistingBrand(brand) {
        const existBoolean = cars.filter((car) => { return car.marca_nome === brand.marca_nome }).length > 0
        return existBoolean
    }

    return (
        <div className={styles.carListContainer}>
            {brands.map((brand) => {
                if (verifyExistingBrand(brand)) {
                    return (<div key={brand.marca_id}>
                        <h2 className={styles.brandTitle}>{brand.marca_nome}</h2>
                        <div>
                            {cars.filter((car) => { return car.marca_nome === brand.marca_nome }).map((car) =>
                                (<CarCard car={car} key={car.id} />)
                            )}
                        </div>
                    </div>)
                }
                return <></>



            })}

            {/*             <motion.div layout className={styles.carListContainer}>
                <AnimatePresence>
                    {carsOrder.map((cars) => (<div key={cars[0]}>
                        <h3>{cars[0]}</h3>
                        {cars[1].map((car) => (<div key={car.id}>
                            <CarCard car={car}></CarCard>
                        </div>))}
                    </div>))}

                </AnimatePresence>
            </motion.div> */}
        </div>
    );
}

/* 
    return (
        <div>{brands.map((brand) => {
            const brand_cars = cars.filter((car) => { return car.marca_nome === brand.marca_nome });
            if (brand_cars.lenght === 0) return ''
            return (
                <div key={brand.marca_nome}>
                    <h3 >{brand.marca_nome}</h3>
                    <motion.div layout className={styles.carListContainer}>
                        <AnimatePresence>
                            {brand_cars.map((car) => (<div key={car.id}>
                                <CarCard car={car}></CarCard>
                            </div>))}
                        </AnimatePresence>
                    </motion.div>
                </div>)
        })}
        </div>

    );
 */