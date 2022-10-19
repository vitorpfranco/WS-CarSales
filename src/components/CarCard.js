import styles from './CarCard.module.scss'
import { FaGasPump } from "react-icons/fa";
import capitalize from '../utils/capitalize';
import { IoIosColorPalette } from "react-icons/io";
import fixCarValue from '../utils/fixCarValue'
import { GiCarDoor } from "react-icons/gi";

import { GoCalendar } from "react-icons/go";
import { motion } from 'framer-motion'

export default function CarCard({ car }) {

    return (
        <motion.div layout className={styles.carCard}>
            <div className={styles.carTitle}>
                <h3 className="teste">{car.nome_modelo.toUpperCase()}</h3>
                <h4>{car.marca_nome.toUpperCase()}</h4>
            </div>
            <div className={styles.carSpecs}>
                <div className={styles.spec}>
                    <FaGasPump size='20' ></FaGasPump>
                    <p>{capitalize(car.combustivel)}</p>
                </div>
                <div className={styles.spec}>
                    <IoIosColorPalette size='20' ></IoIosColorPalette>
                    <p>{capitalize(car.cor)}</p>
                </div>
                <div className={styles.spec}>
                    <GiCarDoor size='20' ></GiCarDoor>
                    <p>{car.num_portas} portas</p>
                </div>
                <div className={styles.spec}>
                    <GoCalendar size='20' ></GoCalendar>
                    <p>{car.ano}</p>
                </div>
            </div>
            <div className={styles.carPrice}>
                <p>R$ {fixCarValue(car.valor_fipe)},00</p>
            </div>
        </motion.div>
    )
}