import styles from './Home.module.scss'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Dialog from '@radix-ui/react-dialog'
import * as Toast from '@radix-ui/react-toast';

import carService from '../../services/carService';
import { filterNewCars, filterByYear, resetFilters, filterCarsOnSale, searchFilter, setCars } from '../../store/carSlice'

import CarForm from '../../components/CarForm/CarForm'
import CarList from '../../components/CarList/CarList'

import { BiSearch, BiX } from "react-icons/bi";
import carPhoto from '../../assets/car.png'
export default function Home() {
    const [openForm, setOpenForm] = useState(false);
    const [openToast, setOpenToast] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const dispatch = useDispatch()
    const cars = useSelector((state) => state.cars.value.filteredCars)

    const fetchCars = async () => {
        const cars = await carService.getCars()
        dispatch(setCars(cars))
    }
    useEffect(() => {
        fetchCars();
    }, [])

    function handleSearchOnChange(term) {
        setSearchTerm(term)
        dispatch(searchFilter(searchTerm))
    }
    function handleClearFilter() {
        setSearchTerm('')
        dispatch(resetFilters())
    }


    const filterApplied = useSelector((state) => state.cars.value.filterApplied)

    return (
        <div className={styles.homeContainer}>
            <div className={styles.homeContent}>
                <h1>ENCONTRE SEU CARRO</h1>
                <img src={carPhoto} alt="car" />
                <div className={styles.filtersContainer}>
                    <div className={styles.searchFilter}>
                        <input id="searchFilter" type="text" value={searchTerm} onChange={(event) => { handleSearchOnChange(event.target.value) }} placeholder="Procure por marca ou nome" />
                        <label htmlFor="searchFilter">
                            {searchTerm ? <BiX size='20' onClick={() => handleClearFilter()} /> : <BiSearch size='20' />}
                        </label>
                    </div>

                    <div className={styles.filterButtons}>
                        <button type="button" className={filterApplied === "NewCars" ? styles.active : ''} onClick={() => { dispatch(filterNewCars()) }}>Recentes</button>
                        <button type="button" className={filterApplied === "ByYear" ? styles.active : ''} onClick={() => { dispatch(filterByYear(2005)) }}>Carros Antigos</button>
                        <button type="button" className={filterApplied === "OnSale" ? styles.active : ''} onClick={() => { dispatch(filterCarsOnSale()) }}> Em promoção</button>
                        <button type="button" className={styles.clearFilter} onClick={() => { handleClearFilter() }}>Limpar Filtros</button>
                    </div>
                </div>
                <div className={styles.carListContainer}>
                    <CarList cars={cars} />
                </div>

                <Dialog.Root open={openForm} onOpenChange={setOpenForm}>
                    <Dialog.Trigger className={styles.advertise}>
                        Quero Vender
                    </Dialog.Trigger>
                    <CarForm setOpenForm={setOpenForm} setOpenToast={setOpenToast} />
                </Dialog.Root>
                <Toast.Provider>
                    <Toast.Root duration={4000} open={openToast} onOpenChange={setOpenToast} className={styles.toast}>
                        <Toast.Title>Anuncio enviado para analise!</Toast.Title>
                    </Toast.Root>

                    <Toast.Viewport />
                </Toast.Provider>
            </div>

        </div>
    )
}