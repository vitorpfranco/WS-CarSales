import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import CarCard from "./CarCard";
import { setCars } from './carSlice'
import styles from './CarList.module.scss'
import { motion, AnimatePresence } from 'framer-motion'
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

        <motion.div layout className={styles.carListContainer}>
            <AnimatePresence>
                {cars.map((car) => (<div key={car.id}>
                    <CarCard car={car}></CarCard>
                </div>))}
            </AnimatePresence>
        </motion.div>
    );
}