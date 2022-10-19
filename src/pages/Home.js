import styles from './Home.module.scss'
import CarForm from '../components/CarForm'

import CarList from '../components/CarList'
import { useDispatch } from 'react-redux'

import { filterNewCars, filterByYear, resetFilters, filterCarsOnSale, searchFilter } from '../components/carSlice'

export default function Home() {
    const dispatch = useDispatch()

    return (
        <div className={styles.homeContainer}>
            <div className={styles.homeContent}>
                <h1>ENCONTRE SEU CARRO</h1>
                <img src="car.png" alt="car" />
                <div className={styles.filtersContainer}>
                    <input type="text" onChange={(event) => { dispatch(searchFilter(event.target.value)) }} placeholder="Procure por marca ou nome" />
                    <div className={styles.filterButtons}>
                        <button type="button" onClick={() => { dispatch(filterNewCars()) }}>Recentes</button>
                        <button type="button" onClick={() => { dispatch(filterByYear(2005)) }}>Carros Antigos</button>
                        <button type="button" onClick={() => { dispatch(filterCarsOnSale()) }}> Em promoção</button>
                        <button type="button" onClick={() => { dispatch(resetFilters()) }}>Limpar Filtros</button>
                    </div>
                </div>
                <CarList />


            </div>

        </div>
    )
}