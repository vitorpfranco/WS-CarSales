import styles from './CarList.module.scss'
import PropTypes from 'prop-types'

import { useEffect, useState } from "react";

import brandService from "../../services/brandService";

import CarCard from "../CarCard/CarCard";

function CarList({ cars = [''], title = true, titleColor = '#2C2C61', titleBgColor = '#ffff', bgColor, carBgColor = '#ffff', textColor = 'black', border = '1px solid grey', borderTitle = '1px solid black' }) {
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
                return (<div key={brand.marca_id} className={styles.brandCars}>
                    {title && <h2 style={{ color: `${titleColor}`, backgroundColor: `${bgColor || titleBgColor}`, borderBottom: `${borderTitle}` }} className={styles.brandTitle}>{brand.marca_nome}</h2>}
                    <div>
                        {cars.filter((car) => { return car.marca_nome === brand.marca_nome }).map((car) =>
                            (<CarCard car={car} key={car.id} bgColor={bgColor} carBgColor={carBgColor} textColor={textColor} border={border} />)
                        )}
                    </div>
                </div>)
            }
            return
        })}

    </>
    );
}


CarList.propTypes = {
    cars: PropTypes.array,
    title: PropTypes.bool,
    titleColor: PropTypes.string,
    titleBgColor: PropTypes.string,
    bgColor: PropTypes.string,
    carBgColor: PropTypes.string,
    textColor: PropTypes.string,
    border: PropTypes.string,
    borderTitle: PropTypes.string,
}

export default CarList