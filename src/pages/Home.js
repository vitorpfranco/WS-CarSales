import styles from './Home.module.scss'
import CarForm from '../components/CarForm'
import CarList from '../components/CarList'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as Dialog from '@radix-ui/react-dialog'
import * as Toast from '@radix-ui/react-toast';

import { filterNewCars, filterByYear, resetFilters, filterCarsOnSale, searchFilter } from '../components/carSlice'

export default function Home() {
    const [openForm, setOpenForm] = useState(false);
    const [openToast, setOpenToast] = useState(false)
    const dispatch = useDispatch()
    const filterApplied = useSelector((state) => state.cars.value.filterApplied)

    return (
        <div className={styles.homeContainer}>
            <div className={styles.homeContent}>
                <h1>ENCONTRE SEU CARRO</h1>
                <img src="car.png" alt="car" />
                <div className={styles.filtersContainer}>
                    <input type="text" onChange={(event) => { dispatch(searchFilter(event.target.value)) }} placeholder="Procure por marca ou nome" />
                    <div className={styles.filterButtons}>
                        <button type="button" className={filterApplied === "NewCars" ? styles.active : ''} onClick={() => { dispatch(filterNewCars()) }}>Recentes</button>
                        <button type="button" className={filterApplied === "ByYear" ? styles.active : ''} onClick={() => { dispatch(filterByYear(2005)) }}>Carros Antigos</button>
                        <button type="button" className={filterApplied === "OnSale" ? styles.active : ''} onClick={() => { dispatch(filterCarsOnSale()) }}> Em promoção</button>
                        <button type="button" onClick={() => { dispatch(resetFilters()) }}>Limpar Filtros</button>
                    </div>
                </div>
                <CarList />
                <Dialog.Root open={openForm} onOpenChange={setOpenForm}>
                    <Dialog.Trigger className={styles.advertise}>
                        Quero Vender
                    </Dialog.Trigger>
                    <CarForm setOpenForm={setOpenForm} setOpenToast={setOpenToast} />
                </Dialog.Root>
                <Toast.Provider >
                    <Toast.Root duration={5000} open={openToast} onOpenChange={setOpenToast} className={styles.toast}>
                        <Toast.Title> Seu anúncio foi enviado para análise!</Toast.Title>
                    </Toast.Root>
                    <Toast.Viewport />
                </Toast.Provider>
            </div>

        </div>
    )
}