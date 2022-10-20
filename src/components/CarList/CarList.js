import styles from './CarList.module.scss'

import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'

import brandService from "../../services/brandService";

import CarCard from "../CarCard/CarCard";

export default function CarList() {
    const cars = useSelector((state) => state.cars.value.filteredCars)
    const [brands, setBrands] = useState([])

    const fetchBrands = async () => {
        const brands = await brandService.getBrands()
        setBrands(brands)
    }

    useEffect(() => {
        fetchBrands();
    }, [])

    function verifyExistingBrand(brand) {
        const existBoolean = cars.filter((car) => { return car.marca_nome === brand.marca_nome }).length > 0
        return existBoolean
    }

    return (<>
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
            return
        })}
    </>
    );
}